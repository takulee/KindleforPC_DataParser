//
// Kindle for PCのxmlから書籍情報をCSVとして取得する
//
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const KindleData = "C:\\Users\\username\\AppData\\Local\\Amazon\\Kindle\\Cache\\KindleSyncMetadataCache.xml";
const WriteFilename = "KindleData.txt";

//
// メイン処理
//
(async() => {

	// ブラウザを起動
	const browser = await puppeteer.launch({
		headless: true,
		slowMo: 0
	});

	// リスト作成を呼び出す
	await makeList(browser, KindleData);

	await browser.close();
})();

//
// リスト作成
//
async function makeList(browser, KindleData){

	const page = await browser.newPage();
	await page.goto(KindleData);

	// 本のリストを取得
	let bookList = await page.$('add_update_list');
	let bookArray = await bookList.$$('meta_data');

	// 本を1冊ずつ処理します
	for (let bookIdx = 0; bookIdx < bookArray.length; bookIdx++){

		// ASIN
		let bookASIN = await bookArray[bookIdx].$('ASIN');
		if (bookASIN != null) {
			bookASIN = await (await bookASIN.getProperty('textContent')).jsonValue();
		} else {
			bookASIN = "";
		}

		// 書籍名
		let bookTitle = await bookArray[bookIdx].$('title');
		if (bookTitle != null) {
			bookTitle = await (await bookTitle.getProperty('textContent')).jsonValue();
		} else {
			bookTitle = "";
		}

		// 著者
		let bookAuthors = await bookArray[bookIdx].$('author');
		if (bookAuthors != null) {
			bookAuthors = await (await bookAuthors.getProperty('textContent')).jsonValue();
		} else {
			bookAuthors = "";
		}

		// パブリッシャー
		let bookPublishers = await bookArray[bookIdx].$('publishers');
		if (bookPublishers != null) {
			bookPublishers = await (await bookPublishers.getProperty('textContent')).jsonValue();
		} else {
			bookPublishers = "";
		}

		// 発刊日
		let bookPublicationDate = await bookArray[bookIdx].$('publication_date');
		if (bookPublicationDate != null) {
			bookPublicationDate = await (await bookPublicationDate.getProperty('textContent')).jsonValue();
		} else {
			bookPublicationDate = "";
		}

		// 購入日
		let bookPurchaseDate = await bookArray[bookIdx].$('purchase_date');
		if (bookPurchaseDate != null) {
			bookPurchaseDate = await (await bookPurchaseDate.getProperty('textContent')).jsonValue();
		} else {
			bookPurchaseDate = "";
		}

console.log(bookIdx);
console.log(bookASIN);
console.log(bookTitle);
console.log(bookAuthors);
console.log(bookPublishers);
console.log(bookPublicationDate);
console.log(bookPurchaseDate);

		// 書籍情報をCSVに保存
		fs.appendFile(path.join(__dirname, WriteFilename),
			"\"" + String(bookIdx + 1) + "\",\"" + bookASIN + "\",\""+ bookTitle + "\",\"" + bookAuthors + "\",\"" + bookPublishers + "\",\"" + bookPublicationDate+ "\",\"" + bookPurchaseDate + "\"\n", (error) => {
			if (error){
				console.error(error);
			}
		});
	}
}
