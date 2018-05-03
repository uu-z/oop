import { $ } from "menhera";

export const _class = cp => {
  let {
    name: _name = "anonymous",
    extend: _extend,
    interfaces: _interfaces,
    static: _static,
    construct: _construct,
    ..._public
  } = cp;

  let fn;
  eval(`fn = function ${_name}(){}`);
  _static && $(_static, (key, val) => (fn[key] = val));
  return new Proxy(fn, {
    construct(target, args) {
      let instance = new target();
      let parent;
      if (_extend) {
        instance.super = {};
        parent = new _extend();
        $(parent, (key, val) => {
          if (typeof val === "function") {
            instance.super[key] = val.bind(instance);
          } else {
            instance[key] = val;
          }
        });
      }
      _public &&
        $(_public, (key, val) => {
          if (typeof val === "function") {
            instance[key] = val.bind(instance);
          } else {
            instance[key] = val;
          }
        });
      if (_construct) {
        _construct = _construct.bind(instance);
        _construct(...args);
      }

      return instance;
    }
  });
};
