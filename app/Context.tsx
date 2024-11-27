import React, { createContext, useState, ReactNode, useContext } from "react";
import { DataResponse, Pagination } from "./types";
import { getData } from "./utils/api";

type ContextProps = {
	isLoading: boolean;
	setIsLoading: (value: boolean) => void;
	resultData: DataResponse[];
	setResultData: (data: DataResponse[]) => void;
	isModalVisible: boolean;
	setIsModalVisible: (value: boolean) => void;
	modalValue: modalValueType;
	setModalValue: (value: modalValueType) => void;
	paginationData: Pagination | undefined;
	setPaginationData: (data: Pagination | undefined) => void;
	currentPage: number;
	setCurrentPage: (page: number) => void;
	searchingName: string;
	setSearchingName: (name: string) => void;
	searchingMinScore: number;
	setSearchingMinScore: (minScore: number) => void;
	searchingMaxScore: number;
	setSearchingMaxScore: (maxScore: number) => void;
	searchingType: string;
	setSearchingType: (type: string) => void;
	searchingRating: string;
	setSearchingRating: (rating: string) => void;
	fetchData: (
		name?: string,
		page?: number,
		minScore?: number,
		maxScore?: number,
		type?: string,
		rating?: string
	) => void
	resetFilters: () => void
	sortPressHandler: (field: sortFieldType) => void
};

export type modalValueType = "search" | "filter";
export type sortFieldType = "year" | "type" | "rating" | "age" | "name";

const Context = createContext<ContextProps | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [resultData, setResultData] = useState<DataResponse[]>([]);
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [modalValue, setModalValue] = useState<modalValueType>("search");
	const [paginationData, setPaginationData] = useState<Pagination | undefined>();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [searchingName, setSearchingName] = useState<string>("");
	const [searchingMinScore, setSearchingMinScore] = useState<number>(0);
	const [searchingMaxScore, setSearchingMaxScore] = useState<number>(10);
	const [searchingType, setSearchingType] = useState<string>("");
	const [searchingRating, setSearchingRating] = useState<string>("");

	function fetchData(
		name: string = searchingName,
		page: number = currentPage,
		minScore: number = searchingMinScore,
		maxScore: number = searchingMaxScore,
		type: string = searchingType,
		rating: string = searchingRating
	) {
		setIsModalVisible(false);
		setSearchingName(name);

		if (isLoading) return;

		setIsLoading(true);

		getData(name, page, minScore, maxScore, type, rating).then((data) => {
			if (data) {
				setResultData(data.data);
				setPaginationData(data.pagination);
				setCurrentPage(data.pagination.current_page);

				setIsLoading(false);
			}
		});
	}

	function resetFilters() {
		fetchData("", 1, 0, 10, "", "");
		setSearchingType("");
		setSearchingRating("");
		setSearchingMinScore(0);
		setSearchingMaxScore(10);
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

	function sortPressHandler(field: sortFieldType) {
		setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		sort(field, sortOrder);
	}

	return (
		<Context.Provider
			value={{
				isLoading,
				setIsLoading,
				resultData,
				setResultData,
				isModalVisible,
				setIsModalVisible,
				modalValue,
				setModalValue,
				paginationData,
				setPaginationData,
				currentPage,
				setCurrentPage,
				searchingName,
				setSearchingName,
				searchingMinScore,
				setSearchingMinScore,
				searchingMaxScore,
				setSearchingMaxScore,
				searchingType,
				setSearchingType,
				searchingRating,
				setSearchingRating,
				fetchData,
				resetFilters,
				sortPressHandler
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useGlobalContext = (): ContextProps => {
	const context = useContext(Context);
	if (!context) throw new Error("Context Error");
	return context;
};
