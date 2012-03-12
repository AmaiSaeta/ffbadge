/**
 * ffbadge.js
 *  FriendFeedアカウントのアイコン、ニックネーム、登録サービスのタイトルを
 *  一覧表示するblogパーツ(モドキ)
 *
 * 利用の際には、ffBadge_ACCOUNT_NAME の値をFriendFeed登録アカウント名に
 * 書き換える事
 *
 * Copyright (c) 2009,2011 AmaiSaeta
 * License: MIT License {{{
 * 	Permission is hereby granted, free of charge, to any person obtaining a copy
 * 	of this software and associated documentation files (the "Software"), to deal
 * 	in the Software without restriction, including without limitation the rights
 * 	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * 	copies of the Software, and to permit persons to whom the Software is
 * 	furnished to do so, subject to the following conditions:
 *
 * 	The above copyright notice and this permission notice shall be included in
 * 	all copies or substantial portions of the Software.
 *
 * 	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * 	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * 	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * 	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * 	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * 	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * 	THE SOFTWARE.
 * }}}
 */

// FriendFeedアカウント名; 利用者に合わせて変更の事
var ffBadge_ACCOUNT_NAME = 'amaisaeta';
// ffbadge保存先URL; アップロード先のURIに合わせて変更の事
var ffBadge_HOME_URI = './';

// ffbadge version number (omitted date number)
var ffBadge_version = 1.1;
// ffbadge copyright years string.
var ffBadge_copyright_years = "2009,2011";

// FriendFeed URI
var ffBadge_FF_URI = 'http://friendfeed.com';
// FriendFeed APIパス; Get services and subscriptions
var ffBadge_PROFILE_API_URI =
	ffBadge_FF_URI + '/api/user/' + ffBadge_ACCOUNT_NAME + '/profile';
// FriendFeed APIパス; Get a user profile picture
var ffBadge_PICTURE_API_URI =
	ffBadge_FF_URI + '/' + ffBadge_ACCOUNT_NAME + '/picture?size=medium';

// 登録サービスへのA要素のHTMLElement群
var ffBadge_serviceAElems = {};

// ローディング画像
var ffBadge_loadElem = (function() {
	var cont = document.createElement('span');

	var loadImg = cont.appendChild(document.createElement('img'));
	loadImg.src = ffBadge_HOME_URI + 'ajax-loader.gif';
	loadImg.alt = '[loading...]';

	return cont;
})();

// バッジヘッダ部分
var ffBadge_headerElem;
// バッジボディ部分
var ffBadge_bodyElem;
// バッジフッタ部分
var ffBadge_footerElem;

ffBadge_create();

// FriendFeedバッジ作成
function ffBadge_create()
{
	init();

	// ローディング表示
	ffBadge_bodyElem.appendChild(ffBadge_loadElem);

	// FriendFeed API呼び出し; User Profile Information取得
	var apiCallElem = document.createElement('script');
	apiCallElem.type = 'text/javascript';
	apiCallElem.charset = 'utf-8';
	apiCallElem.src =
		ffBadge_PROFILE_API_URI+'?callback=ffBadge_callback_getServices';

	document.body.appendChild(apiCallElem);

	// ffbadge作成前初期化
	function init() {
		// ffbadge用スタイルシート読み込み
		var cssLinkElem = document.createElement('link');
		cssLinkElem.rel = "stylesheet";
		cssLinkElem.type = "text/css";
		cssLinkElem.href = ffBadge_HOME_URI + "ffbadge.css";
		document.getElementsByTagName('head')[0].appendChild(cssLinkElem);

		// ffbadge設置先div; script要素直後に設置したいのでwriteで
		document.write('<div id="ffbadge"></div>');

		var elem = document.getElementById('ffbadge');

		// header,body,footer部を生成
		ffBadge_headerElem = document.createElement('div');
		ffBadge_headerElem.id = 'ffbadge_header';
		ffBadge_bodyElem = document.createElement('div');
		ffBadge_bodyElem.id = 'ffbadge_body';
		ffBadge_footerElem = document.createElement('div');
		ffBadge_footerElem.id = 'ffbadge_footer';
		elem.appendChild(ffBadge_headerElem);
		elem.appendChild(ffBadge_bodyElem);
		elem.appendChild(ffBadge_footerElem);
	}
}

