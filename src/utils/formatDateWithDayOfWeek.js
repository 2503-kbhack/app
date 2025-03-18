/**
 * 日本の日時文字列を Unixエポック(1970-01-01T00:00:00Zからの経過ミリ秒) に変換する関数
 * 
 * @param {string} dateString - "2025/03/18 13:05:00" のような日本時間の日時文字列
 * @returns {number} 1970-01-01T00:00:00Z からの経過ミリ秒
 */
export function japaneseDateToUnixTime(dateString) {
    // JST(UTC+9)として解釈させたい場合、末尾に GMT+0900 をつけて new Date で生成する
    // 例: "2025/03/18 13:05:00 GMT+0900"
    const date = new Date(`${dateString} GMT+0900`);
    return date.getTime();
  }
  
/**
 * Unixエポック(1970-01-01T00:00:00Zからの経過ミリ秒) を
 * 日本標準時の日時文字列に変換する関数
 * 
 * @param {number} unixTime - 1970-01-01T00:00:00Z からの経過ミリ秒
 * @returns {string} "2025/3/18 13:05:00" のような日本時間の日時文字列
 */
export function unixTimeToJapaneseDate(unixTime) {
const date = new Date(unixTime);
// toLocaleString でタイムゾーンを指定すれば、日本時間として整形された文字列を得られる
return date.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
}
  