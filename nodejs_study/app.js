/*
*
*
* koa 学习
* create by jhone
* create time 2017/09/18
*
*
*
* middleware 的顺序很重要，调用app.use 的顺序决定了middleware 的顺序。
* 如果有的中间件没有调用"await next()；"那么后续的middleware将不会再次执行。
* */
const Koa = require("koa");
const App = new Koa();

App.use(async(ctx,next)=>{

    console.info(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

App.use(async(ctx,next)=>{

    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;
    console.info(`time:${ms}ms`);
});

// 其中ctx 中封装了request、response变量
App.use(
    async(ctx,next)=>{

        /**
         *  原因是koa把很多async函数组成一个处理链，每个async函数都可以做一些自己的事情，
         *  然后用await next()来调用下一个async函数。我们把每个async函数称为middleware，
         *  这些middleware可以组合起来，完成很多有用的功能。
         */
    await next();// 指明调用下一个asyncy异步出路函数
    ctx.response.type = "text/html";
    ctx.response.body = "<h1>Hello</h1>";
});

App.listen(3000);
