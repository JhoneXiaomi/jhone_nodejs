/**
 * describe
 * Create by jhone
 * Create on 2017/09/18
 *
 *
 *
 * 注意导入koa-router的语句最后的()是函数调用：
 *
 */

const Koa = require("koa");

const Router = require("koa-router")();

const bodyParser = require("koa-bodyparser");

const App = new Koa();

App.use(bodyParser());

App.use(async(ctx,next)=>{

    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();
});

Router.get('/hello/:name',async(ctx,next)=>{
    var name = ctx.params.name;
    ctx.response.body = `<h1>hello${name}!</h1>`;
});

Router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

Router.post('/signin', async (ctx, next) => {
    var
        name = ctx.requset.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});

App.use(Router.routes());
App.listen(3000);