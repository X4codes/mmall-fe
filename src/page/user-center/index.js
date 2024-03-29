/*
* @Author: HUANGXI
* @Date:   2017-08-15 09:48:57
* @Last Modified by:   HUANGXI
* @Last Modified time: 2017-08-15 10:54:35
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
	}
	
};

$(function () {
	page.init();
});
