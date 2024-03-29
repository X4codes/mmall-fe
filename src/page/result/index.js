/*
* @Author: HUANGXI
* @Date:   2017-08-11 13:51:27
* @Last Modified by:   HUANGXI
* @Last Modified time: 2017-08-30 16:26:47
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
	var type       = _mm.getUrlParam('type') || 'default',
	    $element   = $('.' + type + '-success');
	if(type === 'payment'){
		var orderNumber  = _mm.getUrlParam('orderNumber'),
			$orderNumber = $element.find('.order-number');
		$orderNumber.attr('href',$orderNumber.attr('href') + orderNumber);
	}
	// 显示对应的提示元素
	$element.show();
	
})