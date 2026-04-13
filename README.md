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
