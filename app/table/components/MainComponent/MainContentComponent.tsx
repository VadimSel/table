import { ScrollView, View } from "react-native";
import { MainContentItems } from "./MainContentItems";
import { MainContentTitles } from "./MainContentTitles";

export const MainContentComponent = () => {
	return (
		<View className="flex-row bg-background">
			<ScrollView>
				<View className="flex-row">
					<MainContentTitles />
					<MainContentItems />
				</View>
			</ScrollView>
		</View>
	);
};
