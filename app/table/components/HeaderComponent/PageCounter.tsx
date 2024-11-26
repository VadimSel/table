import { Pagination } from "@/app/types";
import { useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

type PageCounter = {
  paginationData?: Pagination;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}

export const PageCounter = ({paginationData, currentPage, setCurrentPage}: PageCounter) => {

  const [pageValue, setPageValue] = useState("");

  const changePageValueHandler = {
		onChangeTextHandler(value: string) {
			const number = Number(value);
			if (number <= Number(paginationData?.last_visible_page)) {
				setPageValue(value);
			} else if (number <= 0) {
				Alert.alert(
					"Ошибка",
					`Число должно быть от 0, до ${paginationData?.last_visible_page}`
				);
				
			}
		},

		onSubmitEditing(value: string) {
			const number = Math.max(
				0,
				Math.min(Number(value), paginationData!.last_visible_page)
			);
			if (number < 1) {
				Alert.alert(
					"Ошибка",
					`Доступный диапазон страниц от 1 до ${paginationData?.last_visible_page}`
				);
				
				setPageValue("");
			} else {
				setCurrentPage(number);
				setPageValue("");
			}
		},
	};

	return (
		<View className="flex-row items-center gap-2">
			<Text>Страница:</Text>
			<TextInput
				className="h-9 w-12 py-0 border rounded-md text-center"
				value={pageValue || String(currentPage)}
				onChangeText={(number) =>
					changePageValueHandler.onChangeTextHandler(
						String(
							Math.max(0, Math.min(Number(number), paginationData!.last_visible_page))
						)
					)
				}
				keyboardType="numeric"
				onSubmitEditing={(e) => {
					changePageValueHandler.onSubmitEditing(e.nativeEvent.text);
				}}
			/>
			<Text>из {paginationData?.last_visible_page}</Text>
		</View>
	);
};
