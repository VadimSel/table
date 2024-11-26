import { Text, View } from "react-native";
import { FiltersModalButton } from "./FiltersModalButton";
import { FiltersModalRating } from "./FiltersModalRating";
import { FiltersModalScore } from "./FiltersModalScore";
import { FiltersModalType } from "./FiltersModalType";

type FiltersModalProps = {
	searchingMinScore: number;
	setSearchingMinScore: (minScore: number) => void;
	searchingMaxScore: number;
	setSearchingMaxScore: (maxScore: number) => void;
	searchingType: string;
	setSearchingType: (searchingType: string) => void;
	searchingRating: string;
	setSearchingRating: (setSearchingRating: string) => void;
	fetchData: (name?: string, page?: number) => void;
	resetFilters: () => void;
};

export const FiltersModal = (props: FiltersModalProps) => {
	const {
		searchingMinScore,
		setSearchingMinScore,
		searchingMaxScore,
		setSearchingMaxScore,
		searchingType,
		setSearchingType,
		searchingRating,
		setSearchingRating,
		fetchData,
		resetFilters,
	} = props;

	return (
		<View
			onStartShouldSetResponder={() => true}
			className="w-80 rounded-md bg-white items-center border"
		>
			<Text className="font-medium my-3 text-xl">Фильтрация</Text>
			<Text className="font-medium">Рейтинг</Text>
			<FiltersModalScore
				{...{
					searchingMinScore,
					setSearchingMinScore,
					searchingMaxScore,
					setSearchingMaxScore,
				}}
			/>
			<Text className="font-medium mb-3">Тип</Text>
			<FiltersModalType
				searchingType={searchingType}
				setSearchingType={setSearchingType}
			/>
			<Text className="font-medium mb-3">Возраст</Text>
			<FiltersModalRating
				searchingRating={searchingRating}
				setSearchingRating={setSearchingRating}
			/>
			<FiltersModalButton
				{...{ searchingMinScore, searchingMaxScore, fetchData, resetFilters }}
			/>
		</View>
	);
};
