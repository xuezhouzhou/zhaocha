;(function($){
	$(function(){
		var oAudio = document.getElementById('audio');
		var oVideo = document.getElementById('video')
		var time = 30;//剩余时间
		var timer;//定时器
		var star = 0;//星星数量,记录找到的隐患数量
		var soundKey = true;//声音开关		
		
		//提示信息界面的继续按钮
		$("#go-on").on('touchstart',function(){
			$('#tips,#hover').hide();
			timer = setInterval(countdown,1000);
		});
		
		//故事背景播放完毕
		oVideo.addEventListener('ended',function(){
			$('#sound').show();//显示声音切换按钮
			$("#video-wrap").hide();//隐藏视频
			$("#main").show();//显示游戏主页面
			if(soundKey){
				oAudio.play();
			}
		});
		
		//跳过动画
		$('#skip').on('touchstart',function(){
			$('#sound').show();//显示声音切换按钮
			$("#video-wrap").hide();//隐藏视频
			$("#main").show();//显示游戏主页面
			oVideo.pause();
			oVideo.currentTime = 0;
			if(soundKey){
				oAudio.play();
			}
		});
		
		//主页开始游戏按钮
		$("#btn-start").on('touchstart',function(){
			$("#index").hide();//隐藏主页
			$('#sound').hide();//隐藏声音切换按钮
			oAudio.pause();//暂停背景音乐
			$("#video-wrap").show();//显示故事背景
			oVideo.play();//播放故事背景
		});
		
		//背景音乐开关
		$('#sound').on('touchstart',function(){
			if(oAudio.paused){
				soundKey = true;
				oAudio.play();
			}else{
				soundKey = false;
				oAudio.pause();	
			}
			$(this).toggleClass('sound-off');
		});
		
		//问题1所有圈圈
		$(".ques1").on('touchstart',function(){
			showQuanQuan($(".ques1"),$("#question1"));
		});
		
		//问题2所有圈圈
		$(".ques2").on('touchstart',function(){
			showQuanQuan($(".ques2"),$("#question2"));
		});
		
		//问题3所有圈圈
		$(".ques3").on('touchstart',function(){
			showQuanQuan($(".ques3"),$("#question3"));
		});
		
		//问题4所有圈圈
		$(".ques4").on('touchstart',function(){
			showQuanQuan($(".ques4"),$("#question4"));
		});
		
		//倒计时
		function countdown(){
			time--;
			$("#time-num").text(time);
			var width = parseInt(time/30*665)+'px';
			$('#time-bar-cur').css({width:width});
			
			//剩余十秒提示未找到的点
			if(time<=10 && time>0){
				$(".quan:visible").addClass('quan-tips');		
			}else if(time<=0){
				$("#fail,#hover").show();	
				clearInterval(timer);	
			}
		}
		
		//显示圈圈
		function showQuanQuan($ques,$question){
			clearInterval(timer);	
			$("#hover").show();
			$("#hover2").show();
			$ques.addClass('quan-show').removeClass('quan-tips');
			$question.show();
			star++;
			var className = "star" +　star;
			$("#star img").removeClass().addClass(className);
		}
		
		//显示原因后继续
		function goOn($hide){
			$hide.hide();
			if(star==4){
				$("#success").show();	
			}else{
				timer = setInterval(countdown,1000);
			}
		}
		
		//问题1继续
		$("#question1 .btn-go-on").on('touchstart',function(){
			goOn($('#question1,#hover,.ques1,#hover2'));
		});
		
		//问题2继续
		$("#question2 .btn-go-on").on('touchstart',function(){
			goOn($('#question2,#hover,.ques2,#hover2'));
		});
		
		//问题3继续
		$("#question3 .btn-go-on").on('touchstart',function(){
			goOn($('#question3,#hover,.ques3,#hover2'));
		});
		
		//问题4继续
		$("#question4 .btn-go-on").on('touchstart',function(){
			goOn($('#question4,#hover,.ques4,#hover2'));
		});
		
		//从新玩
		$("#fail .btn-jx").on('touchstart',function(){
			gameReset();
			$("#fail").hide();
			//timer = setInterval(countdown,1000);
		});
		
		//重置
		function gameReset(){
			star = 0;
			time = 30;
			$('#time-bar-cur').css({width:"665px"});
			$("#time-num").text(time);
			$("#star img").removeClass().addClass("star0");
			$("#hover,#tips,.quan").show();
			$(".quan").removeClass("quan-show").removeClass("quan-tips");
		}
		
		//返回主界面
		$("#fail .btn-back,#success .btn-back").on('touchstart',function(){
			gameReset();
			$(this).parent().hide();
			$("#main").hide();
			$("#index").show();
		});
	});
})(Zepto);