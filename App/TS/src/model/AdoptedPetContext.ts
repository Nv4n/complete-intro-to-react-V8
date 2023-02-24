import { createContext } from "react";
import { IPet } from "./APIResponsesTypes";

const AdoptedPetContext = createContext<
	[IPet | null, (adoptedPet: IPet) => void]
>([
	{
		id: 1337,
		name: "Fido",
		animal: "dog",
		description: "Lorem ipsum",
		breed: "Beagle",
		images: [],
		city: "Seattle",
		state: "WA",
	},
	() => {},
]);

export default AdoptedPetContext;
