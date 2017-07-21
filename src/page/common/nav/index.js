/*
* @Author: HUANGXI
* @Date:   2017-07-21 19:02:08
* @Last Modified by:   HUANGXI
* @Last Modified time: 2017-07-21 20:00:49
*/

'use strict';
require('./index.css');
var _mm 	= require('util/mm.js');
var _user 	= require('service/user-service.js');
var _cart 	= require('service/cart-service.js');

// 导航
var nav = {
	// 初始化
	init : function () {
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();
		return this;
	},
	// 绑定事件
	bindEvent : function () {
		// 登录点击事件
		$('.js-login').click(function () {
			_mm.doLogin();
		});
		// 注册点击事件
		$('.js-register').click(function () {
			window.location.href = './register.html';
		});
		// 退出点击事件
		$('.js-logout').click(function () {
			_user.logout(function (res) {
				window.location.reload();
			},function (errMsg) {
				_mm.errorTips(errMsg);
			});
		});
	},
	// 加载用户信息
	loadUserInfo : function () {
		_user.checkLogin(function (res) {
			$('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
		},function (errMsg) {
			
		});
	},
	// 加载购物车数量
	loadCartCount : function () {
		_cart.getCartCount(function (res) {
			$('.nav .cart-count').text(res || 0);
		},function (errMsg) {
			$('.nav .cart-count').text(0);
		});
	}
};

module.exports = nav.init();