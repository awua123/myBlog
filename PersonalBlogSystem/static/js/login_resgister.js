window.onload=function(){

	var usernameInput = $("#login input[ type='text' ]");
	var pwdInput = $("#login input[ type='password' ]");
	$("#loginCheck").click(function() {	
		if(usernameInput.val() == "" || pwdInput.val() == "") { // 输入为空时给出提示
			$("#log_tips").css("visibility","visible");
		} else { //输入不为空时 ajax验证
			$("#log_tips").html("用户名或密码错误！");
			$("#log_tips").css("visibility","visible");		
		}
	})



	//提示隐藏
	$("#login input").focus(function() {
		$("#log_tips").css("visibility","hidden");
	})

}