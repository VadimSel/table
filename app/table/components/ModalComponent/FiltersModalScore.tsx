import { Text, TextInput, View } from "react-native";

type FiltersModalScoreType = {
	searchingMinScore: number;
	setSearchingMinScore: (minScore: number) => void;
	searchingMaxScore: number;
	setSearchingMaxScore: (maxScore: number) => void;
};

export const FiltersModalScore = (props: FiltersModalScoreType) => {
	const {
		searchingMinScore,
		setSearchingMinScore,
		searchingMaxScore,
		setSearchingMaxScore,
	} = props;

	return (
		<View className="flex-row justify-between w-40 mb-6">
			<View className="items-center">
				<Text>От</Text>
				<TextInput
					className="h-9 w-14 py-0 rounded-sm border text-center"
					keyboardType="numeric"
					value={String(searchingMinScore)}
					onChangeText={(e) =>
						setSearchingMinScore(Math.max(0, Math.min(Number(e), searchingMaxScore)))
					}
				/>
			</View>
			<View className="items-center">
				<Text>До</Text>
				<TextInput
					className="h-9 w-14 py-0 rounded-sm border text-center"
					keyboardType="numeric"
					value={String(searchingMaxScore)}
					onChangeText={(e) => {
						setSearchingMaxScore(Math.max(0, Math.min(Number(e), 10)));
					}}
				/>
			</View>
		</View>
	);
};
