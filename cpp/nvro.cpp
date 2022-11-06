#include <iostream>

// xにrbpレジスタの値を設定
#define CURRENT_RBP(x) \
  __asm__("mov %%rbp, %0;" \
            :"=r"(x) \
          );

// RVOが適用されているかをチェックするマクロ
#define CHECK_NRVO(tag, object) \
{ \
  unsigned long rbp; \
  CURRENT_RBP(rbp); \
  unsigned long address = reinterpret_cast<unsigned long>(&object); \
  if (rbp > address) { \
    std::cout << tag << ": NRVO isn't applied." << std::endl; \
  } \
}

class Something {
public:
  int value;

  Something() : value(0) {}
  Something(const Something& obj) {
    std::cout << "copy constructor called\n";

    value = obj.value;
  }
};

// 名前付きのオブジェクトを返す関数
Something create_object() {
  Something object;

  CHECK_NRVO("object", object);

  return object;
}

// 条件によって異るオブジェクトを返す関数
Something create_object_by_condition(bool flag) {
  Something object1, object2;

  CHECK_NRVO("object1", object1);
  CHECK_NRVO("object2", object2);

  return flag ? object1 : object2;
} 

int main() {
  std::cout << "-- create_object" << std::endl;
  Something object = create_object();
  std::cout << "-- create_object_by_condition" << std::endl;
  Something object2 = create_object_by_condition(true);
  std::cout << "-- end" << std::endl;
}
