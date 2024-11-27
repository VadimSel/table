import { modalValueType, useGlobalContext } from "@/app/Context";
import SvgFilter from "@/assets/icons/svgFilter";
import SvgLogo from "@/assets/icons/svgLogo";
import SvgSearch from "@/assets/icons/svgSearch";
import { TouchableOpacity, View } from "react-native";

export const HeaderMainHeader = () => {
	const { setIsModalVisible, setModalValue, resetFilters } = useGlobalContext();

	function openModalHandler(value: modalValueType) {
		setIsModalVisible(true);

		if (value === "search") {
			setModalValue("search");
		} else {
			setModalValue("filter");
		}
	}

	return (
		<View className="border-b flex-row justify-between items-center px-4 bg-background">
			<TouchableOpacity onPress={() => resetFilters()}>
				<SvgLogo />
			</TouchableOpacity>
			<View className="flex-row gap-6">
				<TouchableOpacity onPress={() => openModalHandler("search")}>
					<SvgSearch />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => openModalHandler("filter")}>
					<SvgFilter />
				</TouchableOpacity>
			</View>
		</View>
	);
};
