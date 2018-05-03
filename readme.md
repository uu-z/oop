## Example

```js
import { _class } from "../src";

let a = _class({
  name: "a",
  a: 1,
  b: () => 2
});

let test = _class({
  extend: a,
  name: "test",
  static: {
    add: (...args) => args.reduce((p, c) => p + c)
  },
  construct(arg1) {
    this.A = arg1;
  },
  A: 1,
  haha() {
    console.log(this);
  }
});

console.log(test.add(1, 2));
let instance = new test(100);
instance.haha();
```
