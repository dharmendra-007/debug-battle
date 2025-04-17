#include <stdio.h>
int main() {
    char str[5] = "Code";
    int i = 0;
    while(str[i] != '\0'){
        i++;
    }
    printf("Length is %d", i);
    return 0;
}