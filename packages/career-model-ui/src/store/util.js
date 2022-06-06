export function slug (s) {
  if (!s) {
    return s
  }
  return s.toLowerCase().replace(/ /g, '-')
}
