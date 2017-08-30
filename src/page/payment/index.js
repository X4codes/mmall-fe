/*
* @Author: HUANGXI
* @Date:   2017-08-30 15:48:46
* @Last Modified by:   HUANGXI
* @Last Modified time: 2017-08-30 16:20:17
*/
'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm 	 	  = require('util/mm.js');
var _payment 	  = require('service/payment-service.js');
var templateIndex = require('./index.string');

//  页面逻辑
var page = {
	data : {
		orderNumber : _mm.getUrlParam('orderNumber')
	},
	init : function () {
		this.onLoad();
	},
	onLoad : function () {
		// 加载支付数据
		this.loadPaymentInfo();
	},
	
	// 加载支付数据
	loadPaymentInfo : function () {
		var _this           = this,
			paymentHtml = '',
			$pageWrap        = $('.page-wrap');
		$pageWrap.html('<div class="loading"></div>');
		_payment.getPaymentInfo(this.data.orderNumber, function (res) {
			// 渲染HTML
			paymentHtml = _mm.renderHtml(templateIndex, res);
			$pageWrap.html(paymentHtml);
			_this.listenOrderStatus();
		}, function (errMsg) {
			$pageWrap.html('<p class="err-tip">' + errMsg + '</p>');
		});
	},
	// 监听订单状态
	listenOrderStatus : function () {
		var _this = this;
		this.paymentTimer = window.setInterval(function () {
			_payment.getPaymentStatus(_this.data.orderNumber, function (res) {
				if (res==true) {
					window.location.href 
					= './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
				}
			});
		}, 5e3);
	}
};

$(function () {
	page.init();
});