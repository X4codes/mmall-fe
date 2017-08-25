/*
* @Author: HUANGXI
* @Date:   2017-07-12 19:08:45
* @Last Modified by:   HUANGXI
* @Last Modified time: 2017-08-21 14:24:49
*/

'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
require('util/slider/index.js');

var navSide 		= require('page/common/nav-side/index.js');
var templateBanner  = require('./banner.string');
var _mm 			= require('util/mm.js');

$(function () {
	// 渲染banner的html
	var bannerHtml = _mm.renderHtml(templateBanner);
	$('.banner-con').html(bannerHtml);
	// 初始化banner
	var $slider = $('.banner').unslider({dots: true});
	// 导航箭头绑定
	$('.banner-con .banner-arrow').click(function () {
		var forward = $(this).hasClass('prev') ? 'prev':'next';
		$slider.data('unslider')[forward]();
	});
});