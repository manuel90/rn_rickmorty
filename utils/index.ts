export const pluralText = (n: number, singular: string, plural: string) => {
	return n > 1 ? plural : singular
}