#include <stdio.h>
int main() {
    int matrix[3][3] = {{7,14,21},{28,35,42},{49,56,63}};
    
    // Transpose in-place safely
    for(int i = 0; i < 3; i++) {
        for(int j = i + 1; j < 3; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }

    // Print transposed matrix
    for(int i = 0; i < 3; i++) {
        for(int j = 0; j < 3; j++){
            printf("%d ", matrix[i][j]);
        }
        printf("\n");
    }

    return 0;
}
