var	formValidation={
	//密码可见
	passwordOpen:function(){
		var oEye = document.querySelector('.eye');
		var showPwd = document.querySelector('#showPwd');
		//登录、注册 页面中 密码可见
		if(oEye){
			(function(){
				var oIpt = oEye.previousElementSibling||oEye.previousSbiling;
				oEye.addEventListener('tap',function(){
					if(oEye.classList.contains('eye-close')){
						oEye.classList.remove('eye-close');
						oEye.classList.add('eye-open');
						oIpt.setAttribute("type","text");
					}else{
						oEye.classList.add('eye-close');
						oEye.classList.remove('eye-open');
						oIpt.setAttribute("type","password");
					}
					
				},false);
			})();
		}
		//找回密码 页面中 密码可见
		if(showPwd){
			(function(){
				var bOk = true;
				var oBox = showPwd.parentNode.previousElementSibling||showPwd.parentNode.previousSbiling;
				var oIpt = oBox.querySelector('input');
				showPwd.addEventListener('tap',function(){
					
					if(bOk){
						oIpt.setAttribute("type", "password");	
					}else{
						oIpt.setAttribute("type", "text");	
					}
					bOk = !bOk;
					
				},false);
			})();
		}
		
	},
	//获取验证码
	getMessageCode:function(){
		var getCode = document.querySelector('.get-code');
		var getVCode = document.querySelector('.get-voice');
		if(getCode){
			getCode.addEventListener('tap',function(){
				formValidation.pFunction.getCode();
			},false);
		}
		if(getVCode){
			getVCode.addEventListener('tap',function(){
				getVCode.parentNode.innerHTML = '您将收到语音来电，请接听';
			},false);
		}
	},
	pFunction:{
		getCode:function(){
			var timer=null,
				time = 60,//需要设置的倒计时时长
				count=time+1,
				_this=document.querySelector('.get-code');
				kindTip = document.querySelector('.kind-tip');
			function countDown(){
				count--;
				_this.classList.add('no');
				_this.value = count+'秒后重新获取';
				_this.setAttribute('disabled','disabled');
				if(count == 40){
					kindTip.classList.add('show');
				}
				if(count==0){
					clearInterval(timer);
					_this.classList.remove('no');
					_this.value = '获取验证码';
					_this.removeAttribute('disabled');
					kindTip.classList.remove('show');
					count=time+1;
				}
			};
			
			countDown();
			timer=setInterval(countDown,1000);							
		}
	}
	
};	

document.addEventListener('DOMContentLoaded',function(){
	formValidation.passwordOpen();
	formValidation.getMessageCode();
},false);