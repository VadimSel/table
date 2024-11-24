import SvgFilter from "@/assets/icons/svgFilter";
import SvgLogo from "@/assets/icons/svgLogo";
import SvgSearch from "@/assets/icons/svgSearch";
import SvgSort from "@/assets/icons/svgSort";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Dimensions,
	Image,
	Modal,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { DataResponse, Pagination } from "../types";
import { getData, searchData } from "../utils/api";
import SvgRightArrow from "@/assets/icons/rightArrow";
import SvgLeftArrow from "@/assets/icons/leftArrow";

const fieldHeader = ["Год выхода", "Жанр", "Тип", "Рейтинг"];
type modalValueType = "search" | "sort" | "filter";

const Table = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [resultData, setResultData] = useState<DataResponse[]>([]);
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [modalValue, setModalValue] = useState<modalValueType>();
	const [paginationData, setPaginationData] = useState<Pagination>();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [pageValue, setPageValue] = useState("");

	const [searchingName, setSearchingName] = useState<string>("");
	const [searchingGenre, setSearchingGenre] = useState<number>(0);
	const [searchingType, setSearchingType] = useState<string>("");
	const [searchingRating, setSearchingRating] = useState<string>("");

	const statusBarHeight = getStatusBarHeight(); // Получение высоты статус бара
	const windowHeight = Dimensions.get("window").height; // Получение высоты контента, без учёта системных элементов

	function fetchData(
		name: string = searchingName,
		page: number = currentPage,
		genre: number = searchingGenre,
		type: string = searchingType,
		rating: string = searchingRating
	) {
		setSearchingName(name);

		if (isLoading) return;

		setIsLoading(true);

		getData(name, page, genre, type, rating).then((data) => {
			if (data) {
				setResultData(data.data);
				setPaginationData(data.pagination);
				setCurrentPage(data.pagination.current_page);
				setIsModalVisible(false);
				setIsLoading(false);
			}
		});
	}

	// function searchHandler(word: string) {
	// 	setIsLoading(true);
	// 	searchData(word).then((res) => {
	// 		if (res && res.length > 0) {
	// 			setResultData(res);
	// 			setIsModalVisible(false);
	// 			setIsLoading(false);
	// 		} else {
	// 			Alert.alert("Не найдено");
	// 			setIsLoading(false);
	// 		}
	// 		setIsLoading(false);
	// 	});
	// }

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
			if (number > 0 && number <= Number(paginationData?.last_visible_page)) {
				setPageValue(value);
			}
		},

		onSubmitEditing(value: string) {
			const number = Number(value);
			if (number <= 0) {
				Alert.alert("Введите число");
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
		} else if (value === "sort") {
			setModalValue("sort");
		} else {
			setModalValue("filter");
		}
	}

	const filtersHandler = {

	}

	useEffect(() => {
		setIsLoading(true);
		fetchData();
	}, [currentPage]);

	console.log(paginationData);

	// Так как NativeWind не поддерживает динамические значения, для корректного отображения контента (без наезда на системные элементы) используются инлайновые стили в родительском теге

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
								<Text className="mt-10 -mb-10 font-medium">Поиск</Text>
								<TextInput
									className="h-9 w-52 py-0 border rounded-sm my-auto"
									onSubmitEditing={(e) => fetchData(e.nativeEvent.text)}
								/>
							</View>
						)}
						{modalValue === "sort" && (
							<View
								onStartShouldSetResponder={() => true}
								className="w-72 h-56 rounded-md bg-white items-center border"
							>
								<Text className="mt-10 -mb-10 font-medium">Сортировка</Text>
								<TextInput
									className="h-9 w-52 py-0 border rounded-sm my-auto"
									onSubmitEditing={(e) => fetchData(e.nativeEvent.text)}
								/>
							</View>
						)}
						{modalValue === "filter" && (
							<View
								onStartShouldSetResponder={() => true}
								className="w-72 h-56 rounded-md bg-white items-center border"
							>
								<Text className="mt-10 -mb-10 font-medium">Фильтры</Text>
								<TextInput
									className="h-9 w-14 py-0 border rounded-sm my-auto text-center"
									keyboardType="numeric"
									onSubmitEditing={(e) => {}}
								/>
							</View>
						)}
					</View>
				</TouchableWithoutFeedback>
			</Modal>
			<View>
				<View className="border-b flex-row justify-between items-center px-4">
					<TouchableOpacity
						onPress={() => {
							fetchData("", 1);
						}}
					>
						<SvgLogo />
					</TouchableOpacity>
					{isLoading && (
						<ActivityIndicator className="m-auto" size={"large"} color={"cyan"} />
					)}
					<View className="flex-row gap-6">
						<TouchableOpacity onPress={() => openModalHandler("search")}>
							<SvgSearch />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => openModalHandler("sort")}>
							<SvgSort />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => openModalHandler("filter")}>
							<SvgFilter />
						</TouchableOpacity>
					</View>
				</View>
				{/* <View className="border-b flex-row justify-between py-5 items-center px-4">
					<Text className="font-medium">Показывать по 10</Text>
					<Text>1-10 из 150</Text>
				</View> */}
				<View className="border-b h-16 flex-row items-center justify-between px-4">
					<View className="flex-row items-center gap-2">
						<Text>Страница:</Text>
						<TextInput
							className="h-9 w-12 py-0 border rounded-md text-center"
							placeholder={`${currentPage}`}
							value={pageValue}
							onChangeText={(number) =>
								changePageValueHandler.onChangeTextHandler(number)
							}
							keyboardType="numeric"
							onSubmitEditing={(e) => {
								changePageValueHandler.onSubmitEditing(e.nativeEvent.text);
							}}
						/>
						<Text>из {paginationData?.last_visible_page}</Text>
					</View>
					<View className="flex-row gap-5">
						<Pressable
							onPress={() => changeCurrentPage("back")}
							className="items-center justify-center size-11 border rounded-md pr-1"
						>
							<SvgLeftArrow />
						</Pressable>
						<Pressable
							onPress={() => changeCurrentPage("next")}
							className="items-center justify-center size-11 border rounded-md"
						>
							<SvgRightArrow />
						</Pressable>
					</View>
				</View>
			</View>
			{!isLoading && (
				// <ScrollView>
				// 	{resultData?.map((el) => {
				// 		return (
				// 			<View key={el.mal_id} className="flex-row justify-between px-4">
				// 				<View className="w-40 h-60">
				// 					<Image
				// 						source={{ uri: el.images.webp.image_url }}
				// 						className="w-full h-full"
				// 						resizeMode="cover"
				// 					/>
				// 				</View>
				// 				<View className="border w-56">
				// 					<Text className="text-blue-400">{el.title}</Text>
				// 					<Text>{el.title_english}</Text>
				// 					<Text>{el.year}</Text>
				// 					<Text>{el.type}</Text>
				// 					<Text>{el.genres.map((genre) => genre.name).join(", ")}</Text>
				// 				</View>
				// 			</View>
				// 		);
				// 	})}
				// </ScrollView>

				<View>
					<View className="flex-row">
						<ScrollView>
							<View className="flex-row">
								<View className="border-r">
									<View className="flex-row h-10">
										<View className="w-48 items-center justify-center bg-gray-200">
											<Text>Название</Text>
										</View>
									</View>
									<View>
										{resultData.map((el) => {
											return (
												<View key={el.mal_id} className="flex-row">
													<View className="w-48 border-b h-10 justify-center items-center px-4">
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
											{fieldHeader.map((item, i) => {
												return (
													<View
														key={i}
														className="w-24 items-center justify-center bg-gray-200"
													>
														<Text>{item}</Text>
													</View>
												);
											})}
											{/* <View className="w-24 items-center justify-center bg-gray-200">
												<Text>Год выхода</Text>
											</View>
											<View className="w-24 items-center justify-center bg-gray-200">
												<Text>Жанр</Text>
											</View>
											<View className="w-24 items-center justify-center bg-gray-200">
												<Text>Тип</Text>
											</View>
											<View className="w-24 items-center justify-center bg-gray-200">
												<Text>Рейтинг</Text>
											</View> */}
										</View>
										{resultData.map((el) => {
											const fields = [
												{ value: el.year },
												{ value: el.genres[0].name },
												{ value: el.type },
												{ value: el.score },
											];

											return (
												<View key={el.mal_id} className="flex-row">
													{fields.map((item, i) => (
														<View
															key={i}
															className="w-24 border-b h-10 justify-center items-center px-4"
														>
															<Text>{item.value}</Text>
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
					{/* <View className="w-20 border-r">
						<View className="border-b h-10 items-center bg-gray-200">
							<Text>Год выхода</Text>
						</View>
						{resultData.map((el) => {
							return (
								<View key={el.mal_id} className="border-b h-10 justify-center px-4">
									<Text>{el.year}</Text>
								</View>
							);
						})}
					</View> */}
				</View>
			)}
			<StatusBar style="auto" />
			{/* <StatusBar barStyle={"default"} animated/> */}
		</View>
	);
};

export default Table;
