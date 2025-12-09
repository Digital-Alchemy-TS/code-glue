module.exports = function template(
	{ imports, interfaces, componentName, props, jsx },
	{ tpl },
) {
	const iconNameStr = `${componentName}Icon`
	const iconName = { type: "Identifier", name: iconNameStr }

	return tpl`
import React from "react"
import { useTheme } from "@tamagui/core"

import { TextContext } from "../../Text"

import type { SVGProps } from "react"
import type { ViewProps } from "react-native"
import type { WebIconComponentType } from "../types"

${imports}
${interfaces}

const ${iconName} = (${props}) => ${jsx}

const ${componentName}: WebIconComponentType	 = ({ size, color, style = {}, ...otherProps }) => {
  const theme = useTheme()
  const { isInText } = React.useContext(TextContext)

  const fill = color || (isInText ? theme.iconInTextColor.get() : 'black')

  const combinedStyle = {
    flexShrink: 0,
    ...style
  }

  return React.createElement(${iconName}, { ...otherProps, style: combinedStyle, width: size, height: size, fill })
}

export default ${componentName}
  `
}
