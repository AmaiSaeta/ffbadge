【これって何?】
FriendFeed<http://friendfeed.com/>に登録しているサービスを一覧表示する。ついでに登録ニックネームとアイコンも。
FriendFeed公式で類似のモノが提供されているが、サービスのタイトルを表示出来る点が異なる。
JavaScript製なのでJSの設置が許可されていないblogサービスでは使用できない。あしからず。

【使い方】
下記リンクから書庫をダウンロード、適当な場所に展開する。
ffbadge.js内の、
	var ffBadge_ACCOUNT_NAME = 'amaisaeta';
……の、amaisaetaの部分を自分のFriendFeedのアカウントに、
	var ffBadge_HOME_URI = './';
……を、ffbadgejs他ファイルをアップロードする場所のパスに変更する。
編集したffbadge.jsと、top_bottom_bg1.gif、ffbadge.css、ajax-loader.gifをweb上の適当な場所にアップロード。勿論設置先のblogからアクセスできる場所に。
そして、設置したい場所のHTMLコードに以下のコードを追加。
	<script src="(アップロード先)/ffbadge.js" type="text/javascript" charset="utf-8"></script>
ね?簡単でしょ?

【開発の動機というかなんというか】
あっちこっちのwebサービス使ってて、しかもそれが外部に公開する形式のものだったりすると、それをリスト化して一覧表示しておきたい。例えばこのblogから他の利用サービスへのリンクを貼ったり。そんなのblogのサイドバーにでもリンク列挙しとけばいい話だけど、複数のwebサービスに列挙するならば、何処か一カ所でリストを管理しないと追加削除が面倒くさい。ちょうど最近FriendFeedのアカウント取得したし、じゃあここを使おうか、と。幸いWeb APIも有るし。
本当はSkypeとかメールアドレスとかも出せればいいんだけど、FriendFeedにはそういう項目は無いし。……え?iddy?あれはTwitter登録できないから論外^^

【ライセンス】
MITライセンス(X11ライセンス)で。
----
The MIT License

Copyright (c) 2009 AmaiSaeta

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
----
……まぁ、日本語訳についてはOSIの日本語訳を参照。あくまで『参考訳』なのでそのつもりで。

【更新履歴】
1.00.20090324
    初版公開

【TODO】
    * 各サービスのタイトルにマウスオーバー/選択した際に最新の更新内容を数件表示するようにしたい。
    * 今後、独自サーバ取得するような事になった場合は、JavaScript製からサーバサイドスクリプト(PerlとかRubyとか)製へ変更。

【謝辞】
FriendFeedの中の人達
    このblogパーツの基幹となるwebサービス、FriendFeedの開発者に感謝。ついで言うと、このblogパーツ相当の機能を持つブログパーツを作っていてくれたらわざわざ開発しないで済んだんだけどね;-)
りょーち氏
    登録サービスのタイトル取得に、りょーち氏作成のタイトル取得API for JSONP<http://ryouchi.seesaa.net/article/42059413.html>を利用している。これがなければ、わざわざタイトル取得の為だけに登録サービスのHTMLを拾って来なければならないところだった。
Ajaxload<http://www.ajaxload.info/>の中の人
    ローディングイメージに、このサービスで生成したGIFを利用させて貰った。
