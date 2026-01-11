export type LetterCaseType = (initial: string) => string

export const titleCase: LetterCaseType = (input) => {
	const smallWords =
		/^(a|an|and|as|at|but|by|en|for|if|in|is|nor|of|on|or|per|the|to|vs?\.?|via)$/i

	return input.replace(
		/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g,
		(match, index, s) => {
			if (
				index > 0 &&
				index + match.length !== s.length &&
				match.search(smallWords) > -1 &&
				s.charAt(index - 2) !== ":" &&
				(s.charAt(index + match.length) !== "-" ||
					s.charAt(index - 1) === "-") &&
				s.charAt(index - 1).search(/[^\s-]/) < 0
			) {
				return match.toLowerCase()
			}

			if (match.substring(1).search(/[A-Z]|\../) > -1) {
				return match
			}

			return match.charAt(0).toUpperCase() + match.substring(1)
		},
	)
}

const lowerCase: LetterCaseType = (input) => {
	return input.toLowerCase()
}

const upperCase: LetterCaseType = (input) => {
	return input.toUpperCase()
}

const sentenceCase: LetterCaseType = (input) => {
	return input.substring(0, 1).toUpperCase() + input.substring(1)
}

const camelCase: LetterCaseType = (input) => {
	return input
		.split(/[-_\s]+/)
		.map((part, index) =>
			index === 0
				? part.charAt(0).toLowerCase() + part.slice(1).toLowerCase()
				: part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
		)
		.join("")
		.replace(/[^a-zA-Z0-9]/g, "")
}

export const letterCase = {
	title: titleCase,
	sentence: sentenceCase,
	lower: lowerCase,
	upper: upperCase,
	camel: camelCase,
} as const
