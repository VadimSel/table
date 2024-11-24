import { Alert } from "react-native";
import { ApiResponse, DataResponse } from "../types";

// export async function getData(setFetchData: (data: ApiResponse) => void) {
//   try {
//     const response: Response = await fetch("https://api.jikan.moe/v4/anime");
//     const data: ApiResponse = await response.json();
//     setFetchData(data);
//   } catch (error) {
//     Alert.alert("Ошибка: ", (error as Error).message);
//   }
// }

export async function getData(data: string = "", page: number): Promise<ApiResponse | null> {
  try {
    const response: Response = await fetch(`https://api.jikan.moe/v4/anime?q=${data}&page=${page}`);
    const resData: ApiResponse = await response.json();

    const uniqueData = resData.data.filter((item: DataResponse, index, self: ApiResponse["data"]) => {
      return index = self.findIndex((el) => {el.mal_id === item.mal_id})
    })

    return { ...resData, data: uniqueData}
  } catch (error) {
    Alert.alert("Ошибка: ", (error as Error).message);
    return null
  }
}

export async function searchData(searchWord: string) {
  try {
    const response: Response = await fetch(`https://api.jikan.moe/v4/anime?q=${searchWord}`);
    const data: ApiResponse = await response.json();

    const uniqueData = data.data.filter(
      (item: DataResponse, index, self: ApiResponse["data"]) =>
        index === self.findIndex((el) => el.mal_id === item.mal_id)
    );
    
    return uniqueData;
  } catch (error) {
    Alert.alert("Ошибка: ",(error as Error).message);
  }
}
