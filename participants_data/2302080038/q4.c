#include <stdio.h>
void swap(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}
int main() {
    int x = 11, y = 22;
    // swap(x y);
    printf("x = %d, y = %d", y, x);
    return 0;
}