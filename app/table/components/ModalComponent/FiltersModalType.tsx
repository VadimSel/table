import { Text, TouchableOpacity, View } from "react-native";

// ---------------- Array options ---------------- \\

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

// ---------------- Types ---------------- \\

type FiltersModalTypeProps = {
	searchingType: string;
	setSearchingType: (searchingType: string) => void;
};

export const FiltersModalType = ({
	searchingType,
	setSearchingType,
}: FiltersModalTypeProps) => {
	return (
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
	);
};
