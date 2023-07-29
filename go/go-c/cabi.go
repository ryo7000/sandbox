package main

import (
	"C"
	"fmt"
)

func main() {
	// main関数を記述
}

//export hello_world
func hello_world() {
	fmt.Println("Hello World")
}

//export add_num
func add_num(x1, x2 C.int) C.int {
	result := int(x1) + int(x2)
	return C.int(result)
}

//export add_str
func add_str(s1, s2 *C.char) *C.char {
	result := C.GoString(s1) + C.GoString(s2)
	return C.CString(result)
}
