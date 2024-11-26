import { Pagination } from "@/app/types";
import SvgLeftArrow from "@/assets/icons/leftArrow";
import SvgRightArrow from "@/assets/icons/rightArrow";
import { TouchableOpacity, View } from "react-native";
import { PageCounter } from "./PageCounter";
import { PaginationButtons } from "./PaginationButtons";

type HeaderSubHeaderProps = {
	paginationData?: Pagination;
	setIsLoading: (value: boolean) => void;
	currentPage: number;
	setCurrentPage: (currentPage: number) => void;
};

export const HeaderSubHeader = (props: HeaderSubHeaderProps) => {
	const { paginationData, setIsLoading, setCurrentPage, currentPage } = props;

	return (
		<View className="border-b h-16 flex-row items-center justify-between px-4">
			<PageCounter
				paginationData={paginationData}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
			<PaginationButtons
				{...{ paginationData, setIsLoading, currentPage, setCurrentPage }}
			/>
		</View>
	);
};
