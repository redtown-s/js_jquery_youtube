// リクエストパラメータのセット
const KEY = 'AIzaSyBRsRX4vI5guXTmh3wRDBhPLuvIZjVxXuo'
// 'AIzaSyC5AChC9ey3PPaczW15qZTEI6bmSkPV24g';
//さっき取得したAPIキーを貼り付け変数に代入
let url = 'https://www.googleapis.com/youtube/v3/search?'; //API URLを変数に代入
// パラメータを連結
url += 'type=video';  // 動画を検索する
url += '&part=snippet';  // 検索結果にすべてのプロパティを含む
url += '&q=music';  // 検索ワード このサンプルでは music に指定
url += '&videoEmbeddable=true';  // Webページに埋め込み可能な動画のみを検索
url += '&videoSyndicated=true';  // YouTube.com以外で再生できる動画のみに限定
url += '&maxResults=6';  // 動画の最大取得件数
url += '&key=' + KEY;  // API KEY

// HTMLが読み込まれてから実行する処理
$(function() {  //読み込み完了後に実行
  // youtubeの動画を検索して取得
  $.ajax({    // リクエストを実行
    url: url,
    dataType : 'jsonp'
  }).done(function(data) {
    if (data.items) {  // データをチェック

      setData(data);  // データ取得が成功したときの関数setDataを呼び出す

    } else {
      console.log(data);  // 警告メッセージを表示
      alert('該当するデータが見つかりませんでした');
    }
  }).fail(function(data) {
    alert('通信に失敗しました');
  });
});

// データ取得が成功したときの処理
function setData(data) {  // 関数を定義
  let result = '';
  let video = '';
  // 動画を表示するHTMLを作る
  // iframe要素のタグを作る
  for (let i = 0; i < data.items.length; i++) { //.itemsはJSONのレスポンスの値
    video = '<iframe src="https://www.youtube.com/embed/';
    video += data.items[i].id.videoId;
    video += '" allowfullscreen></iframe>';
    result += '<div class="video">' + video + '</div>'
  }
  // HTMLに反映する
  $('#videoList').html(result);  //  要素を作成
}

