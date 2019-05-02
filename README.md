# Task Management Appli

## 改善点
* `// 日記データがあれば 日付の下にアンバーバーを表示`この部分クラスの付与をして、少し変えよう。
* 何かもう１つ機能を追加する
* 削除機能作ろう（本当に削除しますか？ダイアログも作ろう。）
* イベントハンドラーを違う書き方で書いてみるとか
* このプログラムの解説を自分の言葉で説明できるようにしよう。（躓いたところも記載しよう。）

## わかってないところ
* 曜日の配列と日にちの配列をごっちゃに考えてるからわけわからなくなってる。（dateが日にち、dayが曜日）
* 全体の設計というか、どうゆう手順で作ればいいか（ブログで言うところの先に見出しを考える的な）を考えていなくて大枠を捉えれていないから、迷走してる。
* localへのデータ保存と取り出しの部分の仕組みがまだよく理解できてない。
* もう一回ゼロからこれ自分で作ってみよう。＞その必要はない。少しずつ書き換える方が最小の労力で最大の結果を得られる。
* clear `\n`は改行
* 関数の引数の仕組みがよく分かってないな。ついでにイベントハンドラの呼び出しの仕組みもよく分かってない、戻って勉強し直そう。


## 日記アプリの機能の整理
1. 日記の保存：localStorageを使う
2. 保存している日記を日別に呼び出す：イベントを使う
3. 当月の日付をテーブルで表示：Dateオブジェクトを使う
4. 日記の削除：removeItemを使う＞無理だった


## データの保存について
今回はデータを永続的に保存できる`localStorage`を使う。
`localStorage`は、`windowオブジェクト`の`localStorageプロパティ`でアクセスできる。
なお、JSの記述では`window.`を省略できるので、`localStorage`と記述するだけでストレージを利用できる。

```
//WebStorageへの保存

var storage = localStorage;
storage.setItem(キー,値);

//次の書き方でも同じ意味
storage.キー = 値;
storage[キー] = 値;
localStorage[キー] = 変数名;

//保存したデータの参照
var 変数名 = storage.getItem(キー);

//次の書き方でも同じ意味
var 変数名 = storage.キー;
var 変数名 = storage[キー];

//保存したデータの削除
storage.removeItem(キー);
```
## 学び
* こまめに定義した変数をconsole.logで出力して、なにを定義してるのかしっかり確認する。

* Dateオブジェクトで`new Date(year,month,day)`で日付を指定する場合は、(month + 1)として計算されるため、`firstDate`では`month - 1`にしている。

* `presetDiary`はイベントハンドラの関数のことだ。

* 取得（参照）と保存の区別がついていない。

* もういっそ日記アプリだと脳がないから、タスク管理アプリにしようかな





## タスク管理アプリ
* 「今日のタスク」と「タスクの達成状況」を記載
* 前後の月をスライドショーでいじれるようにする。（無理かも）
* クラス名、JSの書き換え

## 改善点
* clear ページネーションの位置をもう少し下げる
* clear prevボタンをスマホでもう少し押しやすくする
* clear スマホ時に入力するときにフォーカスされるの防ぐ（マウントおじさんが前になんか言ってた奴）
* clear スマホ時の文字小さすぎかも
* clear スマホ時の余白大きすぎかも
* clear デプロイ時にhoverが効かなくなってる(safari　おそらくマルチブラウザの対応ができてない。あとでIEとFFでもチェック)＞多分`cube`をつかったから。凝ったアニメーション使うとブラウザによって表示が崩れやすいから出来るだけ避けよう
* clear スマホ時にタイトルを中央寄せ
* clear 文字サイズをあげる
* 諸々のコメントを消す
* ログは別で残しつつ、このREADMEには作り方や機能の説明をする
* 各メソッドなどを別の書き方で書き換えてみる

## このアプリのコードの解説

### カレンダーの作成
`script.js`4行目あたりの`window.addEventListener("DOMContentLoaded", function () { };`はHTMLの読み込みが終わった段階で処理を開始するための記述。`loadイベント`との違いは、`DOMContentLoadedイベント`ではスタイルシートや画像などの外部ファイルの読み込みを待たず、HTMLのDOMの解析が終わった地点で発生するイベントであるのに対し、`loadイベント`ではスタイルシートや画像の読み込みといった全ての外部ファイルの読み込みの完了後に発生するイベントである。


