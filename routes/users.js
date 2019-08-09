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
                    res.send(`<h1 style='color:red'>! Login fail</h1> userName&Password error<script>setTimeout(function back(){window.location='/login.html'},3000)</script><p>登陸失敗! 3秒后自动返回到登陆界面.....</p>`);
                } else if (obj.user != user) {
                    res.send(`<h1 style='color:red'>! Login fail</h1> userName error<script>setTimeout(function(){window.location='/login.html'},3000)</script><p>登陸失敗! 3秒后自动返回到登陆界面.....</p>`);
                } else {
                    res.send(`<h1 style='color:red'>! Login fail</h1> Password error<script>setTimeout(function(){window.location='/login.html'},3000)</script><p>登陸失敗! 3秒后自动返回到登陆界面.....</p>`);
                }
                return;
            }
        }
    })
});


/*--获取用户注册信息 并添加到 data.json 文件中--*/
router.post('/register', function (req, res) {
    var user = req.body.user;
    var pwd = req.body.pwd;

    fs.readFile(path.join(__dirname, "../data/data.json"), "utf-8", function (error, data) {
        let arr = JSON.parse(data);

        //查詢數據庫中是否會有用戶註冊的數據  存在的話 提示用戶已存在
        for (let obj of arr) {
            if (obj.user == user) {
                res.send(`<h1 style='color:orange'>Register fail</h1><script>setTimeout(function(){window.location='/register.html'},3000)</script><p>已存在该用户名! 3秒后自动返回到注册页面.....</p>`);
                return;
            }
        }

        //不存在的話 向用戶返回註冊成功 并將數據添加到數據庫
        var obj = {"user": user, "pwd": pwd}
        arr.push(obj);
        fs.writeFile("../data/data.json", JSON.stringify(arr), "utf-8", function (error) {
            res.send(`<h1 style='color:orange'>Register success</h1><script>setTimeout(function(){window.location='/login.html'},3000)</script><p>注册成功! 3秒后自动跳转到登陆界面.....</p>`);
            return;
        })
    })
});

module.exports = router;
