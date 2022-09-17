import { Button } from "@wordpress/components";
import { useState, useReducer } from "@wordpress/element";
import * as ReactDOM from "react-dom";
import {filter, find } from "lodash";

import "./style.scss";
import {
	ControlsFormPart,
	NPlayersFormPart,
	GameListRender,
	CheckBoxControl,
	MiscSettingsFormPart,
	CategoryFormPart,
	GameCardModal,
	SearchModal,
	FilterHeading,
} from "./components";
import gameListEngine from "./util/game-list-engine";

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
		screenOrientation: ["0", "90"],
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
	const [singleGameAdded, setSingleGameAdded] = useState(false);
	const handleGamesFiltered = (e) => {
		singleGameAdded
			? setGamesFiltered([...gamesFiltered, ...e])
			: setGamesFiltered(e);
		setSingleGameAdded(false);
	};

	const handleGameDelete = (e) => {
		e.preventDefault();
		const rom = e.target.value;
		setGamesFiltered(filter(gamesFiltered, (g) => g.rom !== rom));
	};

	const handleGameAdd = (e, game) => {
		e.preventDefault();
		setGamesFiltered([...gamesFiltered, game]);
		setSingleGameAdded(true);
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
			<div className="filters-wrapper">
				<FilterHeading />
				<form>
					<div>
						<MiscSettingsFormPart
							numButtons={numButtons}
							onButtonUpdateHandler={(event) =>
								setNumButtons(event.target.value)
							}
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
					<div className="div-filter-submit-button">
						<Button
							className="filter-submit-button"
							variant="primary"
							onClick={() => {
								gameListEngine(numButtons, handleGamesFiltered, boxesState);
							}}
						>
							{" "}
							Let's Go!{" "}
						</Button>
						<SearchModal
							openGameCard={toggleGameList}
							onClickHandler={handleGameAdd}
						/>
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
		</div>
	);
}
