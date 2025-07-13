// Clone object by converting to JSON and back
export const cloneJSON = <Type>(obj: Type): Type => {
  return JSON.parse(JSON.stringify(obj))
}

export const buildDictFromArray = <Type>(arr: any[], key: string) => {
  const dict: { [key: string]: Type } = {}
  for (const elem of arr) dict[elem[key]] = elem
  return dict
}

export const roundToCent = (x: number) => Math.round(x * 100) / 100
export const roundToDec = (x: number) => Math.round(x * 10) / 10

export const isObjectNotEmpty = (o: any) => {
  if (!o) return false
  for (const p in o) return true
  return false
}
