export type Animal = "bird" | "cat" | "dog" | "rabbit" | "reptile";

export interface IPet {
	id: number;
	name: string;
	animal: Animal;
	description: string;
	breed: string;
	images: string[];
	city: string;
	state: string;
}

export interface IPetAPIResponse {
	numberOfResults: number;
	startIndex: number;
	endIndex: number;
	hasNext: boolean;
	pets: IPet[];
}

export interface IBreedAPIResponse {
	animal: Animal;
	breeds: string[];
}
