/*
* @Author: HUANGXI
* @Date:   2017-08-15 09:48:57
* @Last Modified by:   HUANGXI
* @Last Modified time: 2017-08-17 15:39:43
*/

'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide  	  = require('page/common/nav-side/index.js');
var _mm 	 	  = require('util/mm.js');
var _user 	 	  = require('service/user-service.js');
var templateIndex = require('./index.string');

//  页面逻辑
var page = {
	init : function () {
		this.onLoad();
	},
	onLoad : function () {
		// 初始化左侧菜单
		navSide.init({
			name : 'user-center'
		});
		// 加载用户信息
		this.loadUserInfo();
		this.bindEvent();
	},
	bindEvent : function () {
		var _this = this;
		// 点击提交按钮后动作
		$(document).on('click', '.btn-submit', function () {
			var userInfo = {
				phone 	 : $.trim($('#phone').val()),
				email 	 : $.trim($('#email').val()),
				question : $.trim($('#question').val()),
				answer 	 : $.trim($('#answer').val()),
			};
			var validateResult = _this.validateForm(userInfo);
			if (validateResult.status) {
				// 更改用户信息
				_user.updateUserInfo(userInfo,function (res, msg) {
					_mm.successTips(msg);
					window.location.href = './user-center.html';
				}, function (errMsg) {
					_mm.errorTips(errMsg);
				});
			}
			else{
				_mm.errorTips(validateResult.msg);
			}
		});
	},
	// 加载用户信息
	loadUserInfo : function () {
		var userHtml = '';
		_user.getUserInfo(function (res) {
			userHtml = _mm.renderHtml(templateIndex, res);
			$('.panel-body').html(userHtml);
		}, function (errMsg) {
			_mm.errorTips(errMsg);
		});
	},
	// 验证用户信息
	validateForm : function (formData) {
		var result = {
			status  : false,
			msg		: ''
		};
		// 验证手机号
		if (!_mm.validate(formData.phone, 'phone')) {
			result.msg = '手机格式错误';
			return result;
		}
		// 验证邮箱
		if (!_mm.validate(formData.email, 'email')) {
			result.msg = '邮箱格式错误';
			return result;
		}
		// 验证密码提示问题是否为空
		if (!_mm.validate(formData.question, 'require')) {
			result.msg = '密码提示问题不能为空';
			return result;
		}
		// 验证答案是否为空
		if (!_mm.validate(formData.answer, 'require')) {
			result.msg = '密码提示问题答案不能为空';
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
