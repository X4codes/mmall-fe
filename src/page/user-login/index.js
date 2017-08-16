/*
* @Author: HUANGXI
* @Date:   2017-07-12 19:51:20
* @Last Modified by:   HUANGXI
* @Last Modified time: 2017-08-15 13:22:34
*/

'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _user   = require('service/user-service.js');
var _mm     = require('util/mm.js');

// 表单错误提示
var formError = {
	show : function (errMsg) {
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide : function () {
		$('.error-item').hide().find('.err-msg').text('');
	}
};
//  页面逻辑
var page = {
	init : function () {
		this.bindEvent();
	},
	bindEvent : function () {
		var _this = this;
		// 点击登录按钮进行提交
		$('#submit').click(function () {
			_this.submit();
		});
		// 按下回车进行提交
		$('.user-content').keyup(function (e) {
			// keyCode === 13 表示回车键
			if(e.keyCode === 13){
				_this.submit();
			}
		});
	},
	// 提交表单
	submit : function () {
		var formData = {
			username : $.trim($('#username').val()),
			password : $.trim($('#password').val())
		},
		// 表单验证结果
		validateResult = this.formValidate(formData);
		// 验证成功
		if (validateResult.status) {
			// 提交
			_user.login(formData, function (res) {
				window.location.href = _mm.getUrlParam('redirect') || './index.html';
			}, function (errMsg) {
				formError.show(errMsg);
			});
		}
		// 验证失败
		else{
			// 错误提示
			formError.show(validateResult.msg);
		}
	},
	// 表单字段验证
	formValidate : function (formData) {
		var result = {
			status  : false,
			msg		: ''
		};
		if (!_mm.validate(formData.username, 'require')) {
			result.msg = '用户名不能为空';
			return result;
		}
		if (!_mm.validate(formData.password, 'require')) {
			result.msg = '密码不能为空';
			return result;
		}
		// 通过验证，返回正确提示
		result.status = true;
		result.msg	  = '验证通过';
		return result;
	}
};

$(function () {
	page.init();
});


