import { describe, expect, it } from "bun:test";
import { parseKakuyomuNovel } from "../mod";

describe("parseTextArea", () => {
    it("should parse text with ruby notation and wrap lines with <p> tags and ids, including whitespace and newlines", () => {
      // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
      const input = `明日の天気\n|明後日の天気《・・・・・・》`;
      const expectedOutput = `<p id="p1">明日の天気</p>
<p id="p2"><ruby>明後日の天気<rp>(</rp><rt>・・・・・・</rt><rp>)</rp></ruby></p>`;
  
      const result = parseKakuyomuNovel(input);
  
      expect(result).toBe(expectedOutput);
    });
  });