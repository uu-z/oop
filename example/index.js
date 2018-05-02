import { _class } from "../src";

let test = _class({
  static: {
    staicMethod() {
      console.log(this);
    }
  },
  construct(arg1) {
    this.publicA = arg1;
  },
  private: {
    privateA: 1
  },
  public: {
    publicA: 1,
    haha: () => 1
  }
});

test.staicMethod();
console.log(new test(100));
