import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import fetchPet from "../api/fetchPet";
import Carousel from "../components/Carousel";
import ErrorBoundary from "../components/ErrorBoundary";
import Modal from "../components/Modal";
import { adopt } from "../model/adoptedPetSlice";
import { IPet, IPetAPIResponse } from "../model/APIResponsesTypes";

const Details = () => {
	const { id } = useParams();
	if (!id) {
		throw new Error("no id provided to details");
	}
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();
	const results = useQuery<IPetAPIResponse>(["details", id], fetchPet);
	const dispatch = useDispatch();

	if (results.isLoading) {
		return (
			<div className="loading-pane">
				<h2 className="loader">🐶</h2>
			</div>
		);
	}

	const pet = (results?.data as IPetAPIResponse).pets[0];
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
										dispatch(adopt(pet));
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
