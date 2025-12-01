export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  await useStorage().setItem("data:modules.json", body)
  return { success: true }
})
