/*
* @Author: HUANGXI
* @Date:   2017-07-21 19:27:25
* @Last Modified by:   HUANGXI
* @Last Modified time: 2017-07-21 19:52:19
*/

'use strict';

var _mm = require('util/mm.js');

var _user = {
	// 检查登录状态
	checkLogin : function (resolve, reject) {
		_mm.request({
			url 	: _mm.gerServerUrl('/user/get_user_info.do'),
			method  : 'POST',
			success : resolve,
			error 	: reject
		});
	},
	// 登出
	logout : function (resolve, reject) {
		_mm.request({
			url 	: _mm.gerServerUrl('/user/logout.do'),
			method  : 'POST',
			success : resolve,
			error 	: reject
		});
	}
};

module.exports = _user;