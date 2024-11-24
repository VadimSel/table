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

const Table = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [resultData, setResultData] = useState<DataResponse[]>([]);
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [paginationData, setPaginationData] = useState<Pagination>();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [pageValue, setPageValue] = useState("");

	const statusBarHeight = getStatusBarHeight(); // Получение высоты статус бара
	const windowHeight = Dimensions.get("window").height; // Получение высоты контента, без учёта системных элементов

	function fetchData(word: string = "", page: number = currentPage) {
		getData(word, page).then((data) => {
			if (data) {
				setResultData(data.data);
				setPaginationData(data.pagination);
				setCurrentPage(data.pagination.current_page);
				setIsLoading(false);
			}
		});
	}

	function searchHandler(word: string) {
		setIsLoading(true);
		searchData(word).then((res) => {
			if (res && res.length > 0) {
				setResultData(res);
				setIsModalVisible(false);
				setIsLoading(false);
			} else {
				Alert.alert("Не найдено");
				setIsLoading(false);
			}
			setIsLoading(false);
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
	}

	const changePageValueHandler = {
		onChangeTextHandler(value: string) {
			const number = Number(value)
			if (number > 0 && number <= Number(paginationData?.last_visible_page)) {
				setPageValue(value)
			}
		},

		onSubmitEditing(value: string) {
			const number = Number(value)
			if (number <= 0) {
				Alert.alert("Введите число");
			} else {
				setCurrentPage(number);
				setPageValue("");
			}
		}
	}

	useEffect(() => {
		setIsLoading(true);
		fetchData();
	}, [currentPage]);

	console.log(paginationData);

	// Так как NativeWind не поддерживает динамические значения, для корректного отображения контента (без наезда на системные элементы) используются инлайновые стили в родительском теге

	return (
		<View style={{ height: windowHeight + statusBarHeight, paddingTop: statusBarHeight }}>
			<Modal
				visible={isModalVisible}
				onRequestClose={() => setIsModalVisible(false)}
				transparent
				animationType="fade"
			>
				<TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
					<View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]">
						<View
							onStartShouldSetResponder={() => true}
							className="w-72 h-56 rounded-md bg-white items-center border"
						>
							<Text className="mt-10 -mb-10 font-medium">Поиск</Text>
							<TextInput
								className="h-9 w-52 py-0 border rounded-sm my-auto"
								onSubmitEditing={(e) => searchHandler(e.nativeEvent.text)}
							/>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
			<View>
				<View className="border-b flex-row justify-between items-center px-4">
					<TouchableOpacity
						onPress={() => {
							setCurrentPage(1);
						}}
					>
						<SvgLogo />
					</TouchableOpacity>
					{isLoading && (
						<ActivityIndicator className="m-auto" size={"large"} color={"cyan"} />
					)}
					<View className="flex-row gap-6">
						<TouchableOpacity onPress={() => setIsModalVisible(true)}>
							<SvgSearch />
						</TouchableOpacity>
						<SvgSort />
						<SvgFilter />
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
							// onChangeText={(number) => onChangeTextHandler(number)}
							onChangeText={(number) => changePageValueHandler.onChangeTextHandler(number)}
							// onChangeText={(number) => {
							// 	if ((Number(number) > 0 && Number(number) <= Number(paginationData?.last_visible_page)) || number === "") {
							// 		setPageValue(number);
							// 	}
							// }}
							keyboardType="numeric"
							onSubmitEditing={(e) => {
								if (Number(e.nativeEvent.text) <= 0) {
									Alert.alert("Введите число");
								} else {
									setCurrentPage(Number(pageValue));
									setPageValue("");
								}
							}}
						/>
						<Text>из {paginationData?.last_visible_page}</Text>
					</View>
					<View className="flex-row gap-5">
						<Pressable
							onPress={() => changeCurrentPage("back")}
							className="items-center justify-center size-11 border rounded-md"
						>
							<Text>L</Text>
						</Pressable>
						<Pressable
							onPress={() => changeCurrentPage("next")}
							className="items-center justify-center size-11 border rounded-md"
						>
							<Text>R</Text>
						</Pressable>
					</View>
				</View>
			</View>
			{!isLoading && (
				<ScrollView>
					{resultData?.map((el) => {
						return (
							<View key={el.mal_id} className="flex-row justify-between px-4">
								<View className="w-40 h-60">
									<Image
										source={{ uri: el.images.webp.image_url }}
										className="w-full h-full"
										resizeMode="cover"
									/>
								</View>
								<View className="border w-56">
									<Text className="text-blue-400">{el.title}</Text>
									<Text>{el.title_english}</Text>
									<Text>{el.year}</Text>
									<Text>{el.type}</Text>
									<Text>{el.genres.map((genre) => genre.name).join(", ")}</Text>
								</View>
							</View>
						);
					})}
				</ScrollView>
			)}S
			<StatusBar style="auto" />
			{/* <StatusBar barStyle={"default"} animated/> */}
		</View>
	);
};

export default Table;
