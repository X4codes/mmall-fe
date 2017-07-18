/*
* @Author: HUANGXI
* @Date:   2017-07-12 19:08:45
* @Last Modified by:   HUANGXI
* @Last Modified time: 2017-07-18 21:13:29
*/

'use strict';

var _mm = require('util/mm.js');

_mm.request({
	url : '/product/list.do?keyword=1',
	success : function (res) {
		console.log(res);
	},
	error : function (errMsg) {
		console.log(errMsg);
	}
});