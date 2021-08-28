var express = require('express');
var router = express.Router();

//管理员界面
	router.get('/', function(req, res, next) {
		if(req.session.admin) {
		BSdb.collection('article').find({}).toArray(function(err, doc){
			if (err) throw err;
			var administrator = req.session.admin;
			res.render('admin',{doc:doc,administrator:administrator});
		})
		} else {
			res.redirect('/admin_login');
		}			
	});

//左侧导航栏切换功能
	router.post('/manage', function(req, res, next) {
		var data = req.body.num;
		if(data == 1) {
			BSdb.collection('article').find({}).toArray(function(err, doc){
				if (err) throw err;
				res.json({
					status:'1',
					message:'成功！',
					result:doc
				})
			})
		} else if (data == 2) {
			BSdb.collection('users').find({}).toArray(function(err, doc){
				if (err) throw err;
				res.json({
					status:'2',
					message:'成功！',
					result:doc
				})
			})
		} else if (data == 3) {
			BSdb.collection('comment').find({}).toArray(function(err, doc){
				if (err) throw err;
				res.json({
					status:'3',
					message:'成功！',
					result:doc
				})
			})
		} else if (data == 4) {
			BSdb.collection('categories').find({}).toArray(function(err, doc){
				if (err) throw err;
				res.json({
					status:'4',
					message:'成功！',
					result:doc
				})
			})
		} else {
			res.json({
					status:'0',
					message:'未知错误！',
					result:'error'
				})
		}
	});

//数据库数据操作 增删改
	router.post('/dataOperation', function(req, res, next) {
		var data = req.body.num;
		var operation = req.body.operation;
		var arr = req.body.arr;
		var id = [];
		if(!Array.isArray(arr)) {
			id.push(arr);
		} else {
			arr.forEach( function(element, index) {
				id.push(element);
			});
		}
		if (arr == undefined) {
			res.json({
					status:'0',
					message:'请选择！',
					result:''
				})
		} else {
			var i = id.length-1;
			if(data == 1) {     //---------博客文章管理
				if(operation == 'del') {
					id.forEach( function(element, index) {
						var whereStr = {'articleId':element};
						BSdb.collection('article').deleteOne(whereStr,function(err, obj){
							if (err) throw err;
							if(i == index){
								i += 1;
								res.json({
									status:'1',
									message:i + '篇博客删除成功！',
									result:'success'
								})
							}
						})
					})	
				} else {
					res.json({
							status:'0',
							message:'功能待完善！',
							result:''
						})
				}
				
			} else if (data == 2) {     //---------用户管理
				if(operation == 'del') {
					id.forEach( function(element, index) {
						var whereStr = {'userId':element};
						BSdb.collection('users').deleteOne(whereStr,function(err, obj){
							if (err) throw err;
							if(i == index){
								i += 1;
								res.json({
									status:'1',
									message:i + '名用户删除成功！',
									result:'success'
								})
							}
						})
					})
				} else {
					res.json({
							status:'0',
							message:'功能待完善！',
							result:''
						})
				}
			} else if (data == 3) {     //---------评论管理
				if(operation == 'del') {
					id.forEach( function(element, index) {
						var whereStr = {'commentId':element}
						BSdb.collection('comment').deleteOne(whereStr,function(err, obj){
							if (err) throw err;
							if(i == index){
								i += 1;
								res.json({
									status:'1',
									message:i + '条评论删除成功！',
									result:'success'
								})
							}
						})
					})	
				} else {
					res.json({
							status:'0',
							message:'功能待完善！',
							result:''
						})
				}
			} else if (data == 4) {     //---------类别管理
				if(operation == 'del') {
					id.forEach( function(element, index) {
						var whereStr = {'categoryId':element}
						BSdb.collection('categories').deleteOne(whereStr,function(err, obj){
							if (err) throw err;
							if( i == index){
								i += 1;
								res.json({
									status:'1',
									message:i + '个类别删除成功！',
									result:'success'
								})
							}
						})
					})
				} else {
					res.json({
							status:'0',
							message:'功能待完善！',
							result:''
						})
				}
			} else {
				res.json({
						status:'0',
						message:'未知错误！',
						result:'error'
					})
			}
		}
	});

module.exports = router;