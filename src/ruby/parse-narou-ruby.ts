/**
 * なろう記法のルビをHTMLに変換する
 * @param input なろう記法のルビ
 * @returns なろう記法のルビのHTML
 */
export function parseNarouRuby(input: string): string {
    let output = input;

    // 半角と全角のパイプを正規表現でマッチ
    let pipeMatch = output.match(/([|｜])/);

    while (pipeMatch) {
        const pipeIndex = pipeMatch.index!; // pipeMatchが存在する場合はindexは必ず存在する
        const rubyStart = output.indexOf('《', pipeIndex);
        const rubyEnd = output.indexOf('》', rubyStart);

        if (rubyStart !== -1 && rubyEnd !== -1) {
            const baseText = output.substring(pipeIndex + 1, rubyStart);
            const rubyText = output.substring(rubyStart + 1, rubyEnd);
            const rubyHtml = `<ruby>${baseText}<rp>(</rp><rt>${rubyText}</rt><rp>)</rp></ruby>`;

            output = output.substring(0, pipeIndex) + rubyHtml + output.substring(rubyEnd + 1);

            // 次のパイプを検索。ただし、pipeIndexがずれている可能性があるので、その位置から検索する必要がある
            pipeMatch = output.substring(pipeIndex + rubyHtml.length).match(/([|｜])/);
            if (pipeMatch) {
                pipeMatch.index! += pipeIndex + rubyHtml.length
            }
        } else {
            break;
        }
    }

    return output;
}