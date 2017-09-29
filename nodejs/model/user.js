/**
 * describe  user model
 * Create by jhone
 * Create on 2017/09/29
 */

const Sequelize = require("Sequelize");

const Config = require("./../config");

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

module.exports = user;