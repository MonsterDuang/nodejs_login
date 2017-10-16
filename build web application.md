# 一、搭建web应用

 使用Node.js搭建web服务器，一般使用一些框架来帮助完成。

 **express** 是一个开源的node.js项目框架，初学者使用express可以快速的搭建一个Web项目，express中已经集成了Web的http服务器创建、请求和文件管理以及Session的处理等功能，所以express是非常适合初学者的入门学习。

## 1. 安装Express框架

> 使用node.js自带的包管理器npm安装。

1. 创建一个项目目录，Node_Hello。进入该目录，创建一个package.json文件，文件内容如下：

```
{
  "name": "Node_Hello",
  "description": "nodejs hello world app",
  "version": "0.0.1",
  "private": true,
  "dependencies": {
    "express": "4.x"
  }
}
```

上面代码定义了项目的名称、描述、版本等，并且指定需要4.0版本以上的Express。

1. **从控制台首先进入刚才的项目目录**，然后输入如下命令，则会开始下载Express。

```
npm install
```

![img](http://o7cqr8cfk.bkt.clouddn.com/public/16-11-19/23566978.jpg)

下载完成

![img](http://o7cqr8cfk.bkt.clouddn.com/public/16-11-19/3061746.jpg) 
![img](http://o7cqr8cfk.bkt.clouddn.com/public/16-11-19/44088268.jpg)

## 2. 创建启动文件

 在上面的项目目录下，新建一个启动文件，名字暂叫 **index.js** 。书写如下代码：

```
var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('<h1>你好，这是我们的第一个nodejs项目</h1>');
});
app.listen(9999);
```

## 3. 运行index.js文件

```
node index.js1
```

## 4. 使用浏览器访问

在浏览器输入下面的地址就可以访问我们刚刚搭建的web网站了。

```
http://127.0.0.1:9999
```

# 二、使用Webstorm搭建Node.js web应用

 使用webstorm搭建Node.js应用更加方便。

## 1. 下载WebStorm，并安装

[官网下载Webstorm](https://www.jetbrains.com/webstorm/)

下载完成后，直接安装即可。

## 2. 创建Node + Express应用

![img](http://o7cqr8cfk.bkt.clouddn.com/public/16-11-20/50253248.jpg)

## 3. Project目录结构

![img](http://o7cqr8cfk.bkt.clouddn.com/public/16-11-20/4504409.jpg)

```
app.js：启动文件，或者说入口文件

package.json：存储着工程的信息及模块依赖，当在 dependencies 中添加依赖的模块时，运行 npm install ，npm 会检查当前目录下的 package.json，并自动安装
所有指定的模块

node_modules：存放 package.json 中安装的模块，当你在 package.json 添加依赖的模块并安装后，存放在这个文件夹下

public：存放 image、css、js 等文件

routes：存放路由文件

views：存放视图文件或者说模版文件

bin：存放可执行文件(www)
```

## 4. 各个主要文件的说明

### 4.1 app.js

```
//加载模块
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//加载路由文件
var index = require('./routes/index');
var users = require('./routes/users');

// 生产一个express的实例
var app = express();

// view engine setup
/*
设置 views 文件夹为存放视图文件的目录,
即存放模板文件的地方,__dirname 为全局变量,
存储当前正在执行的脚本所在的目录。
 */
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎为ejs
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//加载日志中间件
app.use(logger('dev'));
//加载解析json的中间件
app.use(bodyParser.json());
//加载解析urlencoded请求体的中间件。  post请求
app.use(bodyParser.urlencoded({extended: false}));
//加载解析cookie的中间件
app.use(cookieParser());
//设置public文件夹为放置静态文件的目录
app.use(express.static(path.join(__dirname, 'public')));

// 路由控制器。
app.use('/', index);  // http://localhost:3000
app.use('/users', users);   //http://localhost:3000/users


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//把app导出。  别的地方就可以通过 require("app") 获取到这个对象
module.exports = app;
```

### 4.2 bin/www

```
#!/usr/bin/env node //表明是node可执行文件

/**
 * Module dependencies.
 */
//引入我们在app.js中导出的app模块
var app = require('../app');
//引入debuger模块，打印调试日志
var debug = require('debug')('hello:server');
//引入http模块
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);  //设置端口号

/**
 * Create HTTP server.
 */
//创建Http服务器
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
//监听指定的端口
server.listen(port);
//监听error事件。 onError是发生错误的时候的回调函数
server.on('error', onError);
//监听listening事件
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
```

### 4.3 routes/index.js

```
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '育知同创' });
});

module.exports = router;
/*
 生成一个路由实例用来捕获访问主页的GET请求，
 导出这个路由并在app.js中通过app.use('/', routes);
 加载。这样，当访问主页时，就会调用res.render('index', { title: '育知同创' });
 渲染views/index.ejs模版并显示到浏览器中。
 */
```

### 4.4 对路由写法的优化

 在前面的**==app.js中==**，每个模板都有添加一次路由比较麻烦，其实应该把添加路由的事情专门交给index.js来做。也就是可以把多个路由放在一个路由文件中。

```
//加载路由文件
var index = require('./routes/index');  //去掉
var users = require('./routes/users');  //去掉
// 路由控制器。
app.use('/', index);  // http://localhost:3000  //去掉
app.use('/users', users);   //http://localhost:3000/users   //去掉
```

可以改成：

```
var routes = require('./routes/index');
routes(app);12
```

**index.js 文件优化成：** 这样管理起来就方便很多

```
module.exports = function (app) {
  //一个get请求的路由  http://localhost:3000
  app.get("/", function (req, res) {
      res.render("index", {title:"育知同创abc"})
  });
  //又一个请求路由：http://localhost:3000/abc
  app.get("/abc", function (req, res) {
      res.render("index", {title:"育知同创" + req.path})
  });
}
```

### 4.5 ejs模板

> 模板引擎（Template Engine）是一个将页面模板和要显示的数据结合起来生成 HTML 页面的工具。如果说上面讲到的 express 中的路由控制方法相当于 MVC 中的控制器的话，那模板引擎就相当于 MVC 中的视图。
>
> 模板引擎的功能是将页面模板和要显示的数据结合起来生成 HTML 页面。它既可以运 行在服务器端又可以运行在客户端，大多数时候它都在服务器端直接被解析为 HTML，解析完成后再传输给客户端，因此客户端甚至无法判断页面是否是模板引擎生成的。有时候模板引擎也可以运行在客户端，即浏览器中，典型的代表就是 XSLT，它以 XML 为输入，在客户端生成 HTML 页面。但是由于浏览器兼容性问题，XSLT 并不是很流行。目前的主流还是由服务器运行模板引擎。
>
> 在 MVC 架构中，模板引擎包含在服务器端。控制器得到用户请求后，从模型获取数据，调用模板引擎。模板引擎以数据和页面模板为输入，生成 HTML 页面，然后返回给控制器，由控制器交回客户端。
>
> **==ejs 是模板引擎的一种，它使用起来十分简单，而且与 express 集成良好。==**
>
> 我们通过以下两行代码设置了模板文件的**存储位置**和使用的**模板引擎**：(app.js文件中进行的设置)

```
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
```

```
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <p>Welcome to <%- title %></p>
  </body>
</html>
```

> 说明：

ejs 的标签系统非常简单，它只有以下三种标签：

- <% code %>：JavaScript 代码。
- <%= code %>：显示替换过 HTML 特殊字符的内容。(也就是说如果code中有标签，则会原样输出，不会让浏览器解析)
- <%- code %>：显示原始 HTML 内容。(如果有a标签，在浏览器端这则会看到一个超链接)

路由代码：

```
router.get('/', function(req, res, next) {
  res.render('index', { title: "<a href='http://www.baidu.com'>百度 </a>"});
});

// 则会用title的值去替换ejs中的相应的代码。
```

则生成的代码：

```
<!DOCTYPE html>
<html>
  <head>
    <title>&lt;a href=&#39;http://www.baidu.com&#39;&gt;百度 &lt;/a&gt;</title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1>&lt;a href=&#39;http://www.baidu.com&#39;&gt;百度 &lt;/a&gt;</h1>
    <p>Welcome to <a href='http://www.baidu.com'>百度 </a></p>
  </body>
</html>
```

# 三、使用上述搭建好的web服务器创建一个登陆注册的界面

## (一)、准备步骤

1. #### 先准备好要用到的数据,这里我们把数据放到一个json文件中,如下:

   ```json
   [
     {
       "user": "Jack",
       "pwd": "111111"
     },
     {
       "user": "Mark",
       "pwd": "222222"
     },
     {
       "user": "Andy",
       "pwd": "333333"
     },
     {
       "user": "Joe",
       "pwd": "444444"
     },
     {
       "user": "Lucy",
       "pwd": "555555"
     }
   ]
   ```

   #### 2.再用HTML+CSS写出一个登陆界面

   ```html
   <!DOCTYPE>
   <html>
   <head>
       <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
       <title>Login</title>
       <style>
           #login_div {
               margin: 120px auto;
               width: 380px;
               height: 300px;
               background: rgba(255, 255, 255, 0.2);
               background: url(images/img3.jpg) no-repeat center center;
               border-radius: 8px;
               box-shadow: 0 0 5px #000;
               text-align: center;
               font-family: "幼圆";
               color: #fff;
               text-shadow: 0 0 2px #000;
           }
           .login_input {
               width: 220px;
               height: 30px;
               font-size: 12px;
               border: 0;
               border-radius:5px;
               margin-top:10px;
               outline: none;
               position: relative;
               top:20px;
               padding: 8px;
               color: #ff5000;
               font-weight: bolder;
           }
           #login_div > h2 {
               position: relative;
               top: 30px;
               color: #fff;
           }
           #login {
               width: 200px;
               height: 30px;
               border-radius: 5px;
               color: #fff;
               background: #ff5050;
               border: 0;
               padding: 0;
               cursor: pointer;
               position: relative;
               top: 30px;
           }
           #remember {
               width: 200px;
               height: 30px;
               border: 0;
               margin: auto;
               font-size: 12px;
               padding: 0;
               position: relative;
               top:30px;
           }
           #remember p {
               margin-top: 5px;
               border: 0;
               padding: 0;
               line-height: 20px;
               height: 20px;
               width: 100px;
               float: left;
               text-shadow: 0 0 1px #333;
               position: relative;
               text-align: left;
               cursor: pointer;
           }
           #login_div a {
               text-shadow: 0 0 1px #000;
               font-size: 12px;
               width: 50px;
               height: 30px;
               position: relative;
               margin-left: 310px;
               margin-top: 70px;
               display: block;
               text-decoration: underline;
               cursor: pointer;
           }
       </style>
   </head>
   <body>
   <form action="/users/login" method="post">
       <div id="login_div">
           <h2>登录</h2>
           <input class="login_input" name="user" type="text" placeholder="请输入用户名" 
            autofocus autocomplete="off"/><br/>
           <input class="login_input" name="pwd" type="password" placeholder="请输入密碼"/><br/>
           <div id="remember">
               <p><input type="checkbox" style="vertical-align:-3px;"/>记住密码</p>
               <p style="left:0;text-align:right">忘记密码?</p>
           </div>
           <input id="login" type="submit" value="登录"/>
           <a href="register.html">注册账号</a>
       </div>
   </form>
   </body>
   </html>
   ```

   #### 3.再用HTML+CSS写出一个注册界面

   ```HTMl
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>Register</title>
       <style>
           #login_div {
               margin: 120px auto;
               width: 380px;
               height: 300px;
               background: rgba(255, 255, 255, 0.2);
               background: url(images/img3.jpg) no-repeat center center;
               border-radius: 8px;
               box-shadow: 0 0 5px #000;
               text-align: center;
               font-family: "幼圆";
               color: #fff;
               text-shadow: 0 0 2px #000;
           }
           .login_input {
               width: 220px;
               height: 30px;
               font-size: 12px;
               border: 0;
               border-radius:5px;
               margin-top:10px;
               outline: none;
               position: relative;
               top:20px;
               color: #ff5000;
               font-weight: bolder;
               padding-left: 8px;
           }
           #login_div > h2 {
               position: relative;
               top: 30px;
               color: #fff;
           }
           #login {
               width: 200px;
               height: 30px;
               border-radius: 5px;
               color: #fff;
               background: #ff5050;
               border: 0;
               padding: 0;
               cursor: pointer;
               position: relative;
               top: 50px;
           }
       </style>
   </head>
   <body>
   <form action="/users/register" method="post">
       <div id="login_div">
           <h2>注册</h2>
           <input class="login_input" name="user" type="text" autofocus placeholder="请输入用户名" 
       	autocomplete="off"/><br/>
           <input class="login_input" name="pwd" type="password" placeholder="请输入密码"/><br/>
           <input class="login_input" name="" type="password" placeholder="请确认密码"/><br/>
           <input id="login" type="submit" value="注册"/>
       </div>
   </form>
   </body>
   </html>
   ```

   > 准备工作做好后,我们开始写核心的东西

   ## (二)、在 routes/users.js 中的操作

   #### 1.首先添加登陆校验的功能

   ```javascript
   var express = require('express');
   var router = express.Router();
   const fs = require("fs");
   const path = require("path")
   /* GET users listing. */
   router.post('/login', function (req, res) {
       var user = req.body.user;
       var pwd = req.body.pwd;

       fs.readFile(path.join(__dirname, "../data/data.json"), "utf-8", function (error, data) {
           if (error) {
               res.send("<h1 style='color:orange'>! Server Error</h1>" + error);
               return;
           } else {
               let arr = JSON.parse(data);
               //遍歷數據 找出匹配的對象 返回用戶登錄成功
               for (let obj of arr) {
                   if (obj.user == user && obj.pwd == pwd) {
                       res.render('login_success', {user, title: 'Login success'});
                       return;
                   }
               }

               //遍歷數據 找出不匹配的對象  返回登錄失敗
               for (let obj of arr) {
                   if (obj.user != user && obj.pwd != pwd) {
                       res.send("<h1 style='color:red'>! Login fail</h1> userName&Password error" +
                           "<script>" +
                           "setTimeout(function(){window.location='/login.html'},3000)" +
                           "</script>" +
                           "<p>登陸失敗! 3秒后自动返回到登陆界面.....</p>");
                   } else if (obj.user != user) {
                       res.send("<h1 style='color:red'>! Login fail</h1> userName error" +
                           "<script>" +
                           "setTimeout(function(){window.location='/login.html'},3000)" +
                           "</script>" +
                           "<p>登陸失敗! 3秒后自动返回到登陆界面.....</p>");
                   } else {
                       res.send("<h1 style='color:red'>! Login fail</h1> Password error" +
                           "<script>" +
                           "setTimeout(function(){window.location='/login.html'},3000)" +
                           "</script>" +
                           "<p>登陸失敗! 3秒后自动返回到登陆界面.....</p>");
                   }
                   return;
               }
           }
       })
   });
   ```

   > 这里要注意几个点:
   >
   > ​	1. 数据的路径一定要写对
   >
   > ​	2. 最重要的一点就是,校验的时候要先校验是否匹配,然后再校验错误的情况.		也就是登陆成功和登陆失败,要分开来写,而且还必须要遍历两次数据 .

2. #### 再添加注册的功能

   ```javascript
   router.post('/register', function (req, res) {
       var user = req.body.user;
       var pwd = req.body.pwd;

       fs.readFile(path.join(__dirname, "../data/data.json"), "utf-8", function (error, data) {
           let arr = JSON.parse(data);

           //查詢數據庫中是否會有用戶註冊的數據  存在的話 提示用戶已存在
           for (let obj of arr) {
               if (obj.user == user) {
                   res.send("<h1 style='color:orange'>Register fail</h1>" +
                       "<script>" +
                       "setTimeout(function(){window.location='/register.html'},3000)" +
                       "</script>" +
                       "<p>已存在该用户名! 3秒后自动返回到注册页面.....</p>");
                   return;
               }
           }

           //不存在的話 向用戶返回註冊成功 并將數據添加到數據庫
           var obj = {"user": user, "pwd": pwd}
           arr.push(obj);
           fs.writeFile("../data/data.json", JSON.stringify(arr), "utf-8", function (error) {
               res.send("<h1 style='color:orange'>Register success</h1>" +
                   "<script>" +
                   "setTimeout(function(){window.location='/login.html'},3000)" +
                   "</script>" +
                   "<p>注册成功! 3秒后自动跳转到登陆界面.....</p>");
               return;
           })
       })
   });
   ```

   ```tex
   	这里要注意的是:判断用户是否存在,要和注册成功之后将数据写入分开来写. 还有一点就是  JSON.stringify(arr) 的使用,就是将
   JavaScript对象转换成Json数据,这点很重要,要不然数据库中的数据将全是 [object Object].
   ```

   #### 3.还有最重要的一步

   ```javascript
   module.exports = router;  //传送出模块可供请求的方法
   ```

   ## (三)、测试

   #### 1.登陆测试

   a.先运行bin/www.js文件,有两种方法

   - webstorm 打开bin/www.js文件,点击鼠标右键,在选择 Run'www' ,或者按快捷键  Ctrl+Shift+F10.
   - 打开电脑终端 找到工程文件夹 输入node www.js. 也可以运行www.js. 前提本文前面两大点都完成了.

   b.然后打开浏览器,在地址栏输入 http://127.0.0.1:3000/login.html 进入登陆界面.

   #### 2.注册测试

   a.点击登陆界面的 `注册账号`,进行注册.

   b.注册成功后,数据会直接插入到原本数据的后面

   ```Json
   [
     {
       "user": "Jack",
       "pwd": "111111"
     },
     {
       "user": "Mark",
       "pwd": "222222"
     },
     {
       "user": "Andy",
       "pwd": "333333"
     },
     {
       "user": "Joe",
       "pwd": "444444"
     },
     {
       "user": "Lucy",
       "pwd": "555555"
     },
     {
       "user": "Yc",
       "pwd": "250250"
     },
     {
       "user": "Lwp",
       "pwd": "123456"
     },
     {
       "user": "Yjr",
       "pwd": "777777"
     },
     {
       "user": "Ljj",
       "pwd": "888888"
     },
     {
       "user": "abc",
       "pwd": "123"
     }
   ]
   ```

   > 这就完成了一个通过后台数据的登陆注册界面.