// FriendFeedコールバック関数; Get services and subscriptions
function ffBadge_callback_getServices(datas)
{
	// ローディング表示を消す
	ffBadge_bodyElem.innerHTML = '';

	createHeader(datas);
	createBody(datas);
	createFooter(datas);

	// ヘッダ出力
	function createHeader(datas) {
		// FriendFeed ユーザ情報の出力
		var userInfo = document.createElement('a');
		userInfo.id = 'ffbadge_userinfo';
		userInfo.href = datas['profileUrl'];

		// FriendFeedユーザ画像表示
		var iconElem = document.createElement('img');
		iconElem.id = 'ffbadge_userinfo_icon';
		iconElem.src = ffBadge_PICTURE_API_URI;
		userInfo.appendChild(iconElem);

		// FriendFeedユーザ名表示
		var userInfoName = document.createElement('span');
		userInfoName.id = 'ffbadge_userinfo_nickname';
		userInfoName.appendChild(document.createTextNode(datas['name']));
		userInfo.appendChild(userInfoName);
		ffBadge_headerElem.appendChild(userInfo);

		// ffbadgeロゴ
		var logo = document.createElement('div');
		logo.id = 'ffbadge_logo';
		logo.appendChild(document.createTextNode('ffbadge ' + ffBadge_version));
		ffBadge_headerElem.appendChild(logo);
	}

	// ボディ部出力
	function createBody(datas) {
		// 利用サービス一覧表示
		var services = datas['services'];

		var servicesListElem = document.createElement('ul');
		servicesListElem.id = "ffbadge_services";
		for(var i = 0; i < services.length; ++i) {
			var serviceLiElem = document.createElement('li');
			var serviceUrl = decodeURI(services[i].profileUrl);

			// [MEMO]上手くURIデコードされない対策 for flickr
			serviceUrl = serviceUrl.replace("%40","@");

			var serviceAElem = document.createElement('a');
			serviceAElem.href = serviceUrl;

			var serviceImgElem = document.createElement('img');
			serviceImgElem.src = services[i].iconUrl;
			serviceImgElem.alt = "[" + services[i].name + "]";

			serviceAElem.appendChild(serviceImgElem);

			// ローディング表示挿入
			var loadElem = ffBadge_loadElem.cloneNode(true);
			loadElem.appendChild(document.createTextNode(services[i].name));
			serviceAElem.appendChild(loadElem);
			ffBadge_serviceAElems[serviceUrl] = {};
			ffBadge_serviceAElems[serviceUrl]['loadElem'] = loadElem;
			// JSONP呼び出しの必要があり、ここではページタイトルを
			// 入手できない為HTMLElementのみ保存しておく。
			ffBadge_serviceAElems[serviceUrl]['aElem'] = serviceAElem;
			callGetPageTitleApi(serviceUrl);

			serviceLiElem.appendChild(serviceAElem);
			servicesListElem.appendChild(serviceLiElem);
		}
		ffBadge_bodyElem.appendChild(servicesListElem);
	}

	// フッタ出力
	function createFooter(datas) {
		var parentElem = document.createElement('div');
		var textElem = document.createTextNode('');
		var aElem = document.createElement('a');

		parentElem.appendChild(textElem);
		parentElem.appendChild(aElem);

		// copyright
		parentElem.id = 'ffbadge_copyright';
		textElem.nodeValue = '(C) ' + ffBadge_copyright_years + ' ';
		aElem.href = 'http://amaisaeta.seesaa.net/';
		aElem.innerHTML = 'AmaiSaeta';
		ffBadge_footerElem.appendChild(parentElem.cloneNode(true));

		// powered by
		parentElem.id = 'ffbadge_poweredby';
		textElem.nodeValue = 'powered by ';
		aElem.href = ffBadge_FF_URI;
		aElem.innerHTML = 'FriendFeed';
		ffBadge_footerElem.appendChild(parentElem.cloneNode(true));
	}

	// 指定されたURLのページのタイトルを取得
	function callGetPageTitleApi(url) {
		// HTMLタイトル取得JSONPパス
		var PAGE_TITLE_GET_API_URI =
			'http://www.usamimi.info/~ryouchi/title/get_title_jsonp.php'
			+ '?url=' + escape(url)
			+ '&callback=ffBadge_callback_getServiceTitle';

		// タイトル取得JSONP呼び出し
		var scriptElem = document.createElement('script');
		scriptElem.src = PAGE_TITLE_GET_API_URI;
		scriptElem.type = 'text/javascript';
		document.body.appendChild(scriptElem);
	}
}

// サービスタイトルの取得/挿入
function ffBadge_callback_getServiceTitle(datas) {
	var url = decodeURI(datas.url);
	// ローディング表示削除
	ffBadge_serviceAElems[url]['aElem'].removeChild(
		ffBadge_serviceAElems[url]['loadElem']);
	// タイトル挿入
	var title = (datas.title && datas.title.length) ? datas.title : url.match('^http://([^/]+)')[1];

	ffBadge_serviceAElems[url]['aElem'].innerHTML
		+= ffBadge_convert2CharactorReference(title);
}

// 文字列内の特定文字を文字参照に変換
function ffBadge_convert2CharactorReference(str)
{
	return str.toString()
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

// vim: ts=4:sw=4:ai
