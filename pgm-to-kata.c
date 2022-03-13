#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>


void convert_pgm (const char* file_name, int shades)
{
  int shadesConversion = 256/shades;
  char out_filename[255];
  
  FILE* inFile = fopen (file_name, "rb");
  
  uint8_t temp = 0;

  char fileType[2];
  char width[16];
  char height[16];
  char shadesString[16];
  fscanf(inFile, " %s %s %s %s ", fileType, width, height, shadesString);
  printf("filetype: %s, width: %s, height: %s, shades: %s\n", fileType, width, height, shadesString);

  if (atoi(shadesString) != 255 || atoi(width) > 800 || atoi(height) > 800) {
      printf("Only support P5 with no comments, shade value of 255, width <=800, height <=800");
      return;
  }

  sprintf(out_filename, "%s-%s-%s-%d.lee", file_name, width, height, shades);
  FILE* outFile = fopen(out_filename, "w+");  
  do
    {  
      fread(&temp,sizeof(uint8_t),1,inFile);
      //printf ("%x ", temp);
      int by = (int)(temp/shadesConversion);
      //printf("[%x %d]", temp, by);
      fprintf(outFile, "%X", by);
    } while (!feof (inFile));

  fclose (inFile);        
}

int main(int argc, char *argv[]) {
    //usage: <filename> <shades>
    if (argc != 3) {
        printf("Usage: %s <pgm255-with-no-header-filename> <shades>", argv[0]);
        return 1;
    }
    convert_pgm(argv[1], atoi(argv[2]));
}

