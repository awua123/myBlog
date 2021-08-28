var express = require('express');
var router = express.Router();

//忘记密码界面渲染
	router.get('/',function(req, res, next) {
		res.render('getPwd',{title:'hello'});
	});

//密码找回 AJAX请求
	router.post('/getPassword',function(req, res) {
		var userName = req.body.userName;
		var answer = req.body.answer;
		var question =req.body.question;
		if (userName == '' || answer == '') {
			res.json({
				status:'0',
				message:'用户名或答案不能为空！',
				result:'failed'
				});
		} else {
			BSdb.collection('users').find({'userName':userName}).toArray(function(err, doc) {
			if (err) throw err;
			if(doc != '' && question == doc[0].question && answer == doc[0].answer) {
				res.json({
					status:'1',
					message:'您的密码是:"'+doc[0].userPwd+'," 请您牢记密码！',
					result:'success'
					});
			} else if(doc == ''){
				res.json({
					status:'0',
					message:'用户不存在！',
					result:'failed'
					});
			} else if(question != doc[0].question || answer != doc[0].answer) {
				res.json({
					status:'0',
					message:'答案错误！',
					result:'failed'
					});
			}
		})
		}
	})

module.exports = router;
