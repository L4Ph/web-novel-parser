import { parseNarouRuby } from "./parse-narou-ruby";

/**
 * カクヨム記法のルビをパースする
 *
 * @param input カクヨム記法のルビ
 * @returns カクヨム記法のルビのHTML
 */
export function parseKakuyomuRuby(input: string): string {
  let output = input;

  // 先頭が|の場合はなろう式なので、なろう式のルビパーサーに処理を委ねる
  if (output.startsWith('|')) {
    return parseNarouRuby(input);
  }

  let rubyStart: number = output.indexOf('《');
  while (rubyStart !== -1) {
    const rtEnd: number = output.indexOf('》', rubyStart);

    if (rtEnd !== -1) {
      const rubyText = output.substring(rubyStart + 1, rtEnd);

      const baseEnd = rubyStart;
      let baseStart = baseEnd - 1;

      // ルビ対象文字列の開始位置を探す (漢字が続く限り遡る)
      while (baseStart >= 0 && isKanji(output.charAt(baseStart))) {
        baseStart--;
      }
      baseStart++;

      const baseText = output.substring(baseStart, baseEnd);
      const rubyHtml = `<ruby>${baseText}<rp>(</rp><rt>${rubyText}</rt><rp>)</rp></ruby>`;

      output = output.substring(0, baseStart) + rubyHtml + output.substring(rtEnd + 1);

      // 挿入したHTMLの後の位置から次のルビを探す
      rubyStart = output.indexOf('《', baseStart + rubyHtml.length);

    } else {
      // 》が見つからない場合は処理を終了
      break;
    }
  }

  return output;
}

/**
 * 文字が漢字かどうかを判定する
 *
 * @param char 判定する文字
 * @returns 漢字の場合はtrue、それ以外の場合はfalse
 */
function isKanji(char: string): boolean {
  return /[\u4E00-\u9FFF]/.test(char);
}