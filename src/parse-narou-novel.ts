import { parseNarouRuby } from "./ruby/parse-narou-ruby";

/**
 * カクヨム記法の小説をHTMLに変換する
 * @param input カクヨム記法の小説
 * @returns カクヨム記法で書かれた小説のHTML
 */
export function parseNarouNovel(input: string): string {
    const lines = input.split('\n');
    let result = "";
    let lineId = 1;

    for (const line of lines) {
        const trimmedLine = line.trim();

        if (trimmedLine === "") {
            result += `<p id="L${lineId}"><br /></p>\n`;
        } else {
            // 正規表現で半角または全角パイプと《》で囲まれた部分を検索
            const replacedLine = trimmedLine.replace(/([|｜])([^《]+)《([^》]+)》/g, (match, pipe, baseText, rubyText) => {
                return `<ruby>${baseText}<rp>(</rp><rt>${rubyText}</rt><rp>)</rp></ruby>`;
            });
            result += `<p id="L${lineId}">${replacedLine}</p>\n`;
        }

        lineId++;
    }
    return result;
}