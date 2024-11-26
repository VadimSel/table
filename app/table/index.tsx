import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Dimensions,
	View
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { DataResponse, Pagination } from "../types";
import { getData } from "../utils/api";
import { HeaderComponent } from "./components/HeaderComponent/Header";
import { MainContentComponent } from "./components/MainComponent/MainContentComponent";
import { ModalComponent } from "./components/ModalComponent/Modal";

export type modalValueType = "search" | "filter";

const Table = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [resultData, setResultData] = useState<DataResponse[]>([]);
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [modalValue, setModalValue] = useState<modalValueType>("search");
	const [paginationData, setPaginationData] = useState<Pagination | undefined>();
	const [currentPage, setCurrentPage] = useState<number>(1);

	const [searchingName, setSearchingName] = useState<string>("");
	const [searchingMinScore, setSearchingMinScore] = useState<number>(0);
	const [searchingMaxScore, setSearchingMaxScore] = useState<number>(10);
	const [searchingType, setSearchingType] = useState<string>("");
	const [searchingRating, setSearchingRating] = useState<string>("");

	const statusBarHeight = getStatusBarHeight(); // Получение высоты статус бара
	const windowHeight = Dimensions.get("window").height; // Получение высоты контента, без учёта системных элементов

	function fetchData(
		name: string = searchingName,
		page: number = currentPage,
		minScore: number = searchingMinScore,
		maxScore: number = searchingMaxScore,
		type: string = searchingType,
		rating: string = searchingRating
	) {
		setIsModalVisible(false);
		setSearchingName(name);

		if (isLoading) return;

		setIsLoading(true);

		getData(name, page, minScore, maxScore, type, rating).then((data) => {
			if (data) {
				setResultData(data.data);
				setPaginationData(data.pagination);
				setCurrentPage(data.pagination.current_page);

				setIsLoading(false);
			}
		});
	}

	function resetFilters() {
		fetchData("", 1, 0, 10, "", "");
		setSearchingType("");
		setSearchingRating("");
		setSearchingMinScore(0);
		setSearchingMaxScore(10);
	}

	useEffect(() => {
		setIsLoading(true);
		fetchData();
	}, [currentPage]);

	useEffect(() => {
		if (resultData.length === 0 && searchingName) {
			Alert.alert("", "С такими фильтрами результатов нет");
		}
	}, [resultData]);

	// Так как NativeWind не поддерживает вычисляемые значения, для корректного отображения контента (без наезда на системные элементы) используются инлайновые стили в родительском теге.

	return (
		<View
			style={{
				height: windowHeight - statusBarHeight * 2.31,
				paddingTop: statusBarHeight,
			}}
		>
			<ModalComponent
				{...{
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
				}}
			/>

			<HeaderComponent
				{...{
					resetFilters,
					currentPage,
					setCurrentPage,
					paginationData,
					setIsModalVisible,
					setModalValue,
					setIsLoading
				}}
			/>

			{!isLoading ? (
					<MainContentComponent
					resultData={resultData}
					setResultData={setResultData}
					/>
			) : (
				<ActivityIndicator className="m-auto" size={"large"} color={"black"} />
			)}
			<StatusBar style="auto" />
		</View>
	);
};

export default Table;
