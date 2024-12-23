import { describe, expect, it } from "bun:test";
import { parseNarouRuby } from "../../src/ruby/parse-narou-ruby";

describe("ルビの変換(なろう記法)", () => {
    it("半角パイプが問題なく変換されている。", () => {
      // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
      const input = `|明後日の天気《・・・・・・》`;
      const expectedOutput = "<ruby>明後日の天気<rp>(</rp><rt>・・・・・・</rt><rp>)</rp></ruby>";
  
      const result = parseNarouRuby(input);
  
      expect(result).toBe(expectedOutput);
    });

    it("全角パイプが問題なく変換されている。", () => {
      // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
      const input = `｜明後日の天気《・・・・・・》`;
      const expectedOutput = "<ruby>明後日の天気<rp>(</rp><rt>・・・・・・</rt><rp>)</rp></ruby>";
  
      const result = parseNarouRuby(input);
  
      expect(result).toBe(expectedOutput);
    });
  });