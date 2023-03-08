export default function dumpROMAttributes (rom) {
  const romAttributes = {}
  for (const [key, value] of Object.entries(rom)) {
    romAttributes[key] = value
  }
  return romAttributes
}
