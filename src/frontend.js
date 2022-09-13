import { useBlockProps } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useState, useEffect, useReducer } from "@wordpress/element";
import * as ReactDOM from "react-dom";
import { map, filter, orderBy, find, findKey } from "lodash";

import "./style.scss";
// import Mame from './json/mame2003.json';
import ControlsFormPart from "./components/controls-form-part";
import NPlayersFormPart from "./components/nplayers";
import GameListRender from "./components/game-list-render";
import gameListEngine from "./util/game-list-engine";
import CheckboxControl from "./components/checkbox-control.js";
import MiscSettingsFormPart from "./components/misc-settings-form-part.js";
import CategoryFormPart from "./components/category-form-part.js";
import GameCardModal from "./components/game-detail-card";

const divsToUpdate = document.querySelectorAll(".form-goes-here");
divsToUpdate.forEach(function (div) {
	ReactDOM.render(<Form />, div);
});

function Form() {
	/**
	 * Checkboxes reducer
	 */
	const boxesInitialState = {
		category: [],
		nplayersClicked: ["2P alt", "2P sim", "3P alt", "4P alt"],
		filters: ["clones", "mature", "casino", "mahjong", "pc10", "vs"],
		controlsClicked: ["joy2way", "vjoy2way", "joy4way", "joy8way"],
		screenOrientation: ["0", "90"]
	};

	const [boxesState, boxesDispatch] = useReducer(
		boxesReducer,
		boxesInitialState
	);

	function boxesReducer(boxesState, action) {
		const value = event.target.value;
		const boxType = action.type;
		switch (event.target.checked) {
			case true:
				return { ...boxesState, [boxType]: [...boxesState[boxType], value] };
			case false:
				return {
					...boxesState,
					[boxType]: filter(boxesState[boxType], (e) => e !== value),
				};
			default:
				console.log("oops state action failed");
		}
	}

	const [openGameDetail, setOpenGameDetail] = useState(false);
	const [numButtons, setNumButtons] = useState(6);
	const [gamesFiltered, setGamesFiltered] = useState([]);
	const [selectedGame, setSelectedGame] = useState(null);

	const handleGamesFiltered = (e) => {
		setGamesFiltered(e);
	};

	const handleGameDelete = (e) => {
		e.preventDefault();
		const rom = e.target.value;
		setGamesFiltered(filter(gamesFiltered, (g) => g.rom !== rom));
	};

	const toggleGameList = (event, game) => {
		event.preventDefault();
		setSelectedGame(game);
		setOpenGameDetail(true);
	};

	const closeGameDetail = (e) => {
		setOpenGameDetail(false);
	};

	return (
		<div>
			{selectedGame && openGameDetail ? (
				<GameCardModal
					game={selectedGame}
					openGameDetail={openGameDetail}
					closeModal={(event) => closeGameDetail(event)}
					onChangeHandler={handleGameDelete}
				/>
			) : null}
			<form>
				<div>
					<MiscSettingsFormPart
						numButtons={numButtons}
						onButtonUpdateHandler={(event) => setNumButtons(event.target.value)}
						boxesDispatch={boxesDispatch}
					/>
				</div>
				<div></div>
				<div>
					<CategoryFormPart
						selectedValues={boxesState.category}
						hideCats={boxesState.filters}
						boxesDispatch={boxesDispatch}
					/>
				</div>
				<ControlsFormPart
					selectedValues={boxesState.controlsClicked}
					onChangeHandler={boxesDispatch}
				/>
				<div>
					<NPlayersFormPart
						selectedValues={boxesState.nplayersClicked}
						boxesDispatch={boxesDispatch}
					/>
				</div>
				<div>
					<Button
						variant="primary"
						onClick={() => {
							gameListEngine(
								numButtons,
								handleGamesFiltered,
								boxesState
							);
						}}
					>
						{" "}
						Let's Go!{" "}
					</Button>
				</div>
				{gamesFiltered.length > 0 ? (
					<GameListRender
						games={gamesFiltered}
						onChangeHandler={handleGameDelete}
						onClickHandler={toggleGameList}
					/>
				) : null}
			</form>
		</div>
	);
}
