#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <memory.h>

// function for reading a file into memory
char *read_file(char *filename) {
    FILE *file = fopen(filename, "rt");
    if(file== NULL){
      perror(filename);
      exit(1);
    }
    assert(file);
    fseek(file, 0, SEEK_END);
    long length = ftell(file);
    fseek(file, 0, SEEK_SET);
    char *content = (char *) malloc(length + 1);
    content[length] = '\0';
    fread(content, 1, length, file);
    fclose(file);
    return content;
}

// converts string to digit faster than atoi
int fast_string_to_int(const char * str) {
  int value = 0;
  while(*str){
    value = value * 10 + (*str++ - '0');
  }
  return value;
}

// transforms width and height into int format
void get_width_height(unsigned int  *width, unsigned int  *height, char *width_str, char *height_str) {
    width_str = strchr(width_str, ':');
    width_str[0] = '0';
    *width = fast_string_to_int(width_str);

    height_str = strchr(height_str, ':');
    height_str[0] = '0';
    *height = fast_string_to_int(height_str);

}

  //converts image from string to unsigned int array
unsigned int *get_image_as_array(char * image_string, unsigned int size){
  //allocate memory for the array
  unsigned int *image_array = (unsigned int*) malloc(size * sizeof(unsigned int));
  image_array[0] = fast_string_to_int(strtok(image_string, ","));
  
  for (int i = 1; i < size; i++){
    image_array[i] = fast_string_to_int(strtok(NULL, ","));
  }
  return image_array;
} 

  // save output to file
void save_to_file(const char *filename, unsigned int * image, unsigned int size){
  char* output_name =(char*) malloc(1 + strlen(filename) + strlen("output-"));
  strcpy(output_name , "output-");
  strcat(output_name, filename);
  FILE *fp;
  fp = fopen(output_name , "w");
  fprintf(fp, "{\"image\": [");
  int iterations_for_writing = size-1;
  for (int i =0; i < iterations_for_writing; i++){
    fprintf(fp, "%i, ", image[i]);
  }
  fprintf(fp, "%i", image[size-1]);
  fprintf(fp, "]}");
  fclose(fp);
  free(output_name);
}



int main(int argc, char *argv[]) {

  // set json filename and read it from file into a string
  char *str1 = "./";
  char * filename = (char*) malloc(1 + strlen(str1) + strlen(argv[1]));
  strcpy(filename, str1);
  strcat(filename, argv[1]);
  char *json = read_file(filename);

  // this is what we read from json file
  unsigned int width, height, *image;
  char *width_string, *height_string, *numbers;

  // get width height and array into strings
  width_string = strtok(json, ",");
  height_string = strtok(NULL, ",");
  strtok(NULL, "[");
  numbers =strtok(NULL, "]");

  // appedn a finishing coma to the numbers
  char char_coma = ',';
  strncat(numbers, &char_coma , 1);

  get_width_height(&width, &height, width_string, height_string);
  unsigned int image_size= width*height*4;
  image = get_image_as_array(numbers, image_size);

  // ------------------------------------------------------------------------------------------------
  // main algorithm
  for (int i =0; i < image_size; i++) image[i] = 255;

  //-------------------------------------------------------------------------------------------------
  save_to_file(argv[1], image, image_size);
  free(filename);
  free(image);
  return 0;
}