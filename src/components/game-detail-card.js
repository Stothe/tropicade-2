/**
 * external deps
 */
import { Modal } from "@wordpress/components";
import { useState, useCallback } from "@wordpress/element";

/**
 * internal deps
 */
import { CustomButton } from "./checkbox-control.js";
import Trash from "../img/trash.svg";

export default function GameCardModal({
	game,
	openGameDetail,
	closeModal,
	onChangeHandler,
}) {
	const deleteAndClose = (event) => {
		onChangeHandler(event);
		closeModal(event);
	};

	return (
		<>
			{openGameDetail && (
				<Modal
					title={
						<img
							src={
								"https://raw.githubusercontent.com/Stothe/marquees/main/" +
								game.rom +
								".png"
							}
							onError={({ currentTarget }) => {
								currentTarget.onerror = null; // prevents looping
								currentTarget.src =
									"https://tropicade.org/wp-content/uploads/2020/10/tropicade-trans.png";
							}}
							alt={game.title}
						/>
					}
					onRequestClose={closeModal}
					className="game-card-modal"
				>
					<div className="game-card-body">
						<div className="game-card-item-container">
							<div className="game-title-div">
								<h2 className="game-title"> {game.title}</h2>
								<div className="game-card-delete">
									<CustomButton
										type="image"
										alt="delete button"
										className="game-card-trash"
										src={Trash}
										value={game.rom}
										onClick={deleteAndClose}
									/>
								</div>
							</div>
							<div className="game-card-flex-container">
								<div className="game-card-attributes">
									<div>
										<b>year:</b> {game.year}
									</div>
									<div>
										<b>rom:</b> {game.rom}
									</div>
									<div>
										<b>control:</b> {game.control}
									</div>
									<div>
										<b>buttons:</b> {game.buttons}
									</div>
									<div>
										<b>players:</b> {game.players}
									</div>
									<div>
										<b>category:</b> {game.genre}
									</div>
									<div>
										<b>screen:</b>{" "}
										{game.rotation === 0 ? "horizontal" : "vertical"}
									</div>
									<div>
										<b>Is clone:</b> {game.clone ? "yes" : "no"}
									</div>
									<div>
										<b>emulation status:</b> {game.status}
									</div>
								</div>
								<div className="game-card-screenshot">
									<img
										src={
											"https://raw.githubusercontent.com/Stothe/screenshots/main/" +
											game.rom +
											".png"
										}
										onError={({ currentTarget }) => {
											currentTarget.onerror = null; // prevents looping
											currentTarget.src =
												"https://raw.githubusercontent.com/Stothe/screenshots/main/gamenotfound.png";
										}}
										alt={game.title}
									/>
								</div>
							</div>

							<h3 className="game-card-description-heading">Description:</h3>
							<div className="game-card-description-text">
								{game.description}
							</div>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
}
