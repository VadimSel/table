import { View } from "react-native";
import { PageCounter } from "./PageCounter";
import { PaginationButtons } from "./PaginationButtons";

export const HeaderSubHeader = () => {

	return (
		<View className="border-b h-16 flex-row items-center justify-between px-4 bg-background">
			<PageCounter />
			<PaginationButtons />
		</View>
	);
};
