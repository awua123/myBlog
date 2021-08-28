var express = require('express');
var router = express.Router();

//个人信息中心
	router.get('/', function(req, res, next) {
		if(req.session.user) {
		 	var articleAuthor = req.session.user;
			var dLink = [{a:'/WriteBlog',b:'写博客'},{a:'/user',b:req.session.user},{a:'/logout',b:'退出'}];
			 	BSdb.collection('article').find({'articleAuthor':articleAuthor}).toArray(function(err, doc) {
			 		article = doc;
			 		res.render('user',{article:article,dLink:dLink});
			 	})
		} else {
			res.redirect('/login');
		}
	});

module.exports = router;