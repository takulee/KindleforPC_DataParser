# KindleforPC_DataParser
Puppeteer: Kindle for PCのxmlデータの書籍情報をCSV形式で取得します

Kindle for PCのxmlデータの書籍情報を、Puppeteerを使ってCSVファイル化します。 出力する情報は以下の通りです。

- 通番
- ASIN
- 書籍名
- 著者
- パブリッシャー
- 発刊日
- 購入日

CSVファイルの文字コードはUTF-8ですので、そのままExcelで開くと文字化けしますのでお気を付けください。 また、自分用に作ったので、エラー処理などはほぼ無いです。
