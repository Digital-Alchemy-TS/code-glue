import pluralize from "pluralize"

// Example of new plural rule:
// pluralize.addPluralRule(/gex$/i, 'gexii')

// Example of new singular rule:
// pluralize.addSingularRule(/singles$/i, "singular")

// Example of new irregular rule, e.g. "I" -> "we":
// pluralize.addIrregularRule('irregular', 'regular')

// Example of uncountable rule (rules without singular/plural in context):
// pluralize.addUncountableRule('paper')

export { pluralize }
