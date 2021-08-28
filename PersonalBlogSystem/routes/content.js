var express = require('express');
var router = express.Router();

//内容页的渲染
	router.get('/',function(req, res, next) {
		var articleId = req.query;
		req.session.articleId = articleId;
		var comment = '';
		BSdb.collection('article').find(articleId).toArray(function(err, doc) {
			if (err) throw err;
			doc = doc[0];
			BSdb.collection('comment').find(articleId).toArray(function(err, doc1) {
				comment = doc1;
				var cLink = [];
				if(req.session.user && req.session.admin == null) {
				 	cLink = [{a:'/WriteBlog',b:'写博客'},{a:'/users',b:req.session.user},{a:'/logout',b:'退出'}];
					res.render('content',{index:'/home',cLink:cLink,doc:doc,comment:comment}); //顶部通栏显示个人信息 可以评论
				} else if (req.session.admin) {
					req.session.user = req.session.admin;
					cLink = [{a:'/admin_logout',b:'退出'}];
					res.render('content',{index:'/admin',cLink:cLink,doc:doc,comment:comment}); //顶部通栏显示管理员信息 可以评论
				}
				else {
					cLink = [{a:'/login',b:'登录注册'}]
					res.render('content',{index:'/',cLink:cLink,doc:doc,comment:comment});// 没有个人信息 不可以评论
				}
			})
		})	
	});

//评论功能实现
	router.post('/comment',function(req, res) {
		var commentTime =new Date().toLocaleString();
		var articleId = req.session.articleId.articleId;
		var commentContent = req.body.commentContent;
		if(req.session.user) {
			if (commentContent == '') {
				res.json({
					status:'1',
					message:'输入不能为空！',
					result:'success'
					});
			} else {
				BSdb.collection('comment').find({}).sort({commentId:-1}).limit(1).toArray(function(err, result) {
					if(err) throw err;
					if(result == '') {
						commentId = '300001';
					} else {
						var result = parseInt(result[0].commentId);
						commentId =  1 + result + '';
					}
					var commentInfo = {
						'commentId':commentId,
						'commentName':req.session.user,
						'commentContent':commentContent,
						'commentTime':commentTime,
						'articleId':articleId
					}
					BSdb.collection('comment').insertOne(commentInfo,function(err, doc) {
						if(err) throw err;
						res.json({
							status:'2',
							message:'评论成功！',
							result:commentInfo
							});
					})
				});
			}		
		} else {
			res.json({
					status:'0',
					message:'你还没有登录呢',
					result:'failed'
					});
		};
	});

module.exports = router;

