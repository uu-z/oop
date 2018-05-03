## Example

```js
import { _class } from "../src";

let a = _class({
  name: "a",
  public: {
    a: 1,
    b() {}
  }
});

let test = _class({
  extend: a,
  name: "test",
  static: {
    add: (...args) => args.reduce((p, c) => p + c)
  },
  construct(arg1) {
    this.privateA = arg1;
    this.publicA = this.privateA;
  },
  private: {
    privateA: 1
  },
  public: {
    publicA: 1,
    haha() {
      console.log(this);
    }
  }
});

console.log(test.add(1, 2));
let instance = new test(100);
instance.haha();
```
