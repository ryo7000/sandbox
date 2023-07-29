#include <stdio.h>
#include "libcabi.h"

int main(void) {
    hello_world();

    printf("%d\n", add_num(1, 2));
    printf("%s\n", add_str("abc", "def"));
}
