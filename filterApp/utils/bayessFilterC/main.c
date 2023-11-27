#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <memory.h>
#include <pthread.h>

#define MASK_RADIUS 2
#define MASK_SIZE 25
#define BYTES_PER_PIXEL 4

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
void get_width_height_epsilon(unsigned int  *width, unsigned int  *height, double  *epsilon, char *width_str, char *height_str, char *epsilon_str) {
    width_str = strchr(width_str, ':');
    width_str[0] = '0';
    *width = fast_string_to_int(width_str);

    height_str = strchr(height_str, ':');
    height_str[0] = '0';
    *height = fast_string_to_int(height_str);

    epsilon_str = strchr(epsilon_str, ':');
    epsilon_str[0] = '0';
    sscanf(epsilon_str, "%lf", epsilon);

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

// arguments for 
struct thread_function_argument{
  unsigned int *image;
  unsigned int *image_copy;
  unsigned int row;
  unsigned int in_row;
  double epsilon;
};

// thread function, filters one row of the image
void *thread_fuction( void *arg ){
  //all variables
  struct thread_function_argument *argument = (struct thread_function_argument *)arg;
  int first = ((*argument).in_row*(*argument).row) + (MASK_RADIUS*BYTES_PER_PIXEL);
  int last = (*argument).in_row-(MASK_RADIUS*BYTES_PER_PIXEL) + ((*argument).in_row*(*argument).row);
  unsigned int t[MASK_SIZE]; // filter mask
  unsigned int index;
  
  // variables for the algorithm
  double g_xy0, g_xyk, g_xyk_new, t_variance, B_k, sum_aik_ti, sum_aik;
  double g_k_minus_prev_gk_square;
  double a_ik[MASK_SIZE];


  for(int i = first; i < last; i++){
    //get all the neighboring pixels into array
    for(int j = - MASK_RADIUS; j<= MASK_RADIUS; j++){
      for(int k = - MASK_RADIUS; k <= MASK_RADIUS; k++){
        index = ((*argument).in_row * j)+(k*BYTES_PER_PIXEL) + i;
        t[((j+2)*5)+(k+2)] =(*argument).image[index];
      }
    }
    // 1. Initialize g(x, y)(0) as the arithmetic average of t. If the sample variance of t is
    //    greater than zero set the iteration index k = 1 else stop.

    g_xy0=0;
    for(int j = 0; j<MASK_SIZE; j++) g_xy0+=t[j];
    g_xy0 = g_xy0/25.0; //arithmetic average

    t_variance = 0;
    for(int j = 0; j<MASK_SIZE; j++) t_variance+=(t[j] - g_xy0)*(t[j] - g_xy0);
    t_variance = t_variance/25.0; //variance of the vector t

    if(t_variance <= 0){
      (*argument).image_copy[i] = g_xy0;
      continue;
    }

    g_xyk = g_xy0;

    for(int k = 1; 1; k++){ //set the iterator k=1
    // 2. Calculate the hyperparameter αi for i = 1, 2, . . . , D and β (k)
    B_k = (1.0 / g_xyk)/g_xyk;
    for(int j =0; j<MASK_SIZE; j++) a_ik[j]=(1.0/(t[j]-g_xyk))/(t[j]-g_xyk);

    // 3. Update the average g(x, y)(k) for kth iteration.
    sum_aik_ti = 0;
    sum_aik = 0;
    for(int j =0; j<MASK_SIZE; j++){
      sum_aik_ti += a_ik[j]*t[j];
      sum_aik += a_ik[j];
    }
    g_xyk_new = sum_aik_ti/(B_k + sum_aik);

    // 4. If g(x, y)(k) − g(x, y)(k−1) > ε then k ← k + 1 and go to 2, else stop.
    g_k_minus_prev_gk_square = (g_xyk_new-g_xyk)*(g_xyk_new-g_xyk);
    if(g_k_minus_prev_gk_square <= (*argument).epsilon){
      (*argument).image_copy[i] = g_xyk_new;
      break;
    }
    if(g_xyk_new!=g_xyk_new){
      (*argument).image_copy[i] = g_xyk;
      break;
    }
     g_xyk = g_xyk_new;
    }
  }
  pthread_exit(arg);
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
  double epsilon;
  char *width_string, *height_string, *numbers, *epsilon_string;

  // get width height and array into strings
  width_string = strtok(json, ",");
  height_string = strtok(NULL, ",");
  epsilon_string = strtok(NULL, ",");
  strtok(NULL, "[");
  numbers =strtok(NULL, "]");

  // appedn a finishing coma to the numbers
  char char_coma = ',';
  strncat(numbers, &char_coma , 1);

  // get all the needed parameters as unsigned int
  get_width_height_epsilon(&width, &height, &epsilon, width_string, height_string, epsilon_string);
  unsigned int image_size= width*height*BYTES_PER_PIXEL;
  image = get_image_as_array(numbers, image_size);

  //copy the image
  unsigned int *image_copy = (unsigned int*) malloc(image_size * sizeof(unsigned int));
  memcpy(image_copy, image, image_size * sizeof(unsigned int));

  //allocating memory for threads and parameters
  int number_of_threads = height -(2 * MASK_RADIUS);
  pthread_t **threads = (pthread_t **) malloc(sizeof(pthread_t*)*number_of_threads);
  struct thread_function_argument ** arguments = (struct thread_function_argument **) malloc(sizeof(struct thread_function_argument*)*number_of_threads);
  for(int i = 0; i<number_of_threads ; i++){
    threads[i] = malloc(sizeof(pthread_t));
    arguments[i] = malloc(sizeof(struct thread_function_argument));
  }

  // create threads and delegate rows
  int row = MASK_RADIUS;
  int in_row = width*BYTES_PER_PIXEL;
    for (int i = 0 ; i < number_of_threads ; i++, row++){
    struct thread_function_argument argument = {.image = image, .image_copy= image_copy, .row = row, .in_row = in_row, .epsilon = epsilon};
    *arguments[i] = argument;
    pthread_create(threads[i], NULL, thread_fuction, (void *)arguments[i]);
  }

  //wait till threads end executing
    for(int i=0; i<number_of_threads ; i++){
    pthread_join(*threads[i], NULL);
  }
  // save output to file
  save_to_file(argv[1], image_copy, image_size);

  // freeing memory
  free(filename);
  filename = NULL;
  free(image);
  image = NULL;
  free(image_copy);
  image_copy = NULL;
  for(int i = 0; i<number_of_threads ; i++){
    free(threads[i]);
    threads[i] = NULL;
    free(arguments[i]);
    arguments[i] = NULL;
  }
  free(threads);
  threads = NULL;
  free(arguments);
  arguments = NULL;

  return 0;
}