/*
カレンダーの日付と日記の入力欄のリンク
*/
// 指定した日付の日記を表示
function presetDiary(dateStr) {
    // ボタンのdate属性にキーの日付部分を指定する
    var button = document.getElementById("button");
    button.setAttribute("data-date", dateStr);

    // 日記の日付を表示
    var diary_date = document.getElementById("diary_date");
    diary_date.innerHTML = dateStr;

    // localStorageから日記のタイトルと本文を取得
    var title = localStorage[dateStr + "_title"];
    var body = localStorage[dateStr + "_body"];

    // 日記の入力欄を取得
    var diary_title = document.getElementById('diary_title');
    var diary_body = document.getElementById('diary_body');
    // 日記のデータがあれば表示
    if (title) {
        diary_title.value = title;
    } else {
        diary_title.value = "";
    }
    if (body) {
        diary_body.value = body;
    } else {
        diary_body.value = "";
    }
}

// 日記を保存
function onSave(obj) {
    // ボタンのdata-date属性から日付文字列を取得
    var dateStr = obj.getAttribute("data-date");

    // 日記の入力欄を取得
    var diary_title = document.getElementById('diary_title').value;
    var diary_body = document.getElementById('diary_body').value;

    // 日記を保存
    localStorage[dateStr + "_title"] = diary_title;
    localStorage[dateStr + "_body"] = diary_body;
    // 完了メッセージを表示
    window.alert("日記を投稿しました");
    // ページをリロード
    location.reload();
}

window.addEventListener("DOMContentLoaded", function () {
    // 本日の日付を取得
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var today = date.getDate();

    // 当月1日の日付を取得
    var firstDate = new Date(year, month - 1, 1);
    // 翌月の0日を指定して当月の月末日を取得
    var lastDate = new Date(year, month, 0);

    // 本日の日記のプリセット
    var todayStr = year + "." + month + "." + today;
    presetDiary(todayStr);

    // 当月の表示
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
    var startWeekDay = firstDate.getDay();
    // 1日までを空白で埋める
    for (var i = 0; i < startWeekDay; i++) {
        htmlStr += "<td>&nbsp;</td>";
    }

    // 1日から月末日までループ
    for (var i = 1; i <= lastDate.getDate(); i++) {
        // 当月i日の日付オブジェクトを生成
        var date = new Date(year, month - 1, i);
        // i日の曜日を取得
        var weekDay = date.getDay();
        // 日記を保存する際の日付部分のキー
        var dateStr = year + "." + month + "." + i;

        // 日を取得
        var cellStr = date.getDate();
        // 日記データがあれば 日付の下にアンバーバーを表示
        if (localStorage[dateStr + "_title"]) cellStr = "<u>" + cellStr + "</u>";
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
    }

    // 月末日の曜日
    var lastDayWeek = lastDate.getDay();
    // 月末日が土曜日でない場合は 空白のセルでテーブルを埋める
    if (lastDayWeek != 6) {
        // 月末日の翌日の曜日から土曜日までをfor文で回す
        for (var i = lastDayWeek + 1; i <= 6; i++) {
            htmlStr += "<td>&nbsp;</td>";
        }
        htmlStr += "</tr>";
    }
    document.getElementById("calendar").innerHTML = "<table>" + captionHtml + weekdaysStr + htmlStr + "</table>";
});