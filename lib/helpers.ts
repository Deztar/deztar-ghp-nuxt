// Clone object by converting to JSON and back
export const cloneJSON = <Type>(obj: Type): Type => {
  return JSON.parse(JSON.stringify(obj))
}

export const buildDictFromArray = <Type>(arr: any[], key: string) => {
	const dict: { [key: string]: Type } = {};
	for (const elem of arr) {
		dict[elem[key]] = elem;
	}
	return dict;
}