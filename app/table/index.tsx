import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, Alert, Dimensions, View } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useGlobalContext } from "../Context";
import { HeaderComponent } from "./components/HeaderComponent/Header";
import { MainContentComponent } from "./components/MainComponent/MainContentComponent";
import { ModalComponent } from "./components/ModalComponent/Modal";

const Table = () => {
	const { isLoading, setIsLoading, resultData, currentPage, searchingName, fetchData } =
		useGlobalContext();

	const statusBarHeight = getStatusBarHeight(); // Получение высоты статус бара
	const windowHeight = Dimensions.get("window").height; // Получение высоты контента, без учёта системных элементов

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
			<ModalComponent />
			<HeaderComponent />
			{!isLoading ? (
				<MainContentComponent />
			) : (
				<ActivityIndicator className="m-auto" size={"large"} color={"black"} />
			)}
			<StatusBar style="auto" />
		</View>
	);
};

export default Table;