```
// Dateオブジェクトのインスタンスを生成
var date = new Date();
// 現在の西暦を取得
var year = date.getFullYear();
// 現在の月を取得
var month = date.getMonth() + 1;
// 現在の日にちを取得
var today = date.getDate();
```
上記のコードでは、Dateオブジェクトを使用し、本日の日付を取得している。
なお、monthに関しては0~11の数値で月を表しているので+1している。


```
// 当月1日の日付を取得
    var firstDate = new Date(year, month - 1, 1);
```
上記のコードでは、当月の日付を取得している。
なお、Dateオブジェクトで`new Date(year,month,day)`で日付を指定する場合は、(month + 1)として計算されるため、`firstDate`では`month - 1`にしている。


```
// 翌月の0日を指定して当月の月末日を取得
var lastDate = new Date(year, month, 0);
```
上記のコードでは、翌月の0日を指定することで、当月の月末日を取得している。(日にちを0にすると前の月の最後の日付になる)


```
// 本日のタスクの日付の設定
var todayStr = year + "年" + month + "月" + today + "日";
// presetDiary関数の呼び出し
presetTask(todayStr);
```
上記のコードでは、変数で本日の日付を取得し、カレンダーの日付とタスクの入力欄を紐付けるpresetTask関数を呼び出している。


#### 曜日の行を作成
```
// 曜日の行を作成
var weekdays = ["日", "月", "火", "水", "木", "金", "土"];
var weekdaysStr = "<tr>";

for (var i = 0; i < 7; i++) {
    if (i == 0) {
        weekdaysStr += "<td class='sun'>" + weekdays[i] + "</td>";
    } else if (i == 6) {
        weekdaysStr += "<td class='sat'>" + weekdays[i] + "</td>";
    } else {
        weekdaysStr += "<td>" + weekdays[i] + "</td>";
    }
}
weekdaysStr += "</tr>";
}
```
まずは、`weekdays`変数で配列を用い、曜日の名前を定義する。それから、`weekdayStr`に`<tr>`を定義する。
それからfor文の繰り返し処理とif文にによって`weekdays`の配列に適切な曜日を代入し、`weekdayStr`に足していくことで曜日の行を作成する。


#### 日付部分の1日までの空白を埋める
```
// カレンダーの日付セル部分を作成
var htmlStr = "<tr>";
// 当月１日の曜日を取得（Dayは曜日のこと）
var startWeekDay = firstDate.getDay();

// 1日までを空白で埋める
for (var i = 0; i < startWeekDay; i++) {
    htmlStr += "<td>&nbsp;</td>";
}
```
先ほどと同じ要領でまずは`htmlStr`に`<tr>`を定義する。
それから、当月の1日は何曜日なのかを指定した`startWeekDay`変数を作成する。この変数では、先ほど作成した`firstDate`のインスタンス（当月の1日）と`getDate()`メソッド（曜日を0~6の配列で返すメソッド）を用いて1日はその月の何曜日なのかを取得している。例えば、2019年4月1日へ月曜日なので、配列の値では1となる。

あとは、for文を使って条件式を`i < startWeekDay`とし、1日の曜日まで空白で埋める処理をしている。


