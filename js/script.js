/*
カレンダーの作成
*/
window.addEventListener("DOMContentLoaded", function () {   // DOMContentLoadedイベントはページの読み込みが終わった際に全体の処理を開始するようにするイベント
    // 本日の日付を取得
    var date = new Date();    // Dateオブジェクトのインスタンスを生成
    var year = date.getFullYear();    // 現在の西暦を取得
    var month = date.getMonth() + 1;    // 現在の月を取得
    var today = date.getDate();    // 現在の日にちを取得

    // 当月1日の日付を取得
    var firstDate = new Date(year, month - 1, 1);    // Dateオブジェクトで`new Date(year,month,day)`で日付を指定する場合は、(month + 1)として計算されるため、`firstDate`では`month - 1`にしている。

    // 翌月の0日を指定して当月の月末日を取得
    var lastDate = new Date(year, month, 0);    //日にちを0にすると前の月の最後の日付になる

    // 本日のタスクの日付の設定
    var todayStr = year + "年" + month + "月" + today + "日";
    presetTask(todayStr);    // presetDiary関数の呼び出し

    // カレンダーのキャプションを表示
    var table_title = year + "年 " + month + "月";
    var captionHtml = "<caption>" + table_title + "</caption>";

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

    // カレンダーの日付セル部分を作成
    var htmlStr = "<tr>";
    // 当月１日の曜日
    var startWeekDay = firstDate.getDay();    // 1日はその月の何曜日なのかを取得してる。4月なら1日は月曜日だから1(配列の番号)になる。

    // 1日までを空白で埋める
    for (var i = 0; i < startWeekDay; i++) {
        htmlStr += "<td>&nbsp;</td>";
    }


    // 1日から月末日までループ
    for (var i = 1; i <= lastDate.getDate(); i++) {     //`lastDate.getDate()`は月の終わりの「日にち」を取得している。曜日ではないことに注意。
        // 当月i日の日付オブジェクトを生成
        var date = new Date(year, month - 1, i);    //インスタンスの生成
        // i日の曜日を取得
        var weekDay = date.getDay();    //各日付の曜日を配列で取得してる（1,2,3,4,5,6,0,1,2,3...）のように
        // タスクを保存する際の日付部分のキー
        var dateStr = year + "年" + month + "月" + i + "日";    //~年~月~日の形式で日付を1日〜30まで取得

        // 日を取得
        var cellStr = date.getDate();    // １〜３０日までの日にちを取得
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
        htmlStr += "<a onclick='presetTask(\"" + dateStr + "\");'>" + cellStr + "</a></td>";    //`\"" "\"`これ何？

        // 土曜日の場合は行の終わりなのでtr終了タグ
        if (weekDay == 6) htmlStr += "</tr>\n";     //`\n`は改行の意味

    }

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
    document.getElementById("calendar__contents").innerHTML = "<table>" + captionHtml + weekdaysStr + htmlStr + "</table>";     //captionHTMLは見出し部分、weekdaysStrが曜日の列、htmlStrは各日にち
});


/*
カレンダーの日付とタスクの入力欄のリンク
*/
// 指定した日付のタスクを表示
function presetTask(dateStr) {     //日付をクリックした際の処理
    // ボタンのdate属性にキーの日付を指定する
    var saveBtn = document.getElementById("task__save");
    saveBtn.setAttribute("data-date", dateStr);

    // タスクの日付を表示
    var task_date = document.getElementById("task__date");
    task_date.innerHTML = dateStr;

    // localStorageからタスクの内容と反省を取得
    var reflect = localStorage[dateStr + "_reflect"];    //`[dateStr + "_reflect"]`がキーに当たる部分、`_`このアンダースコアは別になんでもいい。これに何かプログラム的な意味はない。
    var body = localStorage[dateStr + "_body"];      //これはすでに保存されているlocalStorageのキー（値？）を変数に代入してるだけで、保存してるわけじゃない。 var 変数名 = localStorage~だから、逆に`変数名` = localStorage~の場合は保存になる。（保存と参照の区別がついてなかった）

    // タスクの入力欄の値を取得
    var task_reflect = document.getElementById('task__reflect');      //.valueつけたら値を取得できなくなった。なぜ？
    var task_body = document.getElementById('task__body');

    // タスクのデータがあれば表示
    if (reflect) {    //このif文の書き方がよくわからん。「もしタイトルの値が定義されていれば」と言う意味のif文か？
        task_reflect.value = reflect;    //正確にはlocalStorageの値に、入力欄に記載された値を代入してる感じ。保存してるわけではない？
    } else {
        task_reflect.value = "";
    }

    if (body) {
        task_body.value = body;    //正確にはlocalStorageの値に、入力欄に記載された値を代入してる感じ。これは保存してるんじゃなくて、入力欄にlocalStorageで保存されている値を表示してるんだこれは。
    } else {
        task_body.value = "";
    }
}

/*
書いたタスクを保存
*/
// タスクを保存
function onSave(obj) {      //保存ボタンを押した時の処理・この`obj`の引数の意味がよくわからん。ボタン要素のオブジェクトらしい。
    // ボタンのdata-date属性から日付の文字列を取得
    var dateStr = obj.getAttribute("data-date");    //dateStrがかなりの肝なきがする

    // タスクの入力欄を取得
    var task_reflect = document.getElementById('task__reflect').value;
    var task_body = document.getElementById('task__body').value;

    // タスクを保存
    localStorage[dateStr + "_reflect"] = task_reflect;    // 日付_reflectでキー名を変数に代入してる。（保存と参照の区別がついてなかった）
    localStorage[dateStr + "_body"] = task_body;      // 同上
    // 完了メッセージを表示
    window.alert("タスクを投稿しました");
    // ページをリロード
    location.reload();
}
