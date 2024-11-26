import { View, Text, TextInput } from "react-native";

type SearchModalProps = {
	fetchData: (name: string, page: number) => void;
};

export const SearchModal = ({ fetchData }: SearchModalProps) => {
	return (
		<View
			onStartShouldSetResponder={() => true}
			className="w-72 h-56 rounded-md bg-modal items-center border"
		>
			<Text className="mt-10 -mb-10 font-medium text-lg">Поиск по названию</Text>
			<TextInput
				className="h-9 w-52 py-0 border rounded-sm my-auto"
				onSubmitEditing={(e) => fetchData(e.nativeEvent.text, 1)}
			/>
		</View>
	);
};
