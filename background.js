let fileNames = {};

chrome.runtime.onMessage.addListener(function (msg) {
  const { url } = msg;
  const filename = "筑波大学/" + msg.coursename + "/" + msg.pagetitle + "α" + decodeURIComponent(url.substring(url.lastIndexOf("/") + 1).split("?")[0]);

  // ファイルの存在を確認
  chrome.downloads.search({ query: ["α" + decodeURIComponent(url.substring(url.lastIndexOf("/") + 1).split("?")[0])] }, function (results) {
    if (results.length > 0 && results[0].state === 'complete') {
      // ファイルが存在する場合は新しいタブで開く
      chrome.tabs.create({ url: "[ここを自身のdownloadディレクトリへのpathにしてください。]//" + filename});
    } else {
      // ファイルが存在しない場合のみダウンロード
      chrome.downloads.download({ url }).then(id => {
        // ファイル名をURLから取得し、"筑波大学"フォルダに設定
        fileNames[id] = filename; // idとファイル名を関連付け
      });
    }
  });
});

// ファイル名変更のためリスナを追加
chrome.downloads.onDeterminingFilename.addListener((ev, suggest) => {
  if (fileNames[ev.id]) {
    const filename = fileNames[ev.id]; // ダウンロードIDからファイル名を解決
    delete fileNames[ev.id];
    suggest({ filename });
  }
});