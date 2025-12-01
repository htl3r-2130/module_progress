import { readFile } from "node:fs/promises"
import { join } from "node:path"

export default defineEventHandler(async () => {
  const storage = useStorage()

  // Nitro storage first
  let data = await storage.getItem("data:modules.json")
  if (data) return data

  // Seed from /public if not yet written
  const filePath = join(process.cwd(), "public/modules.json")
  const raw = await readFile(filePath, "utf8")
  data = JSON.parse(raw)

  await storage.setItem("data:modules.json", data)
  return data
})
