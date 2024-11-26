import SvgLeftArrow from "@/assets/icons/leftArrow";
import SvgRightArrow from "@/assets/icons/rightArrow";
import SvgFilter from "@/assets/icons/svgFilter";
import SvgLogo from "@/assets/icons/svgLogo";
import SvgSearch from "@/assets/icons/svgSearch";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Dimensions,
	Modal,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { DataResponse, Pagination } from "../types";
import { getData } from "../utils/api";
import svgSortHeader from "@/assets/icons/svgSortHeader";
import SvgSortHeader from "@/assets/icons/svgSortHeader";

const fieldHeader: { label: string; field: sortFieldType }[] = [
	{ label: "Год выхода", field: "year" },
	{ label: "Тип", field: "type" },
	{ label: "Рейтинг", field: "rating" },
	{ label: "Возраст", field: "age" },
];
const typeOptions = [
	{ label: "tv", option: "TV" },
	{ label: "movie", option: "Movie" },
	{ label: "ova", option: "OVA" },
	{ label: "special", option: "Special" },
	{ label: "ona", option: "ONA" },
	{ label: "music", option: "Music" },
	{ label: "cm", option: "CM" },
	{ label: "pv", option: "PV" },
	{ label: "tv_special", option: "TV Special" },
];
const ratingOptions = [
	{ label: "g", option: "G" },
	{ label: "pg", option: "PG" },
	{ label: "pg13", option: "PG-13" },
	{ label: "r17", option: "R" },
	{ label: "r", option: "R+" },
	{ label: "rx", option: "Rx" },
];

type modalValueType = "search" | "filter";
type sortFieldType = "year" | "type" | "rating" | "age" | "name";

