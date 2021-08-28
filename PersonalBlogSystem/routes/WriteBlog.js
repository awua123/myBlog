var express = require('express');
var router = express.Router();

//写博客页面渲染
	router.get('/', function(req, res, next) {
		if(req.session.user) {
			var eLink = [{a:'/users',b:req.session.user},{a:'/logout',b:'退出'}];
			BSdb.collection('categories').find({}).toArray(function(err, doc) {
				res.render('WriteBlog',{eLink:eLink,doc:doc});
			})			
		} else {
			res.redirect('/login');
		}
	});
//写博客 post请求
	router.post('/deliver',function(req, res) {
		var blogTitle = req.body.blogTitle;
		var categoryName = req.body.categoryName;
		var articleContent = req.body.articleContent;
		var articleAuthor = req.session.user;
		var datetime =new Date().toLocaleString();
		var articleId = '';
		if (blogTitle == '' || articleContent == '') {
			res.json({
				status:'0',
				message:'标题或内容不能为空！',
				result:'failed'
				});
		} else {
//自动生成articleId  注意nodejs中对mongodb 表内数据多少的查询方法
			BSdb.collection('article').find({}).sort({articleId:-1}).limit(1).toArray(function(err, result) {
				if(err) throw err;
				if(result == '') {
					articleId = '200001';
				} else {
					var result = parseInt(result[0].articleId);
					articleId =  1 + result + '';
				}
				var articleInfo = {
			    "articleId" : articleId,
			    "articleTitle" : blogTitle,
			    "articleAuthor" : articleAuthor,
			    "categoryName" : categoryName,
			    "content" : articleContent,
			    "visits" : "0",
			    "datetime" : datetime			
				};
				BSdb.collection('article').insertOne(articleInfo,function(err, doc) {
					if (err) throw err;
					res.json({
						status:'1',
						message:'发表成功！',
						result:'success'
					})
				})
			})
		}
	})

module.exports = router;