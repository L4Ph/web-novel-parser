import { describe, expect, it } from "bun:test";
import { parseNarouNovel } from "../mod";

describe("入力された小説が問題なく変換されている。", () => {
    it("なろう小説が問題なく変換されている。", () => {
      // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
      const input = [
        "明日の天気 |明後日の天気《・・・・・・》",
        "わたしは｜山田太郎《やまだたろう》"
      ].join('\n');
      const expectedOutput = [
        `<p id="L1">明日の天気<ruby>明後日の天気<rp>(</rp><rt>・・・・・・</rt><rp>)</rp></ruby></p>`,
        `<p id="L2">わたしは<ruby>山田太郎<rp>(</rp><rt>やまだたろう</rt><rp>)</rp></ruby></p>`
      ].join('\n');
  
      const result = parseNarouNovel(input);
  
      expect(result).toBe(expectedOutput);
    });
});