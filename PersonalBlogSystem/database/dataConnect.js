var MongoClient  = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/BlogSystem';
var databaseConnect = function() {
	MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
		if(err) throw err;
		console.log('数据库已连接！');
		global.BSdb = db.db('BlogSystem');
	})
}

module.exports = databaseConnect;