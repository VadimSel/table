import { Text, TouchableOpacity, View } from "react-native";

// ---------------- Array options ---------------- \\

const ratingOptions = [
	{ label: "g", option: "G" },
	{ label: "pg", option: "PG" },
	{ label: "pg13", option: "PG-13" },
	{ label: "r17", option: "R" },
	{ label: "r", option: "R+" },
	{ label: "rx", option: "Rx" },
];

// ---------------- Types ---------------- \\

type FiltersModalRatingProps = {
	searchingRating: string;
	setSearchingRating: (setSearchingRating: string) => void;
};

export const FiltersModalRating = ({
	searchingRating,
	setSearchingRating,
}: FiltersModalRatingProps) => {
	return (
		<View className="h-16 w-72 border rounded-md flex-row items-center justify-evenly mb-11">
			{ratingOptions.map(({ label, option }) => (
				<TouchableOpacity key={label} onPress={() => setSearchingRating(label)}>
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
	);
};
