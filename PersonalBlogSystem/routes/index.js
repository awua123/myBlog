var express = require('express');
var router = express.Router();
var MongoClient  = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/BlogSystem';
var connect = require('../database/dataConnect.js');
connect();
//查询文章进行首页渲染
	router.get('/', function(req, res, next) {
		req.session.user = null;
		BSdb.collection('categories'). find({}).toArray(function(err, doc) { // 返回集合中所有数据
		    if (err) throw err;
		    var category = doc;
	 		BSdb.collection('article'). find({ "categoryName" : "前端"}).toArray(function(err, doc2) { // 返回集合中所有数据
			    if (err) throw err;
		    	var article = doc2;
				var aLink = [{
					a:'/login',
					b:'登录注册'
				}];
				res.render('index',{category:category,article:article,aLink:aLink});
			});
		});
	});
	
//处理首页ajax get请求类别文章渲染
	router.get('/index', function(req, res) {
		var whereStr = req.query; //查询条件
		BSdb.collection('article').find(whereStr).toArray(function(err, doc) {
		if (err) throw err;
		 res.send(doc);
		})
	});	

//用户或管理员登出
	router.route('/logout').get(function(req, res, next) {
		req.session.user = null;
		res.redirect('/');
	});
	router.route('/admin_logout').get(function(req, res, next) {
		req.session.admin = null;
		res.redirect('/admin_login');
	});


module.exports = router;
