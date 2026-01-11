import { Row } from "../View"

export const ButtonRow = ({ children }: { children: React.ReactNode }) => {
	return (
		<Row between={"$betweenButtons"} noShrink>
			{children}
		</Row>
	)
}