#### 1日から月末日までループ
```
// 1日から月末日までループ
for (var i = 1; i <= lastDate.getDate(); i++) { //`lastDate.getDate()`は月の終わりの「日にち」を取得している。曜日ではないことに注意。
// 当月i日の日付オブジェクトを生成
var date = new Date(year, month - 1, i); //インスタンスの生成
// i日の曜日を取得
var weekDay = date.getDay(); //各日付の曜日を配列で取得してる（1,2,3,4,5,6,0,1,2,3...）のように
// タスクを保存する際の日付部分のキー
var dateStr = year + "年" + month + "月" + i + "日"; //~年~月~日の形式で日付を1日〜30まで取得

// 日を取得
var cellStr = date.getDate(); // １〜３０日までの日にちを取得
// タスクデータがあれば 日付の表示を変更する
if (localStorage[dateStr + "_body"]) cellStr = "<span class='active'>" + cellStr + "</span>";

// 日曜日の場合は行の開始なのでtr開始タグ
if (weekDay == 0) htmlStr += "<tr>";

if (weekDay == 0) {
    htmlStr += "<td class='sun'>";
} else if (weekDay == 6) {
    htmlStr += "<td class='sat'>";
} else {
    htmlStr += "<td>";
}
// 日付をクリックした際にタスクを表示（空欄はaタグにしないためにこの処理をしてる）
htmlStr += "<a onclick='presetTask(\"" + dateStr + "\");'>" + cellStr + "</a></td>"; //`\"" "\"`これ何？

// 土曜日の場合は行の終わりなのでtr終了タグ
if (weekDay == 6) htmlStr += "</tr>\n"; //`\n`は改行の意味

}
```
先ほどで1日が始まるまで空白を埋めたので、次は月末日までのループを作る。
まずは、for文で条件式を`i <= lastDate.getDate()`とすることで月末日まで日付を繰り返す。なお、`lastDate.getDate`は翌月の0日を指定して月末日を取得する`lastDate`のインスタンスと、日にちを1~31で返す`getDate()`メソッドを使って当月の月末日を取得している。

また、当月i日の日付オブジェクト（インスタンス）を生成し、`getDay()メソッド`を用いてi日の曜日を取得し、タスクを保存する際の日付部分のキーとして`dataStr`変数を定義する。`dataStr`には~年~月~日の形式で日付を1日〜maxで31日まで取得している。

加えて、`getDate()`メソッドを用いて日にちを取得。その後にタスクデータがあればspanタグでくくりクラス名を付与する処理をif文で作る。

次は、曜日の行を作成したのと同じ要領でfor文で繰り返し処理を行い、土曜日になったらtrの閉じタグで行を終わらせる。

また、カレンダーの日付をクリックした際にタスクを表示するために（カレンダーとタスクの紐付け）、各tdタグ内にイベントハンドラのpresetTask関数を定義したaタグを代入する。


#### 月末日が土曜日でない場合は 空白のセルでテーブルを埋める
```
// 月末日の曜日を取得
var lastDayWeek = lastDate.getDay();

