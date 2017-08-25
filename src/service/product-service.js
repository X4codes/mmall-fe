/*
* @Author: HUANGXI
* @Date:   2017-07-21 19:27:25
* @Last Modified by:   HUANGXI
* @Last Modified time: 2017-08-25 09:44:51
*/

'use strict';

var _mm = require('util/mm.js');

var _product = {
	// 获取商品列表
	getProductList : function (listParam, resolve, reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/product/list.do'),
			data	: listParam,
			success : resolve,
			error 	: reject
		});
	},
	getProductDetail : function (productId, resolve, reject) {
		_mm.request({
			url 	: _mm.getServerUrl('/product/detail.do'),
			data	: {
				productId : productId
			},
			success : resolve,
			error 	: reject
		});
	}

};

module.exports = _product;