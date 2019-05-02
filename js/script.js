/*
カレンダーの作成
*/
window.addEventListener("DOMContentLoaded", function () { // DOMContentLoadedイベントはページの読み込みが終わった際に全体の処理を開始するようにするイベント
    // 本日の日付を取得
    var date = new Date(); // Dateオブジェクトのインスタンスを生成
    var year = date.getFullYear(); // 現在の西暦を取得
    var month = date.getMonth() + 1; // 現在の月を取得
    var today = date.getDate(); // 現在の日にちを取得

    // 当月1日の日付を取得
    var firstDate = new Date(year, month - 1, 1);

    // 翌月の0日を指定して当月の月末日を取得
    var lastDate = new Date(year, month, 0);

    // 本日のタスクの日付の設定
    var todayStr = year + "年" + month + "月" + today + "日";
    // presetDiary関数の呼び出し
    presetTask(todayStr);

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
    var startWeekDay = firstDate.getDay();

    // 1日までを空白で埋める
    for (var i = 0; i < startWeekDay; i++) {
        htmlStr += "<td>&nbsp;</td>";
    }

    // 1日から月末日までループ
    for (var i = 1; i <= lastDate.getDate(); i++) {
        // 当月i日の日付オブジェクトを生成
        var date = new Date(year, month - 1, i); //インスタンスの生成
        // i日の曜日を取得
        var weekDay = date.getDay();
        // タスクを保存する際の日付部分のキー
        var dateStr = year + "年" + month + "月" + i + "日";

        // 日を取得
        var cellStr = date.getDate();
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
        htmlStr += "<a onclick='presetTask(\"" + dateStr + "\");'>" + cellStr + "</a></td>";

        // 土曜日の場合は行の終わりなのでtr終了タグ
        if (weekDay == 6) htmlStr += "</tr>\n"; //`\n`は改行の意味

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
    document.getElementById("calendar__contents").innerHTML = "<table>" + captionHtml + weekdaysStr + htmlStr + "</table>"; //captionHTMLは見出し部分、weekdaysStrが曜日の列、htmlStrは各日にち
});



/*
前の月のカレンダーを表示
*/
window.addEventListener("DOMContentLoaded", function () {
    // 本日の日付を取得
    var date = new Date(); // Dateオブジェクトのインスタンスを生成
    var year = date.getFullYear(); // 現在の西暦を取得
    var month = date.getMonth(); // 前の月を取得   変更
    var today = date.getDate(); // 現在の日にちを取得

    // 前月1日の日付を取得
    var firstDate = new Date(year, month - 1, 1);

    // 翌月の0日を指定して当月の月末日を取得
    var lastDate = new Date(year, month, 0);

    // 本日のタスクの日付の設定
    var todayStr = year + "年" + month + "月" + today + "日";
    presetTask(todayStr); // presetDiary関数の呼び出し

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
        // タスクを保存する際の日付部分のキー
        var dateStr = year + "年" + month + "月" + i + "日";

        // 日を取得
        var cellStr = date.getDate();
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

        htmlStr += "<a onclick='presetTask(\"" + dateStr + "\");'>" + cellStr + "</a></td>";

        // 土曜日の場合は行の終わりなのでtr終了タグ
        if (weekDay == 6) htmlStr += "</tr>\n"; //`\n`は改行の意味

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
    document.getElementById("calendar__contents--prev").innerHTML = "<table>" + captionHtml + weekdaysStr + htmlStr + "</table>"; //captionHTMLは見出し部分、weekdaysStrが曜日の列、htmlStrは各日にち


    /*
     タスクの保存
     */
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
});



/*
カレンダーの日付とタスクの入力欄のリンク
*/
// 指定した日付のタスクを表示
function presetTask(dateStr) {
    // ボタンのdate属性にキーの日付を指定する
    var saveBtn = document.getElementById("task__save");
    saveBtn.setAttribute("data-date", dateStr);

    // タスクの日付を表示
    var task_date = document.getElementById("task__date");
    task_date.innerHTML = dateStr;

    // localStorageからタスクの内容と反省を取得
    var reflect = localStorage[dateStr + "_reflect"];
    var body = localStorage[dateStr + "_body"];

    // タスクの入力欄の値を取得
    var task_reflect = document.getElementById('task__reflect');
    var task_body = document.getElementById('task__body');

    // タスクのデータがあれば表示（localStorageの参照）
    if (reflect) {
        task_reflect.value = reflect;
    } else {
        task_reflect.value = "";
    }

    if (body) {
        task_body.value = body;
    } else {
        task_body.value = "";
    }
}