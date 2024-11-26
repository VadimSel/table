import SvgSortHeader from "@/assets/icons/svgSortHeader";
import { TouchableOpacity, View, Text } from "react-native";
import { sortFieldType } from "./MainContentComponent";
import { DataResponse } from "@/app/types";

type MainContentTitlesProps = {
  sortPressHandler: (value: sortFieldType) => void
  resultData: DataResponse[]
}

export const MainContentTitles = ({sortPressHandler, resultData}: MainContentTitlesProps) => {
	return (
		<View className="border-r">
			<View className="flex-row h-10">
				<TouchableOpacity
					onPress={() => sortPressHandler("name")}
					className="w-48 items-center gap-1 flex-row justify-center bg-gray-200"
				>
					<Text>Название</Text>
					<View className="pt-[1.9px]">
						<SvgSortHeader />
					</View>
				</TouchableOpacity>
			</View>
			<View>
				{resultData.map((el) => {
					return (
						<View key={el.mal_id} className="flex-row">
							<View className="w-48 border-b h-16 justify-center items-center px-4">
								<Text>{el.title}</Text>
							</View>
						</View>
					);
				})}
			</View>
		</View>
	);
};
