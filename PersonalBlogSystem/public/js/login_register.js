window.onload=function(){


	//登录验证
	var usernameInput = $("#login input[ name='userName' ]");
	var pwdInput = $("#login input[ name='password' ]");
	$("#loginCheck").click(function() {	
		var uname = usernameInput.val();
		var pwd = pwdInput.val();
		if(uname == "" || pwd == "") { // 输入为空时给出提示
			$("#log_tips").html("请输入账号密码！");
			$("#log_tips").css("visibility","visible");
		} else { //输入不为空时 ajax验证
		//AJAX请求
		$.ajax({
		type:"POST",
		url:"/login/login",
		contentType:"application/x-www-form-urlencoded",
		data:{"userName":uname,"userPwd":pwd},
		success:function(res) {
			if(res.status == 0) {
				$("#log_tips").html(res.message);
				$("#log_tips").css("visibility","visible");		
			} else if(res.status == 1) {
				window.location.href="/home"
			}
			
		},
		error:function() {
			console.log('error')
		}
		});
		}
	});

	//注册验证
	var registerName,registerPwd,confirmPwd,question,answer = "";
	$("#registerCheck").click(function() {	
		var registerName = $("#register input[ name='registerName' ]").val();
		var registerPwd = $("#register input[ name='password' ]").val();
		var confirmPwd = $("#register input[ name='confirmPwd' ]").val();
		var question = $("#question").val();
		var answer = $("#register input[ name='answer' ]").val();
		var pattName = /^[\a-zA-Z0-9]{6,12}$/;//密码以数字英文为主
		var pattPwd = /^[\w\W]{6,12}$/;//密码由数字英文符号为主
		var checkName = pattName.test(registerName);
		var checkPwd = pattPwd.test(registerPwd);
		//判断输入
		if(registerName == "" || registerPwd == "" || confirmPwd == "") { // 输入为空时给出提示
			alert("输入不能为空！");
		} else if(confirmPwd != registerPwd){
			alert("第二次密码输入不正确！");
		} else if (checkName && checkPwd) {
			$.ajax({
			type:"POST",
			url:"/login/register",
			contentType:"application/x-www-form-urlencoded",
			data:{"registerName":registerName,"registerPwd":registerPwd,"question":question,"answer":answer},
			success:function(res) {
				if(res.status == 0) {
					alert(res.message);	
				} else if(res.status == 1) {
					setTimeout(function(){
						window.location.href="/home"
					}, 1000);			
				} else if (res.status == 2) {
					alert(res.result);
				}	
			},
			error:function() {
				console.log('error')
				}
			});
	} else{
		alert("输入不合法！");
	}
	});

	//提示隐藏
	$("#login input").focus(function() {
		$("#log_tips").css("visibility","hidden");
	})

}
