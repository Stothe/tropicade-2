/**
 * external deps
 */
import { Modal } from "@wordpress/components";
import { useState } from "@wordpress/element";

/**
 * internal deps
 */
import { CustomButton } from "./checkbox-control.js";
import Trash from "../img/trash.svg";
import Xcircle from "../img/x-circle.svg";

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
					title=<img
						src={
							"http://adb.arcadeitalia.net/?mame=" +
							game.rom +
							"&type=marquee&resize=600"
						}
						alt={game.title}
					/>
					onRequestClose={closeModal}
					className="game-card-modal"
				>
					<div className="game-card-body">
						<div className="game-card-close">
							<CustomButton
								type="image"
								alt="delete button"
								className="game-card-close-button"
								src={Xcircle}
								value={game.rom}
								onClick={closeModal}
							/>
						</div>
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
											"http://adb.arcadeitalia.net/?mame=" +
											game.rom +
											"&type=ingame&resize=0"
										}
										alt={game.title + " screenshot"}
									/>
								</div>
							</div>

							<h3 className="game-card-description-heading">Description:</h3>
							<div className="game-card-description-text">
								{game.description}
							</div>
							<div className="game-card-image-credit">
								images via
								<br />
								<a
									href="http://adb.arcadeitalia.net/default.php"
									target="_blank"
								>
									<img
										src="http://adb.arcadeitalia.net/css/images/arcade_database_banner1.png"
										width="55"
										alt="Arcade Database"
									/>
								</a>
							</div>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
}
