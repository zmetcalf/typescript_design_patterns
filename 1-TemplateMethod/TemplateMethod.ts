abstract class AbstractedClass {
  val: number = 0;

  templateMethod() {
    this.operation1();
    this.operation2();
    this.operation3(); 
    console.log(this.val)
  }

  abstract operation1(): void;
  abstract operation2(): void;
  abstract operation3(): void;
}

class ConcreteOne extends AbstractedClass {
  operation1() {
    this.val++;
  }

  operation2() {
    this.val++;
  }

  operation3() {
    this.val--;
  }
}

class ConcreteTwo extends AbstractedClass {
  operation1() {
    this.val--;
  }

  operation2() {
    this.val--;
  }

  operation3() {
    this.val++;
  }
}

(() => {
  new ConcreteOne().templateMethod()
  new ConcreteTwo().templateMethod()
})()

