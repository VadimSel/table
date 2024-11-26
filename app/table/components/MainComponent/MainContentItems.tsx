import { DataResponse } from "@/app/types";
import SvgSortHeader from "@/assets/icons/svgSortHeader";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { sortFieldType } from "./MainContentComponent";

// ---------------- Array options ---------------- \\

const fieldHeader: { label: string; field: sortFieldType }[] = [
	{ label: "Год выхода", field: "year" },
	{ label: "Тип", field: "type" },
	{ label: "Рейтинг", field: "rating" },
	{ label: "Возраст", field: "age" },
];

type MainContentItems = {
  sortPressHandler: (value: sortFieldType) => void
  resultData: DataResponse[]
}

export const MainContentItems = ({sortPressHandler, resultData}: MainContentItems) => {
	return (
		<ScrollView horizontal>
			<View>
				<View className="flex-row h-10">
					{fieldHeader.map(({ label, field }, i) => {
						return (
							<TouchableOpacity
								key={i}
								className="w-28 flex-row gap-1 items-center justify-center bg-titles"
								onPress={() => sortPressHandler(field)}
							>
								<Text className="pl-1">{label}</Text>
								<View className="pt-[1.9px]">
									<SvgSortHeader />
								</View>
							</TouchableOpacity>
						);
					})}
				</View>
				{resultData.map((el) => {
					const fields = [
						{ value: el.year },
						{ value: el.type },
						{ value: el.score },
						{ value: el.rating },
					];

					return (
						<View key={el.mal_id} className="flex-row">
							{fields.map((item, i) => (
								<View
									key={i}
									className="w-28 border-b h-16 justify-center items-center px-4"
								>
									<Text>{item.value ?? "-"}</Text>
								</View>
							))}
						</View>
					);
				})}
			</View>
		</ScrollView>
	);
};
