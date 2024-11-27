import { useGlobalContext } from "@/app/Context";
import { Modal, TouchableWithoutFeedback, View } from "react-native";
import { FiltersModal } from "./FiltersModal";
import { SearchModal } from "./SearchModal";

export const ModalComponent = () => {
	const { isModalVisible, setIsModalVisible, modalValue } = useGlobalContext();

	return (
		<Modal
			visible={isModalVisible}
			onRequestClose={() => setIsModalVisible(false)}
			transparent
			animationType="fade"
		>
			<TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
				<View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]">
					{modalValue === "search" ? <SearchModal /> : <FiltersModal />}
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};
