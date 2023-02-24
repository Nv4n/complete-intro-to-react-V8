import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchPet from "../api/fetchPet";
import Carousel from "../components/Carousel";
import ErrorBoundary from "../components/ErrorBoundary";
import Modal from "../components/Modal";
import AdoptedPetContext from "../model/AdoptedPetContext";
import { IPetAPIResponse } from "../model/APIResponsesTypes";

const Details = () => {
	const { id } = useParams();
	if (!id) {
		throw new Error("no id provided to details");
	}
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();
	const results = useQuery<IPetAPIResponse>(["details", id], fetchPet);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setAdoptedPet] = useContext(AdoptedPetContext);

	if (results.isLoading) {
		return (
			<div className="loading-pane">
				<h2 className="loader">🐶</h2>
			</div>
		);
	}

	const pet = results?.data?.pets[0];
	if (!pet) {
		throw new Error("pet not found");
	}

	return (
		<div className="details">
			<Carousel images={pet.images}></Carousel>
			<div>
				<h1>{pet.name}</h1>
				<h2>{`${pet.animal} - ${pet.breed} - ${pet.city}, ${pet.state}`}</h2>
				<button onClick={() => setShowModal(true)}>
					Adopt {pet.name}
				</button>
				<p>{pet.description}</p>
				{showModal ? (
					<Modal>
						<div>
							<h1>Would you like to adopt {pet.name}</h1>
							<div className="buttons">
								<button
									onClick={() => {
										setAdoptedPet(pet);
										navigate("/");
									}}
								>
									Yes
								</button>
								<button onClick={() => setShowModal(false)}>
									No
								</button>
							</div>
						</div>
					</Modal>
				) : null}
			</div>
		</div>
	);
};

export default function DetailsErrorBoundary() {
	return (
		<ErrorBoundary>
			<Details></Details>
		</ErrorBoundary>
	);
}
