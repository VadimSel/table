import { Text, View } from "react-native";
import { FiltersModalButton } from "./FiltersModalButton";
import { FiltersModalRating } from "./FiltersModalRating";
import { FiltersModalScore } from "./FiltersModalScore";
import { FiltersModalType } from "./FiltersModalType";

export const FiltersModal = () => {
	return (
		<View
			onStartShouldSetResponder={() => true}
			className="w-80 rounded-md bg-modal items-center border"
		>
			<Text className="font-medium my-3 text-xl">Фильтрация</Text>
			<Text className="font-medium color-filterTitles">Рейтинг</Text>
			<FiltersModalScore />
			<Text className="font-medium mb-3 color-filterTitles">Тип</Text>
			<FiltersModalType />
			<Text className="font-medium mb-3 color-filterTitles">Возраст</Text>
			<FiltersModalRating />
			<FiltersModalButton />
		</View>
	);
};
