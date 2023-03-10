import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AdoptedPetContext from "./AdoptedPetContext";
import Details from "./Details";
import SearchParams from "./SearchParams";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
			cacheTime: Infinity,
		},
	},
});

const App = () => {
	const adoptedPet = useState(null);
	return (
		<div>
			<BrowserRouter>
				<AdoptedPetContext.Provider value={adoptedPet}>
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
				</AdoptedPetContext.Provider>
			</BrowserRouter>
		</div>
	);
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App></App>);