// 月末日が土曜日でない場合は 空白のセルでテーブルを埋める
if (lastDayWeek != 6) {
    // 月末日の翌日の曜日から土曜日までをfor文で繰り返す
    for (var i = lastDayWeek + 1; i <= 6; i++) {
        htmlStr += "<td>&nbsp;</td>";
    }
    htmlStr += "</tr>";
}
document.getElementById("calendar__contents").innerHTML = "<table>" + captionHtml + weekdaysStr + htmlStr + "</table>"; //captionHTMLは見出し部分、weekdaysStrが曜日の列、htmlStrは各日にち
```
まず、`lastDate.getDay();`を用いて月末日の曜日を取得する。
そして、月末日が土曜日でない場合は、if文とfor文で月末日の翌日の曜日から土曜日までをfor文で空白を繰り返すことで、残りのセルを埋めていく。


#### 前の月のカレンダーの作成
基本的な流れは当月のカレンダーと同じ。インスタンスの生成時のmonthの値を全て-1することで作成できる。


### タスクの保存
```
var saveBtn = document.getElementById("task__save");
// 保存ボタンを押した時の処理を定義
saveBtn.onclick = function () {
    // ボタンのdata-date属性から日付を取得
    var dateStr = saveBtn.getAttribute("data-date");

    // タスクの入力欄を取得
    var task_reflect = document.getElementById('task__reflect').value;
    var task_body = document.getElementById('task__body').value;

    // タスクを保存
    localStorage[dateStr + "_reflect"] = task_reflect;
    localStorage[dateStr + "_body"] = task_body;
    // 完了メッセージを表示
    window.alert("タスクを投稿しました");
    // ページをリロード
    location.reload();
};
```
まず、保存ボタンの要素を`getElementById`を用いて取得する。
次に、イベントハンドラを用いてタスク保存の処理を記述する。

イベントハンドラの処理の中では、まずpresetTask関数内で`setAttribute`した`dataStr`の値を、`getAttribute`を使って引き出す。

その後、タスクの入力欄を取得し、`localStorage`を利用してタスクの保存の処理を記述する。あとは完了メッセージを出し、ページのリロードを行う。


### カレンダーの日付とタスクの入力欄のリンク
```
function presetTask(dateStr) { //日付をクリックした際の処理、引数に日付の文字列を代入
    // ボタンのdate属性にキーの日付を指定する（なんのためにやってるのこれ？保存の際にイベントを通して日付を渡せるようにする準備らしいけど...）＞dataStrで日付の文字列を保存するときにも使用するための準備なんだ！
    var saveBtn = document.getElementById("task__save");
    saveBtn.setAttribute("data-date", dateStr);

    // タスクの日付を表示
    var task_date = document.getElementById("task__date");
    task_date.innerHTML = dateStr;

    // localStorageからタスクの内容と反省を取得
    var reflect = localStorage[dateStr + "_reflect"]; //`[dateStr + "_reflect"]`がキーに当たる部分、`_`このアンダースコアは別になんでもいい。これに何かプログラム的な意味はない。
    var body = localStorage[dateStr + "_body"]; //これはすでに保存されているlocalStorageのキー（値？）を変数に代入してるだけで、保存してるわけじゃない。 var 変数名 = localStorage~だから、逆に`変数名` = localStorage~の場合は保存になる。（保存と参照の区別がついてなかった）

    // タスクの入力欄の値を取得
    var task_reflect = document.getElementById('task__reflect'); //.valueつけたら値を取得できなくなった。なぜ？
    var task_body = document.getElementById('task__body');

    // タスクのデータがあれば表示
    if (reflect) {
    } else {
        task_reflect.value = "";
    }

    if (body) {
        task_body.value = body;
    } else {
        task_body.value = "";
    }
}
```
ここでは指定した日付のタスクを表示する処理を記述する。
まず日付をクリックした際の関数を記述している。なお関数の引数で`dataStr`を指定することで、この関数内でもカレンダーの作成の際に定義した`dataStr`を利用できる。

次に、関数内で日付の文字列を保存する際に`dataStr`を利用するためにボタンのdate属性にキーの日付（`dataStr`）を指定する。

その後、`dataStr`を用いてタスクの日付をhead部分に表示する。

次に、localStorageからタスクの内容と反省を取得する記述をする。なお、localStorageへの保存と参照は書き方が似てるので注意が必要。

その後、`getElementById`を用いてタスクの入力欄の値を取得し、if文を用いてタスクのデータがあれば表示し、なければ表示しない処理をする。




## 開発メモ

### localStorageの保存と参照の区別がついてなかった。
localStorageを使った保存と参照の違い
```
//保存
localStorage.キー = 値;
    //もしくは
localStorage[キー] = 値;    //今回のコードではこっちを使っている
```

```
//参照
var 変数名 = localStorage.キー;
    //もしくは
var 変数名 = localStorage[キー];    //今回のコードではこっちを使ってる
```
書き方が似てるからごっちゃになりやすいけど、意味は大きく異なるので注意。


### 関数間をまたぐ引数と変数のやりとりの仕組みがよくわかってなかった。
特に`dateStr`の値を継承？してるのが初めはよくわからなかった。

今回の開発では、カレンダーの作成で`dataStr`変数を定義し、カレンダーの日付とタスクの入力欄のリンクの部分では定義する関数の引数に`dataStr`を代入することで、`dataStr`を使えるようにしている。

また、カレンダーの日付とタスクの入力欄のリンクの部分では、保存ボタンにdate属性を作成し、その属性の値に`dataStr`を代入して、タスクの保存の方の関数ではその属性の`dataStr`を`getAttribute`を使い取り出すことで使えるようにしている。

### エスケープ文字について

`"<a class="xxx"></a>"`みたいなダブルコーテーションの中にダブルコーテーションが入ると正しく処理されなくなる。
そこでエスケープ文字`\"`を使うと正しく処理されるようになる。
例`"<a class=\"xxx\"></a>"`

