module.exports = function template(
	{ imports, interfaces, componentName, props, jsx, exports },
	{ tpl },
) {
	const iconNameStr = componentName.name + "Icon"
	const iconName = { type: "Identifier", name: iconNameStr }

	return tpl`
import * as React from 'react'
import type { SVGProps } from 'react'
import type { ViewProps } from 'react-native'
import { TextContext } from '../../../Text/TextContext'
import { useDesign } from '../../../DesignSystem'

const ${iconName} = (${props}) => ${jsx}

const ${componentName}	 = ({}: { size: number, color?: string, style?: Omit<ViewProps['style'], 'backgroundColor' | 'width' | 'height'>}) => {
  const { size, color = 'black', style = {}, ...otherProps } = props

  let fill = color

  const { variables } = useDesign()
  const { isInText } = React.useContext(TextContext)

  if (isInText) {
    style.verticalAlign = 'bottom'

    fill = variables.iconInTextColor
  }

  return React.createElement(${iconName}, { ...otherProps, style, width: size, height: size, fill })
}

export default ${componentName}
  `
}
