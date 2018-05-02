import { $ } from "menhera";

export const _class = cp => {
  const {
    private: _private,
    static: _static,
    construct: _construct,
    public: _public
  } = cp;

  let privateVariable = "";
  let publicVariable = "";
  let privateReturn = "";
  let publicReturn = "";
  let constructExec = `let _construct = ${_construct};`;
  $(_private, (key, val) => (privateVariable += `let _${key} = ${val};`));
  $(_private, (key, val) => (publicReturn += `_${key},`));

  $(_public, (key, val) => (publicVariable += `let ${key} = ${val};`));
  $(_public, (key, val) => (publicReturn += `${key},`));

  let fnBody = `
        ${privateVariable}
        ${publicVariable}
        ${constructExec}
          return {
            _construct,
            ${privateReturn}           
            ${publicReturn}
          }
        `;
  let fn = new Function(fnBody);
  $(_static, (key, val) => (fn[key] = val));
  return new Proxy(fn, {
    construct(target, args) {
      let instance = target();
      instance._construct(...args);
      delete instance._construct;
      return instance;
    }
  });
};
