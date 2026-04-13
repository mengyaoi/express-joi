# express-joi

`express-joi` 是一个用于在 **Express.js** 中集成 **Joi** 数据验证的中间件。它通过简化请求体（body）、查询（query）、路径参数（params）、头部（headers）和 cookies 的验证工作，使得数据验证变得更加清晰、简洁且易于扩展。

## 🚀 安装

使用以下命令安装 `express-joi` 和 `joi`：

```bash
npm install @escook/express-joi
npm install joi@17.4.0
```
🧑‍💻 使用方法
基本用法

在 Express 应用中使用 express-joi 来进行数据验证。

引入库和创建验证规则

首先，你需要定义验证规则，express-joi 会根据这些规则对请求体、查询参数等进行验证。

const express = require('express');
const Joi = require('joi');
const expressJoi = require('@escook/express-joi');
const app = express();

app.use(express.json()); // 解析请求体

// 定义请求体验证规则
const schemas = {
  body: {
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).max(20).required(),
  },
  query: {
    search: Joi.string().min(3).required(),
  },
  headers: {
    authorization: Joi.string().required(),
  },
  cookies: {
    sessionId: Joi.string().required(),
  }
};
在路由中使用 express-joi 中间件

在需要进行验证的路由上，使用 expressJoi(schemas) 中间件来进行验证。

app.post('/register', expressJoi(schemas), (req, res) => {
  // 如果通过了所有验证，进入到这个路由
  res.send('注册成功！');
});
中间件验证顺序
请求体（body）
查询参数（query）
路径参数（params）
请求头（headers）
Cookies（cookies）
验证规则结构

schemas 对象的每个键（body、query、params、headers、cookies）都应该是一个 Joi 对象，用于验证对应的数据字段。

const schemas = {
  body: {
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).max(20).required(),
  },
  query: {
    search: Joi.string().min(3).required(),
  },
};
错误处理

当请求数据验证失败时，express-joi 会使用 res.cc() 统一处理错误响应。

例如，当用户名为空时：

{
  "status": 1,
  "message": "用户名不能为空"
}
💡 功能和特点
自动修复功能：
对请求体和查询参数中的 username 字段进行自动修复，去除多余的空格并转换为小写。
支持更多请求部分的验证：
支持 请求体（body）、查询参数（query）、路径参数（params）、请求头（headers） 和 Cookies（cookies） 的验证。
统一的错误响应：
通过 res.cc() 统一处理所有的验证错误，返回格式一致，易于前端处理。
灵活的验证选项：
通过 options 可以控制验证模式，比如：
allowUnknown: true 允许未定义的字段
stripUnknown: true 过滤掉未定义的字段
支持异步验证：
可以对请求中的数据进行异步验证（如需要访问数据库时）。
⚙️ 配置选项
strict（是否启用严格模式）

如果 strict 设为 true，请求中 未定义的字段 会被视为错误。如果 strict 设为 false（默认值），则会自动过滤掉那些未定义的字段。

const expressJoi = function (schemas, options = { strict: false }) {
  if (!options.strict) {
    options = { allowUnknown: true, stripUnknown: true, ...options };
  }
  // ...
};
🎯 高级功能
自定义字段修复

在 express-joi 中，你可以根据需要 自定义字段修复，例如：

if (req.body.username) {
  req.body.username = req.body.username.trim().toLowerCase(); // 去空格并转换为小写
}
异步验证支持

如果你需要异步验证，可以在 schema.validateAsync() 中使用异步规则。例如，当用户名不存在时，进行数据库查找：

const schema = Joi.object({
  username: Joi.string().required().external(async (value) => {
    // 异步验证（如检查数据库）
    const user = await db.query("SELECT * FROM users WHERE username=?", [value]);
    if (user.length > 0) throw new Error("用户名已存在");
  })
});
🌍 贡献代码

欢迎任何人对这个项目进行贡献！你可以：

Fork 仓库。
进行修改和优化。
提交 Pull Request，贡献你的改进。

请参考 GitHub 上的 Issues 和 Pull Requests 进行更多的讨论和贡献。

📄 License

MIT

总结

这个 express-joi 中间件可以方便地在 Express 中进行 Joi 数据验证，提高了数据验证的灵活性和代码的可维护性。你可以根据项目需求，扩展更多的验证规则和功能。通过统一的 res.cc() 错误处理，使得错误响应更简洁易懂。

如果你有任何问题或者建议，随时欢迎提出！


---

### 说明：

- **安装和使用**：介绍了如何安装和基本用法。
- **功能特点**：列出了中间件的主要功能，尤其是自动修复功能、支持更多验证类型、异步验证支持等。
- **配置选项**：详细说明了如何通过配置 `strict` 和其他选项来调整验证行为。
- **贡献代码**：提供了如何参与贡献的指南，帮助用户提交改进或 bug 修复。
  
这个 `README.md` 文件涵盖了 `express-joi` 的主要功能和用法，帮助开发者更快速地上手和使用。如果你需要更多
