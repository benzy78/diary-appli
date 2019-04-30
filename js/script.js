/*
カレンダーの作成
*/
window.addEventListener("DOMContentLoaded", function () {// DOMContentLoadedイベントはページの読み込みが終わった際に全体の処理を開始するようにするイベント
    // 本日の日付を取得
    var date = new Date();    // Dateオブジェクトのインスタンスを生成
    var year = date.getFullYear();    // 現在の西暦を取得
    var month = date.getMonth() + 1;    // 現在の月を取得
    var today = date.getDate();    // 現在の日にちを取得

    // console.log(date);
    // console.log(year);
    // console.log(month);
    // console.log(today);

    // 当月1日の日付を取得
    var firstDate = new Date(year, month - 1, 1);    // Dateオブジェクトで`new Date(year,month,day)`で日付を指定する場合は、(month + 1)として計算されるため、`firstDate`では`month - 1`にしている。

    // console.log(firstDate);

    // 翌月の0日を指定して当月の月末日を取得
    var lastDate = new Date(year, month, 0);    //日にちを0にすると前の月の最後の日付になる

    // console.log(lastDate);

    // 本日の日記の日付の設定
    var todayStr = year + "年" + month + "月" + today + "日";
    presetDiary(todayStr);    // presetDiary関数の呼び出し

    // console.log(todayStr);

    // カレンダーのキャプションを表示
    var table_title = year + "年 " + month + "月";
    var captionHtml = "<caption>" + table_title + "</caption>";

    // console.log(table_title);
    // console.log(captionHtml);

    // 曜日の行を作成
    var weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    var weekdaysStr = "<tr>";

    // console.log(weekdays);

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
    // console.log(weekdaysStr);

    // カレンダーの日付セル部分を作成
    var htmlStr = "<tr>";
    // 当月１日の曜日
    var startWeekDay = firstDate.getDay();    // 1日はその月の何曜日なのかを取得してる。4月なら1日は月曜日だから1(配列の番号)になる。

    // console.log(startWeekDay);

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
        // 日記を保存する際の日付部分のキー
        var dateStr = year + "年" + month + "月" + i + "日";    //~年~月~日の形式で日付を1日〜30まで取得

        // 日を取得
        var cellStr = date.getDate();    // １〜３０日までの日にちを取得
        // 日記データがあれば 日付の下にアンバーバーを表示
        if (localStorage[dateStr + "_title"]) cellStr = "<span class='active'>" + cellStr + "</span>";

        // 日曜日の場合は行の開始なのでtr開始タグ
        if (weekDay == 0) htmlStr += "<tr>";

        if (weekDay == 0) {
            htmlStr += "<td class='sun'>";
        } else if (weekDay == 6) {
            htmlStr += "<td class='sat'>";
        } else {
            htmlStr += "<td>";
        }
        // 日付をクリックした際に日記を表示
        htmlStr += "<a onclick='presetDiary(\"" + dateStr + "\");'>" + cellStr + "</a></td>";

        // 土曜日の場合は行の終わりなのでtr終了タグ
        if (weekDay == 6) htmlStr += "</tr>\n";

        // console.log(htmlStr);
    }

    // 月末日の曜日
    var lastDayWeek = lastDate.getDay();

    // console.log(lastDayWeek);

    // 月末日が土曜日でない場合は 空白のセルでテーブルを埋める
    if (lastDayWeek != 6) {
        // 月末日の翌日の曜日から土曜日までをfor文で回す
        for (var i = lastDayWeek + 1; i <= 6; i++) {
            htmlStr += "<td>&nbsp;</td>";
        }
        htmlStr += "</tr>";
    }
    document.getElementById("calendar__contents").innerHTML = "<table>" + captionHtml + weekdaysStr + htmlStr + "</table>";
});


/*
カレンダーの日付と日記の入力欄のリンク
*/
// 指定した日付の日記を表示
function presetDiary(dateStr) {
    // ボタンのdate属性にキーの日付部分を指定する
    var button = document.getElementById("diary__save");
    // console.log(button);
    // console.log(dateStr);
    button.setAttribute("data-date", dateStr);

    // 日記の日付を表示
    var diary_date = document.getElementById("diary__date");
    diary_date.innerHTML = dateStr;

    // localStorageから日記のタイトルと本文を取得
    var title = localStorage[dateStr + "_title"];    //`[dateStr + "_title"]`がキーに当たる部分、`_`このアンダースコアは別になんでもいい。これに何かプログラム的な意味はない。
    var body = localStorage[dateStr + "_body"];      //上に同乗
    // console.log(title);

    // 日記の入力欄を取得
    var diary_title = document.getElementById('diary__title');
    var diary_body = document.getElementById('diary__body');
    // console.log(diary_title.value);

    // 日記のデータがあれば表示
    if (title) {
        diary_title.value = title;    //正確にはlocalStorageの値に、入力欄に記載された値をセットしてる感じ？
    } else {
        diary_title.value = "";
    }

    if (body) {
        diary_body.value = body;    //正確にはlocalStorageの値に、入力欄に記載された値をセットしてる感じ？
    } else {
        diary_body.value = "";
    }
}


/*
書いた日記を保存
*/
// 日記を保存
function onSave(obj) {
    // ボタンのdata-date属性から日付の文字列を取得
    var dateStr = obj.getAttribute("data-date");
    // console.log(dateStr);

    // 日記の入力欄を取得
    var diary_title = document.getElementById('diary__title').value;
    var diary_body = document.getElementById('diary__body').value;
    // console.log(diary_title);

    // 日記を保存
    localStorage[dateStr + "_title"] = diary_title;    // 日付_titleでキー名を変数に代入してる。なぜ「_title」と言う書き方なのかはよくわからん
    localStorage[dateStr + "_body"] = diary_body;      // ここがわからん
    // 完了メッセージを表示
    window.alert("日記を投稿しました");
    // ページをリロード
    location.reload();
}
