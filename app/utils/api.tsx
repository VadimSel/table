import { Alert } from "react-native";
import { ApiResponse, DataResponse } from "../types";

export async function getData(
	name: string,
	page: number,
	minScore: number,
	maxScore: number,
	type: string,
	rating: string
): Promise<ApiResponse | null> {
	try {
		const response: Response = await fetch(
			`https://api.jikan.moe/v4/anime?q=${name}&page=${page}&min_score=${minScore}&max_score=${maxScore}&type=${type}&rating=${rating}`
		);
		const resData: ApiResponse = await response.json();

		const uniqueData = resData.data.filter(
			(item: DataResponse, index, self: ApiResponse["data"]) => {
				return (index = self.findIndex((el) => {
					el.mal_id === item.mal_id;
				}));
			}
		);

		return { ...resData, data: uniqueData };
	} catch (error) {
		Alert.alert("Ошибка: ", (error as Error).message);
		return null;
	}
}
