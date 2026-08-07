import skillData from "../data/skills.json" with { type: "json" }

export type Skill = {
  slug: string
  name: string
  mark: string
  category: string
  status: string
  version: string
  featured: boolean
  summary: string
  description: string
  repository: string
  repositoryOwner: string
  repositoryName: string
  branch: string
  readmeUrl: string
  readmeSourceUrl: string
  rawContentBaseUrl: string
  sourceContentBaseUrl: string
  installCommand: string
  compatibility: readonly string[]
  uses: readonly string[]
}

type CatalogEntry = Omit<
  Skill,
  | "repositoryOwner"
  | "repositoryName"
  | "readmeUrl"
  | "readmeSourceUrl"
  | "rawContentBaseUrl"
  | "sourceContentBaseUrl"
>

type Discovery = {
  query?: string
  category?: string
}

export type SkillCatalog = {
  list: () => readonly Skill[]
  find: (slug: string) => Skill | undefined
  discover: (discovery?: Discovery) => readonly Skill[]
  categories: () => readonly string[]
  featured: () => Skill
  summary: () => { total: number; stable: number; categories: number }
  routePaths: () => readonly string[]
}

const requiredStrings = [
  "slug",
  "name",
  "mark",
  "category",
  "status",
  "version",
  "summary",
  "description",
  "repository",
  "branch",
  "installCommand",
] as const satisfies readonly (keyof CatalogEntry)[]

const allowedFields = new Set<string>([
  ...requiredStrings,
  "featured",
  "compatibility",
  "uses",
])

function fail(index: number, message: string): never {
  throw new Error(`Invalid Skill catalog entry ${index + 1}: ${message}`)
}

function stringList(
  value: unknown,
  field: "compatibility" | "uses",
  index: number
) {
  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    value.some((item) => typeof item !== "string" || !item.trim())
  ) {
    fail(index, `${field} must be a non-empty list of strings`)
  }
  return Object.freeze([...value]) as readonly string[]
}

function repositoryFacts(repository: string, branch: string, index: number) {
  let url: URL
  try {
    url = new URL(repository)
  } catch {
    fail(index, "repository must be a valid URL")
  }

  if (url.protocol !== "https:" || url.hostname !== "github.com") {
    fail(index, "repository must be a public HTTPS GitHub URL")
  }

  const [owner, name, ...rest] = url.pathname.split("/").filter(Boolean)
  if (!owner || !name || rest.length > 0) {
    fail(index, "repository must identify one GitHub owner and repository")
  }

  const repositoryName = name.replace(/\.git$/, "")
  const repositoryUrl = `https://github.com/${owner}/${repositoryName}`
  const rawContentBaseUrl = `https://raw.githubusercontent.com/${owner}/${repositoryName}/${branch}`
  const sourceContentBaseUrl = `${repositoryUrl}/blob/${branch}`

  return {
    repository: repositoryUrl,
    repositoryOwner: owner,
    repositoryName,
    rawContentBaseUrl,
    sourceContentBaseUrl,
    readmeUrl: `${rawContentBaseUrl}/README.md`,
    readmeSourceUrl: `${sourceContentBaseUrl}/README.md`,
  }
}

function parseEntry(value: unknown, index: number): Skill {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    fail(index, "entry must be an object")
  }

  const entry = value as Record<string, unknown>
  const unknownField = Object.keys(entry).find(
    (field) => !allowedFields.has(field)
  )
  if (unknownField) fail(index, `unknown field: ${unknownField}`)

  for (const field of requiredStrings) {
    if (typeof entry[field] !== "string" || !entry[field].trim()) {
      fail(index, `${field} must be a non-empty string`)
    }
  }
  if (typeof entry.featured !== "boolean") {
    fail(index, "featured must be a boolean")
  }

  const parsed = entry as unknown as CatalogEntry
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(parsed.slug)) {
    fail(index, "slug must contain lowercase words separated by hyphens")
  }
  if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(parsed.version)) {
    fail(index, "version must use semantic versioning")
  }

  return Object.freeze({
    ...parsed,
    ...repositoryFacts(parsed.repository, parsed.branch, index),
    compatibility: stringList(entry.compatibility, "compatibility", index),
    uses: stringList(entry.uses, "uses", index),
  })
}

export function createSkillCatalog(value: unknown): SkillCatalog {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error("Skill catalog must contain at least one entry")
  }

  const skills = Object.freeze(value.map(parseEntry))
  const slugs = new Set<string>()
  for (const skill of skills) {
    if (slugs.has(skill.slug)) {
      throw new Error(`Skill catalog contains duplicate slug: ${skill.slug}`)
    }
    slugs.add(skill.slug)
  }

  const featuredSkills = skills.filter((skill) => skill.featured)
  if (featuredSkills.length !== 1) {
    throw new Error("Skill catalog must contain exactly one featured Skill")
  }

  const categoryList = Object.freeze([
    ...new Set(skills.map((skill) => skill.category)),
  ])

  return Object.freeze({
    list: () => skills,
    find: (slug) => skills.find((skill) => skill.slug === slug),
    discover: ({ query = "", category = "All" } = {}) => {
      const term = query.trim().toLowerCase()
      return Object.freeze(
        skills.filter((skill) => {
          const matchesCategory =
            category === "All" || skill.category === category
          const matchesQuery =
            !term ||
            [skill.name, skill.summary, skill.category, skill.description]
              .join(" ")
              .toLowerCase()
              .includes(term)
          return matchesCategory && matchesQuery
        })
      )
    },
    categories: () => categoryList,
    featured: () => featuredSkills[0],
    summary: () => ({
      total: skills.length,
      stable: skills.filter((skill) => skill.status === "Stable").length,
      categories: categoryList.length,
    }),
    routePaths: () =>
      Object.freeze(skills.map((skill) => `/skills/${skill.slug}`)),
  })
}

export const skillCatalog = createSkillCatalog(skillData)
