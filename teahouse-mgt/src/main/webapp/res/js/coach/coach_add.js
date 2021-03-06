define([],function() {
var coachAdd = {
	appPath : getPath("app"),
	imgPath:getPath("img"),
	init : function() {
		//添加提交
		$("#saveCoach").off().click(function(){
			coachAdd.addCoach();
		});
		//返回
		$("#closeAddCoach").click(function(){
			closeTab("会员转为教练");
//			$("#coachList").DataTable().ajax.reload(function(){});
		});
		//上传图片弹出层
		$("#addCoachPhotoUs").click(function(){
			$("#coachAddModalUs").modal("show");
		});
		//新增图片回填
		$("#addCoachPhotoBtnUs").click(function(){
			var form=$("form[name=coachPhotoFormUs]");
			var img=form.find("input[name=memberPhotoUrl]").val();
			if(img!=""){
				var form1=$("form[name=coachAddForm]");
				form1.find("input[name=memberPhotoUrl]").val(img);
				form1.find("img[name=coachPicUrlImg]").attr("src",coachAdd.imgPath+"/"+img);
				$("#coachAddModalUs").modal("hide");
			}else{
				bootbox.alert("<img src='res/img/tan.png' style='width: 29px;height: 29px;margin-top: -4px'>&nbsp;&nbsp;" + "请上传图片！");
			}
		});
	},
	addCoach:function() {
		var form = $("form[name=coachAddForm]");
		form.ajaxSubmit({
			url : coachAdd.appPath + "/coach/saveOrUpdateCoach.do",
			type : "post",
			success : function(res) {
				var msg = res.msg;
				var code = res.code;
				if (code == "1") {
					bootbox.alert("<img src='res/img/tan.png' style='width: 29px;height: 29px;margin-top: -4px'>&nbsp;&nbsp;"+"添加成功!", function() {
						closeTab("会员转为教练");
//						window,close();
						$("#memberList").DataTable().ajax.reload(function(){});
					});
				} else {
					bootbox.alert("<img src='res/img/tan.png' style='width: 29px;height: 29px;margin-top: -4px'>&nbsp;&nbsp;" + "添加失败!");
				}
			},
			beforeSubmit : function(formData, jqForm, options) {// 提交表单前数据验证
				$("span[name='coachNameAdd']").empty();
				$("span[name='coachNickAdd']").empty();
				$("span[name='idCardAdd']").empty();
				
				var idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				
				if ($.trim(form.find("input[name='coachName']").val()) == "") {
					$("span[name='coachNameAdd']").append("<font color='red'>请输入教练名称！</font>");
					return false;
				}
				if ($.trim(form.find("input[name='coachNick']").val()) == "") {
					$("span[name='coachNickAdd']").append("<font color='red'>请输入教练昵称！</font>");
					return false;
				}
				if ($.trim(form.find("input[name='idCard']").val()) == "") {
					$("span[name='idCardAdd']").append("<font color='red'>请输入身份证！</font>");
					return false;
				}
				if (idCardReg.test($.trim(form.find("input[name='idCard']").val())) == false) {
					$("span[name='idCardAdd']").append("<font color='red'>输入身份证格式不对（正确格式应为15位或者18位）！</font>");
					return false;
				}
				
				var synopsis = $.trim(form.find("textarea[name='synopsis']").val());
				if(synopsis.length > 200){
					bootbox.alert("<img src='res/img/tan.png' style='width: 29px;height: 29px;margin-top: -4px'>&nbsp;&nbsp;" + "输入教练简介字符不能大于200!");
					return false;
				}
			
			}
		});
	 }
	}
	return coachAdd;
})