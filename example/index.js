import { _class } from "../src";

let test = _class({
  static: {
    add: (...args) => args.reduce((p, c) => p + c)
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

console.log(test.add(1, 2));
console.log(new test(100));
