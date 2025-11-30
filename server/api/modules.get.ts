import { promises as fs } from 'fs'

export default defineEventHandler(async () => {
  const raw = await fs.readFile('data/modules.json', 'utf8')
  return JSON.parse(raw)
})