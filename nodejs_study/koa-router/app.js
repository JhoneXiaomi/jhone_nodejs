/**
 * describe
 * Create by jhone
 * Create on 2017/09/18
 *
 *
 * 注意导入koa-router的语句最后的()是函数调用：
 *
 */
const Koa = require("koa");


// 导入controller middleware:
const controller = require('./controller');

const Router = require("koa-router")();

// 处理post 的请求
const bodyParser = require("koa-bodyparser");

const App = new Koa();

console.info(__dirname);
App.use(bodyParser());


// 使用middleware:
App.use(controller());


App.listen(3000);