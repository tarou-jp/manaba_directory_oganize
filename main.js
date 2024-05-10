document.addEventListener('click', function(e) {
  // クリックされた要素を確認
  var target = e.target;

  // クリックされた要素がリンクであるかチェック
  if (target.tagName === 'A' && target.href) {
    // URLがダウンロードリンクであるかどうかのチェック
    var url = new URL(target.href);
    
    // ドメインが manaba.tsukuba.ac.jp であることを確認
    if (url.hostname === 'manaba.tsukuba.ac.jp') {
      // ファイルの拡張子を取得
      var fileName = url.pathname.split('/').pop();
      var fileExtension = fileName.split('.').pop().toLowerCase();
      
      // 反応する拡張子を指定
      var validExtensions = ['pdf', 'c', 'cpp', 'java', 'py', 'doc', 'docx', 'ppt', 'pptx'];
      
      // バックグラウンドスクリプトにダウンロードリンクのURLを送信
      if (validExtensions.includes(fileExtension)) {
        var coursenameLink = document.getElementById('coursename')   
        var pagetitleH1 = document.querySelector('h1.pagetitle')   

        e.preventDefault(); // デフォルトのリンク動作を停止
        if (coursenameLink && coursenameLink.title) {

          if (pagetitleH1 && pagetitleH1.textContent){
            // ダウンロードリンクのURLと一緒にcoursenameLinkのtitle属性を送信
            chrome.runtime.sendMessage({ url: target.href, coursename: coursenameLink.title, pagetitle: pagetitleH1.textContent + "/"});
          } else{
            chrome.runtime.sendMessage({ url: target.href, coursename: coursenameLink.title, pagetitle: ""});
          }
        } else {
          // coursenameLinkが見つからない場合、ダウンロードリンクのURLのみ送信
          chrome.runtime.sendMessage({ url: target.href, coursename: "その他" , pagetitle: ""});
        }
      }
    }
  }
});