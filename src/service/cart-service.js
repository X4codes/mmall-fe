/*
* @Author: HUANGXI
* @Date:   2017-07-21 19:27:25
* @Last Modified by:   HUANGXI
* @Last Modified time: 2017-07-21 19:59:28
*/

'use strict';

var _mm = require('util/mm.js');

var _cart = {
	// 获取购物车数量
	getCartCount : function (resolve, reject) {
		_mm.request({
			url 	: _mm.gerServerUrl('/cart/get_cart_product_count.do'),
			success : resolve,
			error 	: reject
		});
	}
};

module.exports = _cart;