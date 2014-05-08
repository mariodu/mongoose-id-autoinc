mongoose-id-autoinc
====================

mongoose的一个plugin，用来解决使用mongoose时mongodb的_id自增问题，摆脱一堆对人类不友好的_id字段。
自增字段名可以自定义。

## 依赖

- [Node.js](http://nodejs.org/)
- [MongoDB](http://www.mongodb.org)
- [Mongoose](http://mongoosejs.com)

##原理参照

MongoDB的官方文档

[Create an Auto-Incrementing Sequence Field](http://docs.mongodb.org/manual/tutorial/create-an-auto-incrementing-field/)

采用的是方法一，在数据库中新建了一个counter计数的collection，记录每个model的大id，然后在save时赋值。
使用findAndModify实现递增，由于$inc是原子操作，所以不用担心并发。

## 安装

通过npm

    npm install mongoose-id-autoinc

## 选项

- `model` - Mongoose model的名字，必须的选项
- `field` - 自增字段的名，默认为_id
- `start` - 自增的初始值，默认1
- `step`  - 自增的步长，默认1
- `once`  - 是否只在创建时自增，默认为false


## 使用

例子代码:

    $ node examples/example.js

1.在项目里require mongoose以及插件

    var mongoose  = require('mongoose'),
    Schema        = mongoose.Schema,
    db            = mongoose.createConnection('127.0.0.1', 'yourDatabaseName'),
    autoinc       = require('mongoose-id-autoinc');

2.初始化插件，然后定义你自己的表结构，在和插件关联上

    autoinc.init(db);

    //可以指定counter名称
    init(db，countername);

    //可以指定mongoose依赖, 默认 `mongoose = require('mongoose')`
    init(db, mongoose);

    //或者也可以
    init(db, countername, mongoose);


    var UserSchema = new Schema({
      name:   String,
      email:  String
    });

    UserSchema.plugin(autoinc.plugin, { model: 'User' });

3.然后就可以创建自己的model，它的_id就会自增（1，2，3...）

    var User = db.model('User', UserSchema);

4.可选字段

    UserSchema.plugin(autoinc.plugin, { model: 'User', field: 'seqnumber', start: 100, step: 10 });

---------------------------------------

#### &copy;MarioDu 2013-4-14
