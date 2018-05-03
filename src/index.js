import { $ } from "menhera";

export const _class = cp => {
  let {
    private: _private,
    static: _static,
    construct: _construct,
    public: _public
  } = cp;

  let fn = new Function();
  $(_static, (key, val) => (fn[key] = val));
  return new Proxy(fn, {
    construct(target, args) {
      let instance = new target();
      $(_private, (key, val) => {
        if (typeof val === "function") {
          instance[key] = val.bind(instance);
        } else {
          instance[key] = val;
        }
      });
      $(_public, (key, val) => {
        if (typeof val === "function") {
          instance[key] = val.bind(instance);
        } else {
          instance[key] = val;
        }
      });
      _construct = _construct.bind(instance);
      _construct(...args);
      return instance;
    }
  });
};
