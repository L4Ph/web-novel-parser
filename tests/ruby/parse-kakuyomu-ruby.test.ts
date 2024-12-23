import { describe, expect, it } from "bun:test";
import { parseKakuyomuRuby } from "../../src/ruby/parse-kakuyomu-ruby";

describe("ルビの変換(カクヨム記法)", () => {
  // KakuyomuRubyのテスト
  it("KakuyomuRuby: 冴えない彼女《ヒロイン》の育てかた が正しく変換される。", () => {
    // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
    const input = `冴えない彼女《ヒロイン》の育てかた`;
    const expectedOutput = "冴えない<ruby>彼女<rp>(</rp><rt>ヒロイン</rt><rp>)</rp></ruby>の育てかた";

    const result = parseKakuyomuRuby(input);

    expect(result).toBe(expectedOutput);
  });

  it("KakuyomuRuby: |明日の天気《あしたのてんき》 が正しく変換される。", () => {
    // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
    const input = `|明日の天気《あしたのてんき》`;
    const expectedOutput = "<ruby>明日の天気<rp>(</rp><rt>あしたのてんき</rt><rp>)</rp></ruby>";

    const result = parseKakuyomuRuby(input);

    expect(result).toBe(expectedOutput);
  });

  it("KakuyomuRuby: 区切り文字が入っている場合でも正しく変換される。", () => {
    // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
    const input = `|明日の天気《あしたのてんき》、晴れです。`;
    const expectedOutput = "<ruby>明日の天気<rp>(</rp><rt>あしたのてんき</rt><rp>)</rp></ruby>、晴れです。";

    const result = parseKakuyomuRuby(input);

    expect(result).toBe(expectedOutput);
  });
    
  it("問題なく変換されている。", () => {
    // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
    const input = `|明後日の天気《・・・・・・》`;
    const expectedOutput = "<ruby>明後日の天気<rp>(</rp><rt>・・・・・・</rt><rp>)</rp></ruby>";

    const result = parseKakuyomuRuby(input);

    expect(result).toBe(expectedOutput);
  });
});