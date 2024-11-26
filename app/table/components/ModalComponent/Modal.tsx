import { Modal, TouchableWithoutFeedback, View } from "react-native";
import { FiltersModal } from "./FiltersModal";
import { SearchModal } from "./SearchModal";

type ModalComponentProps = {
	isModalVisible: boolean;
	setIsModalVisible: (visible: boolean) => void;
	modalValue: string;
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

export const ModalComponent = (props: ModalComponentProps) => {
	const {
		isModalVisible,
		setIsModalVisible,
		modalValue,
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
		<Modal
			visible={isModalVisible}
			onRequestClose={() => setIsModalVisible(false)}
			transparent
			animationType="fade"
		>
			<TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
				<View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]">
					{modalValue === "search" && <SearchModal fetchData={fetchData} />}
					{modalValue === "filter" && (
						<FiltersModal
							{...{
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
							}}
						/>
					)}
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};
