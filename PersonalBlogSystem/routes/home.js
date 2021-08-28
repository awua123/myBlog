var express = require('express');
var router = express.Router();

//登录之后个人首页的渲染
	router.get('/',function (req, res) {  //判断缓存中是否有username的值，有到达home 没到达登录界面
		 if(req.session.user) {
		 	var bLink = [{a:'/WriteBlog',b:'写博客'},{a:'/users',b:req.session.user},{a:'/logout',b:'退出'}];
		 	BSdb.collection('categories'). find({}).toArray(function(err, doc) { // 返回集合中所有数据
			    if (err) throw err;
			    category = doc;
			 	BSdb.collection('article'). find({ "categoryName" : "前端"}).toArray(function(err, doc) {
			 		if (err) throw err;
			 		article = doc;
			 		res.render('home',{category:category,article:article,bLink:bLink});
			 	})
			 })	
		 } else {
		 	res.redirect('/login');
		 } 
	});

module.exports = router;


