import { promises as fs } from 'fs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  await fs.writeFile('data/modules.json', JSON.stringify(body, null, 2))
  return { success: true }
})
