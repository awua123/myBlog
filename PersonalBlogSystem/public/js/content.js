window.onload=function () {
	var comment = $(".comment input[type = 'button']");
	var blogComment = $(".blogComment");
	comment.click(function() {
		var commentContent = $(".comment textarea").val();
		$.ajax({
		type:"POST",
		url:"/content/comment",
		contentType:"application/x-www-form-urlencoded",
		data:{"commentContent":commentContent},
		success:function(res) {
			if(res.status == 0) {
				alert(res.message);
			} else if(res.status == 1) {
				alert(res.message);
			} else {
				//alert(res.message);
				var result = res.result;
				var str = "<li><span class='observer'>"+result.commentName+"：</span><span class='comContent'><p>"+result.commentContent+"</p></span><span class='comTime'><p>"+result.commentTime+"</p></span></li>";
				blogComment.prepend(str);
				$(".comment textarea").val("");
			}
		},
		error:function() {
			console.log('error')
		}
		});
	})

}
