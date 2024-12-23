/**
 * 
 * @param input カクヨム記法の傍点
 * @returns カクヨム記法の傍点のHTML
 */

export function parseKakuyomuEmphasisDots(input: string): string {
  let result = '';
  let i: number = 0;

  while (i < input.length) {
    const start: number = input.indexOf('《《', i);
    if (start === -1) {
      result += input.slice(i);
      break;
    }

    result += input.slice(i, start);
    const end: number = input.indexOf('》》', start);

    if (end === -1) {
      result += input.slice(start);
      break;
    }

    const content: string = input.slice(start + 2, end);
    const spans: string = content.split('')
      .map<string>(char => `<span>${char}</span>`)
      .join('');

    result += `<em style="text-emphasis: filled black;">${spans}</em>`;
    i = end + 2;
  }

  return result;
}
