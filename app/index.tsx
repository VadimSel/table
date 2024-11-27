import { ContextProvider } from "./Context";
import Table from "./table";

const HomePage = () => {
	return (
		<ContextProvider>
			<Table />
		</ContextProvider>
	);
};

export default HomePage;
