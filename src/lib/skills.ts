import skillData from "@/data/skills.json"

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
  branch: string
  readme: string
  installCommand: string
  compatibility: string[]
  uses: string[]
}

export const skills: Skill[] = skillData

export const categories = Array.from(
  new Set(skills.map((skill) => skill.category))
)

export function getSkill(slug: string) {
  return skills.find((skill) => skill.slug === slug)
}
