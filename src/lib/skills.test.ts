import { describe, expect, it } from "vitest"

import { createSkillCatalog } from "./skills"

function entry(overrides: Record<string, unknown> = {}) {
  return {
    slug: "example-skill",
    name: "Example Skill",
    mark: "ES",
    category: "Testing",
    status: "Stable",
    version: "1.2.3",
    featured: true,
    summary: "A focused example for catalog tests.",
    description: "A longer example used to exercise catalog discovery.",
    repository: "https://github.com/example/example-skill",
    branch: "main",
    installCommand: "npx example-skill",
    compatibility: ["OpenAI Codex"],
    uses: ["Catalog testing"],
    ...overrides,
  }
}

describe("Skill catalog", () => {
  it("validates entries and derives repository facts", () => {
    const catalog = createSkillCatalog([entry()])
    const skill = catalog.featured()

    expect(skill.repositoryOwner).toBe("example")
    expect(skill.readmeUrl).toBe(
      "https://raw.githubusercontent.com/example/example-skill/main/README.md"
    )
    expect(skill.readmeSourceUrl).toBe(
      "https://github.com/example/example-skill/blob/main/README.md"
    )
    expect(catalog.routePaths()).toEqual(["/skills/example-skill"])
  })

  it("owns discovery and summary policy", () => {
    const catalog = createSkillCatalog([
      entry(),
      entry({
        slug: "seo-skill",
        name: "SEO Skill",
        category: "SEO",
        featured: false,
        status: "Beta",
        repository: "https://github.com/example/seo-skill",
      }),
    ])

    expect(catalog.discover({ query: "longer example" })).toHaveLength(2)
    expect(catalog.discover({ category: "SEO" })).toHaveLength(1)
    expect(catalog.summary()).toEqual({ total: 2, stable: 1, categories: 2 })
  })

  it("rejects duplicate slugs", () => {
    expect(() =>
      createSkillCatalog([
        entry(),
        entry({
          featured: false,
          repository: "https://github.com/example/another-skill",
        }),
      ])
    ).toThrow("duplicate slug")
  })

  it("requires one featured Skill", () => {
    expect(() => createSkillCatalog([entry({ featured: false })])).toThrow(
      "exactly one featured Skill"
    )
  })

  it("rejects malformed repository facts", () => {
    expect(() =>
      createSkillCatalog([entry({ repository: "https://example.com/skill" })])
    ).toThrow("public HTTPS GitHub URL")
  })

  it("rejects duplicated derived facts", () => {
    expect(() =>
      createSkillCatalog([
        entry({
          readme:
            "https://raw.githubusercontent.com/example/example-skill/main/README.md",
        }),
      ])
    ).toThrow("unknown field: readme")
  })
})
