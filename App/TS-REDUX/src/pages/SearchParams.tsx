import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import fetchSearch from "../api/fetchSearch";
import Results from "../components/Results";
import useBreedList from "../hooks/useBreedList";
import { Animal, IPet, RootType } from "../model/APIResponsesTypes";

const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
	const [requestParams, setRequestParams] = useState({
		location: "",
		animal: "",
		breed: "",
	});
	const adoptedPet: IPet | null = useSelector(
		(state: RootType) => state.adoptedPet.value
	);
	const [animal, setAnimal] = useState("" as Animal);
	const [breeds] = useBreedList(animal);

	const results = useQuery(["search", requestParams], fetchSearch);
	const pets = results?.data?.pets ?? [];

	return (
		<div className="search-params">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.currentTarget);
					const obj = {
						animal: formData.get("animal")?.toString() ?? "",
						breed: formData.get("breed")?.toString() ?? "",
						location: formData.get("location")?.toString() ?? "",
					};

					setRequestParams(obj);
				}}
			>
				{adoptedPet ? (
					<div className="pet image-container">
						<img
							src={(adoptedPet as IPet).images[0]}
							alt={(adoptedPet as IPet).name}
						/>
					</div>
				) : null}
				<label htmlFor="location">
					Location
					<input
						id="location"
						name="location"
						placeholder="Location"
					/>
				</label>
				<label htmlFor="animal">
					Animal
					<select
						id="animal"
						name="animal"
						onChange={(e) => {
							setAnimal(e.target.value as Animal);
						}}
						onBlur={(e) => {
							setAnimal(e.target.value as Animal);
						}}
					>
						<option />
						{ANIMALS.map((animal) => (
							<option key={animal} value={animal}>
								{animal}
							</option>
						))}
					</select>
				</label>
				<label htmlFor="breed">
					Breed
					<select disabled={!breeds.length} id="breed" name="breed">
						<option />
						{breeds.map((breed) => (
							<option key={breed} value={breed}>
								{breed}
							</option>
						))}
					</select>
				</label>
				<button>Submit</button>
			</form>
			<Results pets={pets} />
		</div>
	);
};

export default SearchParams;