const Table = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [resultData, setResultData] = useState<DataResponse[]>([]);
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [modalValue, setModalValue] = useState<modalValueType>();
	const [paginationData, setPaginationData] = useState<Pagination>();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [pageValue, setPageValue] = useState("");

	const [searchingName, setSearchingName] = useState<string>("");
	const [searchingMinScore, setSearchingMinScore] = useState<number>(0);
	const [searchingMaxScore, setSearchingMaxScore] = useState<number>(10);
	const [searchingType, setSearchingType] = useState<string>("");
	const [searchingRating, setSearchingRating] = useState<string>("");

	const [sortField, setSortField] = useState<sortFieldType | null>(null);
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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
					`Доступный диапозон страниц от 1 до ${paginationData?.last_visible_page}`
				);
				setPageValue("");
			} else {
				setCurrentPage(number);
				setPageValue("");
			}
		},
	};

	// ---------------- Modal ---------------- \\

	function openModalHandler(value: modalValueType) {
		setIsModalVisible(true);

		if (value === "search") {
			setModalValue("search");
		} else {
			setModalValue("filter");
		}
	}

	// ---------------- Sort ---------------- \\

	function sortPressHandler(field: sortFieldType) {
		setSortField(field);
		setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		sort(field, sortOrder);
	}
	console.log("Sort Order", sortOrder);
	console.log("Sort Field", sortField);

	function sort(sortField: sortFieldType, sortOrder: any) {
		switch (sortField) {
			case "year":
				setResultData(
					[...resultData].sort((a, b) =>
						sortOrder === "desc" ? b.year - a.year : a.year - b.year
					)
				);
				break;
			case "type":
				setResultData(
					[...resultData].sort((a, b) =>
						sortOrder === "desc" ? (b.type > a.type ? 1 : -1) : a.type > b.type ? 1 : -1
					)
				);
				break;
			case "rating":
				setResultData(
					[...resultData].sort((a, b) =>
						sortOrder === "desc"
							? b.score > a.score
								? 1
								: -1
							: a.score > b.score
							? 1
							: -1
					)
				);
				break;
			case "age":
				setResultData(
					[...resultData].sort((a, b) =>
						sortOrder === "desc"
							? b.rating > a.rating
								? 1
								: -1
							: a.rating > b.rating
							? 1
							: -1
					)
				);
				break;
			case "name":
				setResultData(
					[...resultData].sort((a, b) =>
						sortOrder === "desc"
							? b.title > a.title
								? 1
								: -1
							: a.title > b.title
							? 1
							: -1
					)
				);
				break;
		}
	}

	// ---------------- Filters ---------------- \\

	function resetFilters() {
		fetchData("", 1, 0, 10, "", "");
		setSearchingType("");
		setSearchingRating("");
		setSearchingMinScore(0);
		setSearchingMaxScore(10);
	}

	function findHandler() {
		if (searchingMinScore > searchingMaxScore) {
			Alert.alert("Ошибка", "Минимальное число, не может быть больше максимального");
		} else {
			fetchData();
		}
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

	console.log(
		"type: ",
		searchingType,
		"rating: ",
		searchingRating,
		"minScore: ",
		searchingMinScore,
		"maxScore: ",
		searchingMaxScore
	);

	// Так как NativeWind не поддерживает вычисляемые значения, для корректного отображения контента (без наезда на системные элементы) используются инлайновые стили в родительском теге.

	return (
		// <View style={{ height: windowHeight - statusBarHeight, paddingTop: statusBarHeight }}>
		<View
			style={{
				height: windowHeight - statusBarHeight * 2.31,
				paddingTop: statusBarHeight,
			}}
		>
			<Modal
				visible={isModalVisible}
				onRequestClose={() => setIsModalVisible(false)}
				transparent
				animationType="fade"
			>
				<TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
					<View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]">
						{modalValue === "search" && (
							<View
								onStartShouldSetResponder={() => true}
								className="w-72 h-56 rounded-md bg-white items-center border"
							>
								<Text className="mt-10 -mb-10 font-medium text-lg">Поиск по названию</Text>
								<TextInput
									className="h-9 w-52 py-0 border rounded-sm my-auto"
									onSubmitEditing={(e) => fetchData(e.nativeEvent.text, 1)}
								/>
							</View>
						)}
						{modalValue === "filter" && (
							<View
								onStartShouldSetResponder={() => true}
								className="w-80 rounded-md bg-white items-center border"
							>
								<Text className="font-medium my-3 text-xl">Фильтрация</Text>
								<Text className="font-medium">Рейтинг</Text>
								<View className="flex-row justify-between w-40 mb-6">
									<View className="items-center">
										<Text>От</Text>
										<TextInput
											className="h-9 w-14 py-0 rounded-sm border text-center"
											keyboardType="numeric"
											value={String(searchingMinScore)}
											onChangeText={(e) =>
												setSearchingMinScore(
													Math.max(0, Math.min(Number(e), searchingMaxScore))
												)
											}
										/>
									</View>
									<View className="items-center">
										<Text>До</Text>
										<TextInput
											className="h-9 w-14 py-0 rounded-sm border text-center"
											keyboardType="numeric"
											value={String(searchingMaxScore)}
											onChangeText={(e) => {
												setSearchingMaxScore(Math.max(0, Math.min(Number(e), 10)));
											}}
										/>
									</View>
								</View>
								<Text className="font-medium mb-3">Тип</Text>
								<View className="h-28 w-72 border rounded-md flex-row items-center justify-center flex-wrap mb-6">
									{typeOptions.map(({ label, option }) => (
										<TouchableOpacity
											key={label}
											onPress={() => setSearchingType(label)}
											className="w-1/3 h-1/3"
										>
											<Text
												className={`text-lg text-center ${
													searchingType === label && `color-blue-700`
												}`}
											>
												{option}
											</Text>
										</TouchableOpacity>
									))}
								</View>
								<Text className="font-medium mb-3">Возраст</Text>
								<View className="h-16 w-72 border rounded-md flex-row items-center justify-evenly mb-11">
									{ratingOptions.map(({ label, option }) => (
										<TouchableOpacity
											key={label}
											onPress={() => setSearchingRating(label)}
										>
											<Text
												className={`text-lg text-center ${
													searchingRating === label && `color-blue-700`
												}`}
											>
												{option}
											</Text>
										</TouchableOpacity>
									))}
								</View>

								<TouchableOpacity
									onPress={() => findHandler()}
									className="w-72 h-12 rounded-sm border-2 border-green-600 justify-center items-center mb-3"
								>
									<Text className="color-green-600">Найти</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => resetFilters()}
									className="w-72 h-12 rounded-sm border-2 border-red-600 justify-center items-center mb-6"
								>
									<Text className="color-red-600">Сбросить фильтры</Text>
								</TouchableOpacity>
							</View>
						)}
					</View>
				</TouchableWithoutFeedback>
			</Modal>
			<View>
				<View className="border-b flex-row justify-between items-center px-4">
					<TouchableOpacity onPress={() => resetFilters()}>
						<SvgLogo />
					</TouchableOpacity>
					{/* {isLoading && (
						<ActivityIndicator className="m-auto" size={"large"} color={"cyan"} />
					)} */}
					<View className="flex-row gap-6">
						<TouchableOpacity onPress={() => openModalHandler("search")}>
							<SvgSearch />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => openModalHandler("filter")}>
							<SvgFilter />
						</TouchableOpacity>
					</View>
				</View>
				<View className="border-b h-16 flex-row items-center justify-between px-4">
					<View className="flex-row items-center gap-2">
						<Text>Страница:</Text>
						<TextInput
							className="h-9 w-12 py-0 border rounded-md text-center"
							value={pageValue || String(currentPage)}
							onChangeText={(number) =>
								changePageValueHandler.onChangeTextHandler(
									String(
										Math.max(
											0,
											Math.min(Number(number), paginationData!.last_visible_page)
										)
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
				</View>
			</View>
			{!isLoading ? (
				<View>
					<View className="flex-row">
						<ScrollView>
							<View className="flex-row">
								<View className="border-r">
									<View className="flex-row h-10">
										<TouchableOpacity
											onPress={() => sortPressHandler("name")}
											className="w-48 items-center gap-1 flex-row justify-center bg-gray-200"
										>
											<Text>Название</Text>
											<View className="pt-[1.9px]">
												<SvgSortHeader />
											</View>
										</TouchableOpacity>
									</View>
									<View>
										{resultData.map((el) => {
											return (
												<View key={el.mal_id} className="flex-row">
													<View className="w-48 border-b h-16 justify-center items-center px-4">
														<Text>{el.title}</Text>
													</View>
												</View>
											);
										})}
									</View>
								</View>

								<ScrollView horizontal>
									<View>
										<View className="flex-row h-10">
											{fieldHeader.map(({ label, field }, i) => {
												return (
													<TouchableOpacity
														key={i}
														className="w-28 flex-row gap-1 items-center justify-center bg-gray-200"
														onPress={() => sortPressHandler(field)}
													>
														<Text className="pl-1">{label}</Text>
														<View className="pt-[1.9px]">
															<SvgSortHeader />
														</View>
													</TouchableOpacity>
												);
											})}
										</View>
										{resultData.map((el) => {
											const fields = [
												{ value: el.year },
												{ value: el.type },
												{ value: el.score },
												{ value: el.rating },
											];

											return (
												<View key={el.mal_id} className="flex-row">
													{fields.map((item, i) => (
														<View
															key={i}
															className="w-28 border-b h-16 justify-center items-center px-4"
														>
															<Text>{item.value ?? "-"}</Text>
														</View>
													))}
												</View>
											);
										})}
									</View>
								</ScrollView>
							</View>
						</ScrollView>
					</View>
				</View>
			) : (
				<ActivityIndicator className="m-auto" size={"large"} color={"black"} />
			)}
			<StatusBar style="auto" />
			{/* <StatusBar barStyle={"default"} animated/> */}
		</View>
	);
};

export default Table;
