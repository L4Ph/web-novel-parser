import { parseNarouRuby } from "./parse-narou-ruby";

/**
 * 
 * @param input カクヨム記法のルビ
 * @returns カクヨム記法のルビのHTML
 */

export function parseKakuyomuRuby(input: string): string {
    let output = input;

    if (output.startsWith('|')) {
        output = parseNarouRuby(input)
    }
    
    else if (output.startsWith('《')) {
        let rubyStart: number = output.indexOf('《');
        while (rubyStart !== -1) {
            const rtEnd: number = output.indexOf('》', rubyStart);
    
            if (rtEnd !== -1) {
                const rubyText = output.substring(rubyStart + 1, rtEnd);
    
                const baseEnd = rubyStart;
                let baseStart = baseEnd - 1;
    
                while (baseStart >= 0 && !isDelimiter(output.charAt(baseStart))) {
                    baseStart--;
                }
                baseStart++;
    
                const baseText = output.substring(baseStart, baseEnd);
                const rubyHtml = `<ruby>${baseText}<rp>(</rp><rt>${rubyText}</rt><rp>)</rp></ruby>`;
    
                output = output.substring(0, baseStart) + rubyHtml + output.substring(rtEnd + 1);
    
                rubyStart = output.indexOf('《', baseStart + rubyHtml.length); // 再び検索
            } else {
                break;
            }
        }
    }

    return output;
}

function isDelimiter(char: string): boolean {
    return char === ' ' || char === '　' || char === '、' || char === '。';
}
