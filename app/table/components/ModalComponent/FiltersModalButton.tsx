import { Alert, Text, TouchableOpacity } from "react-native";

type FiltersModalButtonProps = {
	searchingMinScore: number;
	searchingMaxScore: number;
	fetchData: (name?: string, page?: number) => void;
	resetFilters: () => void;
};

export const FiltersModalButton = (props: FiltersModalButtonProps) => {
	const { searchingMinScore, searchingMaxScore, fetchData, resetFilters } = props;

	function findHandler() {
		if (searchingMinScore > searchingMaxScore) {
			Alert.alert("Ошибка", "Минимальное число, не может быть больше максимального");
		} else {
			fetchData();
		}
	}

	return (
		<>
			<TouchableOpacity
				onPress={() => findHandler()}
				className="w-72 h-12 rounded-sm border-2 border-allow justify-center items-center mb-3"
			>
				<Text className="color-allow">Найти</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => resetFilters()}
				className="w-72 h-12 rounded-sm border-2 border-red-600 justify-center items-center mb-6"
			>
				<Text className="color-red-600">Сбросить фильтры</Text>
			</TouchableOpacity>
		</>
	);
};
