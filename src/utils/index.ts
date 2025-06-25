/**
 * 生成指定位数的uuid
 * @param length
 * @returns
 */
export function generateRandomString(length: number = 9) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters[randomIndex]
  }
  return result
}
