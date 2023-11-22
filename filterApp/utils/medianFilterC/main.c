#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include <memory.h>

// function for reading a file into memory
char *readFile(char *filename) {
    FILE *file = fopen(filename, "rt");
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

int main(int argc, char *argv[]) {

  // set json filename and read it from file into a string
  char *str1 = "./";
  char * filename = (char*) malloc(1 + strlen(str1) + strlen(argv[1]));
  strcpy(filename, str1);
  strcat(filename, argv[1]);
  char *json = readFile(filename);

  printf("%s", json);
  return 0;
}