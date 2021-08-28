var express = require('express');
var router = express.Router();

//登录界面渲染
	router.get('/',function(req, res, next) {
		req.session.user = null;
		res.render('login_register');
	});

//登录注册页面 登录功能实现
	router.post('/login',function(req, res) {
		var userName = req.body.userName;
		var userPwd = req.body.userPwd;
		req.session.user = null;
		BSdb.collection('users').find({'userName':userName}).toArray(function(err, doc) {
			if (err) throw err;
			if (doc == "" || userPwd != doc[0].userPwd) {
				console.log('用户不存在或密码错误！');
				res.json({
					status:'0',
					message:'用户不存在或密码错误！',
				});
			} else {
				console.log('账号密码正确！');
				req.session.user = userName;
				res.json({
					status:'1',
					message:'登录成功！',
				});
			}
		});
	});

//登陆注册页面 注册功能实现，验证输入的合法性
	router.post('/register',function(req, res) {
		var registerName = req.body.registerName;
		var registerPwd = req.body.registerPwd;
		var question = req.body.question;
		var answer = req.body.answer;
		var registerTime = new Date().toLocaleString();
		var pattName = /^[\a-zA-Z0-9]{6,12}$/;//密码以数字英文为主
		var pattPwd = /^[\w\W]{6,12}$/;//密码由数字英文符号为主
		var checkName = pattName.test(registerName);
		var checkPwd = pattPwd.test(registerPwd);
		if (checkName && checkPwd) {
//查询注册用户名是否已存在，然后进行相应操作
			BSdb.collection('users').find({'userName':registerName}).toArray(function(err, doc) {
				if (err) throw err;
				if (doc == "") {
//自动生成userId  注意nodejs中对mongodb 表内数据多少的查询方法
			BSdb.collection('users').find({}).sort({userId:-1}).limit(1).toArray(function(err, result) {
				if(err) throw err;
				var result = parseInt(result[0].userId);
				var userId = 1 + result + '';
				//插入用户数据
				var userInfo = {
					'userId':userId,
					'userName':registerName,
					'userPwd':registerPwd,
					'question':question,
					'answer':answer,
					'registerTime':registerTime,
					'userType':1
				};
				BSdb.collection('users').insertOne(userInfo, function(err, obj) {
						if(err) throw err;
						req.session.user = registerName;
						res.json({
							status:'1',
							message:'用户名可以使用！',
							result:'插入成功！'
							});
				});	
			});

				} else {
					res.json({
						status:'0',
						message:'用户已存在！',
						result:''
					});
				}
			});
		} else {
			res.json({
				status:'2',
				message:'输入不合法！',
				result:''
			});
		}
	});

module.exports = router;


