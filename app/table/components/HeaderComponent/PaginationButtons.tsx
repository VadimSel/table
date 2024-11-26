import { Pagination } from "@/app/types";
import SvgLeftArrow from "@/assets/icons/leftArrow";
import SvgRightArrow from "@/assets/icons/rightArrow";
import { TouchableOpacity, View } from "react-native";

type PaginationButtonsProps = {
  paginationData?: Pagination;
  setIsLoading: (value: boolean) => void;
  currentPage: number;
	setCurrentPage: (currentPage: number) => void;
}

export const PaginationButtons = (props: PaginationButtonsProps) => {
  const { paginationData, setIsLoading, setCurrentPage, currentPage } = props;

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
