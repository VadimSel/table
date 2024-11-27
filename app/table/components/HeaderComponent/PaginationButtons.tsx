import { useGlobalContext } from "@/app/Context";
import SvgLeftArrow from "@/assets/icons/leftArrow";
import SvgRightArrow from "@/assets/icons/rightArrow";
import { TouchableOpacity, View } from "react-native";

export const PaginationButtons = () => {
  const { paginationData, setIsLoading, setCurrentPage, currentPage } = useGlobalContext();

  function changeCurrentPage(action: string) {
		if (action === "next" && paginationData?.has_next_page) {
			setIsLoading(true);
			setCurrentPage(currentPage + 1);
		} else if (action === "back" && currentPage > 1) {
			setIsLoading(true);
			setCurrentPage(currentPage - 1);
		}
		setIsLoading(false);
	}

	return (
		<View className="flex-row gap-5">
			<TouchableOpacity
				onPress={() => changeCurrentPage("back")}
				className="items-center justify-center size-11 border rounded-md pr-1"
			>
				<SvgLeftArrow />
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => changeCurrentPage("next")}
				className="items-center justify-center size-11 border rounded-md"
			>
				<SvgRightArrow />
			</TouchableOpacity>
		</View>
	);
};
