import { describe, expect, it } from "vitest";
import { buildPosterUrl } from "./poster";

describe("buildPosterUrl", () => {
  it("returns fallback when path is null", () => {
    const result = buildPosterUrl(null);

    expect(result).toContain("placehold.co");
  });

  it("returns full TMDB image URL when path exists", () => {
    const result = buildPosterUrl("/abc.jpg");

    expect(result).toBe("https://image.tmdb.org/t/p/w500/abc.jpg");
  });
});
