const buggyPrograms = [
  {
    "id": 1,
    "level": "Sorcerer's Stone",
    "code": "#include <stdio.h>\nint main() {\n    int arr[4] = {7,14,21,28,35};\n    for(int i = 0; i <= 5; i++) {\n        printf(\"%d \", arr[i])\n    }\n    return 0;\n}",
    "hint": "Segmentation fault: Array index out of bounds",
    "expectedOutput": "7 14 21 28 35 ",
    "testCases": [{ "input": "" }]
  },
  {
    "id": 2,
    "level": "Chamber of Secrets",
    "code": "#include <stdio.h>\nint main() {\n    int n = 3;\n    int factorial = 1;\n    for(int i = 1; i < n; i++); {\n        factorial *= i;\n    }\n    printf(\"Factorial of %d is %d\", n, factorial)\n    return 0;\n}",
    "hint": "Compilation error: 'i' undeclared in this scope",
    "expectedOutput": "Factorial of 3 is 6",
    "testCases": [{ "input": "" }]
  },
  {
    "id": 3,
    "level": "Prisoner of Azkaban",
    "code": "#include <stdio.h>\nint main() {\n    char str[2] = \"Code\";\n    int i = 0;\n    while(str[i] != '\\0'); {\n        i++;\n    }\n    printf(\"Length is %d\", i)\n    return 0;\n}",
    "hint": "Infinite loop detected: Check the while loop structure",
    "expectedOutput": "Length is 4",
    "testCases": [{ "input": "" }]
  },
  {
    "id": 4,
    "level": "Goblet of Fire",
    "code": "#include <stdio.h>\nvoid swap(int a, int b) {\n    int temp = a;\n    a = b;\n    b = temp;\n}\nint main() {\n    int x = 11, y = 22;\n    swap(x y);\n    printf(\"x = %d, y = %d\", x, y)\n    return 0;\n}",
    "hint": "Compilation error: expected ',' between arguments",
    "expectedOutput": "x = 22, y = 11",
    "testCases": [{ "input": "" }]
  },
  {
    "id": 5,
    "level": "Order of the Phoenix",
    "code": "#include <stdio.h>\nint main() {\n    int matrix[3][3] = {{7,14,21},{28,35,42},{49,56,63}};\n    for(int i = 0; i <= 3; i++) {\n        for(int j = 0; j < 3; j++) {\n            matrix[j][i] = matrix[i][j];\n        }\n    }\n    for(int i = 0; i < 3; i++) {\n        for(int j = 0; j < 3; j++)\n            printf(\"%d \", matrix[i][j])\n        printf(\"\\n\");\n    }\n    return 0;\n}",
    "hint": "Runtime error: Incorrect matrix values due to in-place swapping",
    "expectedOutput": "7 28 49 \n14 35 56 \n21 42 63 \n",
    "testCases": [{ "input": "" }]
  },
  {
    "id": 6,
    "level": "Half-Blood Prince",
    "code": "#include <stdio.h>\nint main() {\n    int sum = 0;\n    for(int i = 1; i <= 10; i++);\n    {\n        sum =+ i;\n    }\n    printf(\"Sum is %d\", sum)\n    return 0;\n}",
    "hint": "Operator misuse: use '+=' instead of '=+'",
    "expectedOutput": "Sum is 55",
    "testCases": [{ "input": "" }]
  },
  {
    "id": 7,
    "level": "Deathly Hallows",
    "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nint main() {\n    struct Node* head = malloc(sizeof(struct Node));\n    head->data = 21;\n    head->next = malloc(sizeof(struct Node))\n    head->next->data = 42;\n    head->next->next = malloc(sizeof(struct Node));\n    head->next->next->data = 63;\n    head->next->next->next = NULL;\n    struct Node* current = head;\n    while(current != NULL);\n    {\n        printf(\"%d \", current->data)\n        current = current->next;\n    }\n    return 0;\n}",
    "hint": "Infinite loop detected: Check the while loop structure",
    "expectedOutput": "21 42 63 ",
    "testCases": [{ "input": "" }]
  },
  {
    "id": 8,
    "level": "Cursed Child",
    "code": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* left;\n    struct Node* right;\n};\n\nstruct Node* newNode(int data) {\n    struct Node* node = malloc(sizeof(struct Node));\n    node->data = data;\n    node->left = NULL;\n    node->right = NULL;\n    return node;\n}\n\nvoid inorder(struct Node* root) {\n    if(root == NULL)\n        return;\n    inorder(root->left);\n    printf(\"%d \", root->data)\n    inorder(root->left);\n}\n\nint main() {\n    struct Node* root = newNode(30);\n    root->left = newNode(25);\n    root->right = newNode(35);\n    inorder(root);\n    return 0;\n}",
    "hint": "Incorrect traversal: function calls wrong subtree",
    "expectedOutput": "25 30 35",
    "testCases": [{ "input": "" }]
  }
];

export default buggyPrograms;