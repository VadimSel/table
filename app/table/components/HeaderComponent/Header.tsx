import { View } from "react-native";
import { HeaderMainHeader } from "./HeaderMainHeader";
import { HeaderSubHeader } from "./HeaderSubHeader";

export const HeaderComponent = () => {
	return (
		<View>
			<HeaderMainHeader />
			<HeaderSubHeader />
		</View>
	);
};
