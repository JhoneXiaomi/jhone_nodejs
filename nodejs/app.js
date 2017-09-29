
/*
 *
 * resource :(Sequelize学习资料) https://segmentfault.com/a/1190000003987871
 *                              https://segmentfault.com/a/1190000003987871#articleHeader29
 *
 * */
const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const templating = require('./templating');

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production';

// 引入config 模块
const Config = require('./config');

const Sequelize = require('Sequelize');

var sequelize = new Sequelize(Config.database ,Config.username ,Config.password,{
    host:Config.host,
    dialect:'mysql',
    pool:{
        max:5,
        min:0,
        idle:30000
    }
});


var user = sequelize.define('user',{
    id: {
        type: Sequelize.STRING(32),
        primaryKey: true
    },
    name: Sequelize.STRING(20),
    password: Sequelize.STRING(32)
},{
    timestamps:false
});

var now = Date.now();

user.create({
    id: 'g-' + now,
    name: 'Gaffey',
    password: '123456'
}).then(function (p) {
    console.log('created.' + JSON.stringify(p));
}).catch(function (err) {
    console.log('failed: ' + err);
});


(async() =>{
    var uses = await user.findAll({
        where:{
            name:'Gaffey'
        }
    });
    console.info(`find ${uses.length}`);
    for (let u of uses){
        console.info(JSON.stringify(u));
    }
})();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// static file support:
if (! isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

// parse request body:
app.use(bodyParser());

// add nunjucks as view:
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// add controller:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');
