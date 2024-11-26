import { DataResponse } from "@/app/types";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { MainContentItems } from "./MainContentItems";
import { MainContentTitles } from "./MainContentTitles";

export type sortFieldType = "year" | "type" | "rating" | "age" | "name";

type MainContentComponentProps = {
  resultData: DataResponse[]
  setResultData: (value: DataResponse[]) => void
}

export const MainContentComponent = ({resultData, setResultData}: MainContentComponentProps) => {
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  function sortPressHandler(field: sortFieldType) {
		setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		sort(field, sortOrder);
	}

  function sort(sortField: sortFieldType, sortOrder: "asc" | "desc") {
    const fieldMap: Record<sortFieldType, keyof DataResponse> = {
      year: "year",
      type: "type",
      rating: "rating",
      age: "rating",
      name: "title",
    };
  
    const field = fieldMap[sortField];
  
    setResultData(
      [...resultData].sort((a, b) => {
        const [valueA, valueB] = [a[field], b[field]];
        const order = sortOrder === "desc" ? -1 : 1;
  
        return valueA > valueB ? order : valueA < valueB ? -order : 0;
      })
    );
  }

  return (
    <View className="flex-row bg-background">
    <ScrollView>
      <View className="flex-row">
        <MainContentTitles
        sortPressHandler={sortPressHandler}
        resultData={resultData}
        />
        <MainContentItems
        sortPressHandler={sortPressHandler}
        resultData={resultData}/>
      </View>
    </ScrollView>
  </View>
  )
}