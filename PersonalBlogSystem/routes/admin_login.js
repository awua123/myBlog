var express = require('express');
var router = express.Router();

//管理员登录界面
	router.get('/', function(req, res, next) {
		res.render('admin_login',{title:'administrator'});
	});

//管理员登录功能
	router.post('/login',function(req, res) {
		var userName = req.body.userName;
		var userPwd = req.body.userPwd;
		req.session.admin = null;
		BSdb.collection('users').find({'userName':userName}).toArray(function(err4, res4) {
			if (err4) throw err;
			if (res4 == "" || userPwd != res4[0].userPwd || res4[0].userType != 0) {
				console.log('用户不存在或密码错误！');
				res.json({
					status:'0',
					message:'用户不存在或密码错误！',
				});
			} else {
				console.log('账号密码正确！');
				req.session.admin = userName;
				req.session.user = userName;
				res.json({
					status:'1',
					message:'登录成功！',
				});
			}
		});
	});

module.exports = router;