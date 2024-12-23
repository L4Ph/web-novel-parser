import { parseKakuyomuRuby } from "./ruby/parse-kakuyomu-ruby";
import { parseKakuyomuEmphasisDots } from "./emphasis/parse-kakuyomu-emphasis-dots";

/**
 * 
 * @param input カクヨム記法の小説
 * @returns カクヨム記法で書かれた小説のHTML
 */

export function parseKakuyomuNovel(input: string): string {
    const lines = input.split('\n');
    let result = "";
    let lineId: number = 1;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        if (line.indexOf('|') !== -1 && line.indexOf('《') !== -1 && line.indexOf('》') !== -1) {
            line = parseKakuyomuRuby(line);
        }

        if (line.indexOf('《《') !== -1 && line.indexOf('》》') !== -1) {
            line = parseKakuyomuEmphasisDots(line);
        }

        result += `<p id="p${lineId.toString()}">${line}</p>`;
        lineId++;

        if (i < lines.length - 1) {
            result += '\n';
        }
    }

    return result;
}
