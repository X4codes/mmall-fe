/*
* @Author: HUANGXI
* @Date:   2017-07-29 19:27:08
* @Last Modified by:   HUANGXI
* @Last Modified time: 2017-08-11 15:54:54
*/

'use strict';
require('./index.css');
var _mm = require('util/mm.js');


// 通用页面头部
var header = {
	// 初始化
	init : function () {
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function() {
		var keyword = _mm.getUrlParam('keyword');
		// 若有keyword，则回填输入框
		if (keyword) {
			$('#search-input').val(keyword);
		};
	},
	bindEvent : function () {
		var _this = this;
		// 点击搜索按钮，提交搜索
		$('#search-btn').click(function() {
			_this.searchSubmit();
		});
		// 输入回车后，提交搜索
		$('#search-input').keyup(function(e) {
			if(e.keyCode === 13){
				_this.searchSubmit();
			}
		});
	},
	// 搜索的提交
	searchSubmit : function() {
		var keyword = $.trim($('#search-input').val());
		// 若有keyword，正常跳转到list页
		if (keyword) {
			window.location.href = './list.html?keyword=' + keyword;
		}
		// 若无keyword，直接返回首页
		else{
			_mm.goHome();
		}
	}
};

header.init();