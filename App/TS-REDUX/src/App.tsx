import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import store from "./model/store";
import { IPet } from "./model/APIResponsesTypes";
import Details from "./pages/Details";
import SearchParams from "./pages/SearchParams";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
			cacheTime: Infinity,
		},
	},
});

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Provider store={store}>
					<QueryClientProvider client={queryClient}>
						<header>
							<Link to="/">Adopt Me!</Link>
						</header>
						<Routes>
							<Route
								path="/details/:id"
								element={<Details></Details>}
							></Route>
							<Route
								path="/"
								element={<SearchParams></SearchParams>}
							></Route>
						</Routes>
					</QueryClientProvider>
				</Provider>
			</BrowserRouter>
		</div>
	);
};

const container = document.getElementById("root");
if (!container) {
	throw new Error("no container to render to");
}
const root = createRoot(container);
root.render(<App></App>);
