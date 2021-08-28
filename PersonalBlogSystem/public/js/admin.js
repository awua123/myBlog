	var num = 1;
	var arr = [];
	function change(data) {
		num = data;
		var aList = $(".btn a");
		var btn = $(".btn:nth-child("+num+")");
		for (var a = 0; a < aList.length; a++ ){
			aList.css({
	  			"color":"#000",
	  			"background-color":"#fff"
				});
		}
			$(".btn:nth-child("+num+") a").css({
				"background-color":"#f44444",
				"color":"#fff"
			}) 
		$.ajax({
		type:"POST",
		url:"/admin/manage",
		contentType:"application/x-www-form-urlencoded",
		data:{num},
		success:function(res) {
			if(res.status == 0) {
				alert(res.message);
			} else if (res.status == 1) {
				result = res.result;
				var str = template("blogManage",{result});
				$(".content").html(str);
			} else if(res.status == 2) {
				result = res.result;
				var str = template("userManage",{result});
				$(".content").html(str);
			} else if (res.status == 3) {
				result = res.result;
				var str = template("commentManage",{result});
				$(".content").html(str);
			} else if (res.status == 4) {
				result = res.result;
				var str = template("categoryManage",{result});
				$(".content").html(str);
			}
		},
		error:function() {
			console.log('error')
		}
		});
	}

	
	function operation(operation) {
		var value = $(".content li>input[type = 'checkbox']");
		for(var i = 0;i<value.length;i++){
			if(value[i].checked){
				arr.push(value[i].value)
			}
		}
		var data = {
			"num":num,
			"operation":operation,
			"arr":arr
		}
		$.ajax({
		type:"POST",
		url:"/admin/dataOperation",
		contentType:"application/x-www-form-urlencoded",
		data:data,
		traditional: true,
		success:function(res) {
			if(res.status == 0) {
				alert(res.message);
			} else if (res.status == 1) {
				result = res.result;
				alert(res.message)
				change(num);
				arr = [];
			}
		},
		error:function() {
			console.log('error')
		}
		});
	}

