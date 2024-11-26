import { Pagination } from "@/app/types";
import { View } from "react-native";
import { modalValueType } from "../..";
import { HeaderMainHeader } from "./HeaderMainHeader";
import { HeaderSubHeader } from "./HeaderSubHeader";

type HeaderComponentProps = {
	resetFilters: () => void;
	currentPage: number;
	setCurrentPage: (currentPage: number) => void;
	paginationData?: Pagination;
  setIsModalVisible: (value: boolean) => void
  setModalValue: (value: modalValueType) => void
  setIsLoading: (value: boolean) => void
};

export const HeaderComponent = (props: HeaderComponentProps) => {
	const { resetFilters, currentPage, setCurrentPage, paginationData, setIsModalVisible, setModalValue, setIsLoading } = props;

	return (
		<View>
			<HeaderMainHeader
				resetFilters={resetFilters}
				setIsModalVisible={setIsModalVisible}
				setModalValue={setModalValue}
			/>
			<HeaderSubHeader
				{...{
					paginationData,
					setIsLoading,
					currentPage,
					setCurrentPage
				}}
			/>
		</View>
	);
};
