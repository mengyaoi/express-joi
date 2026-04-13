const Joi = require("joi");

const expressJoi = function (schemas, options = { strict: false }) {
  // 自定义校验选项
  // strict 自定义属性，默认不开启严格模式，会过滤掉那些未定义的参数项
  //        如果用户指定了 strict 的值为 true，则开启严格模式，此时不会过滤掉那些未定义的参数项
  if (!options.strict) {
    // allowUnknown 允许提交未定义的参数项
    // stripUnknown 过滤掉那些未定义的参数项
    options = { allowUnknown: true, stripUnknown: true, ...options };
  }

  // 从 options 配置对象中，删除自定义的 strict 属性
  delete options.strict;

  // 返回中间件函数
  return async function (req, res, next) {
    const keys = ["body", "query", "params", "headers", "cookies"];

    // 遍历所有可能的请求参数项，逐一校验
    for (let key of keys) {
      if (!schemas[key]) continue; // 如果没有提供某一项的校验规则，则跳过该项

      const schema = Joi.object(schemas[key]);

      // 在校验之前可以进行自动修复（比如去除空格、调整大小写等）
      if (key === "body" || key === "query") {
        // 对 body 和 query 进行修复
        if (req[key]?.username)
          req[key].username = req[key].username.trim().toLowerCase();
      }

      try {
        const { error, value } = schema.validate(req[key], options); // 执行校验
        if (error) {
          return res.cc(error.message || "请求参数验证失败"); // 如果校验失败，返回错误信息
        } else {
          req[key] = value; // 如果校验通过，把校验后的值赋回 req
        }
      } catch (err) {
        return res.cc(err.message || "请求参数验证失败"); // 捕获可能的异常
      }
    }

    next(); // 校验通过，继续执行下一个中间件或路由
  };
};

module.exports = expressJoi;
