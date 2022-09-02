import { useBlockProps } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import React, { useState, useEffect } from "react";
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

const divsToUpdate = document.querySelectorAll(".form-goes-here");
divsToUpdate.forEach(function (div) {
	ReactDOM.render(<Form />, div);
});

function Form() {
	// const tempArray = [];
	const [nplayersClicked, setNplayersClicked] = useState(["2P alt", "2P sim", "3P alt", "4P alt"]);
	const [controlsClicked, setControlsClicked] = useState(["joy2way", "vjoy2way", "joy4way", "joy8way"]);
	const [numButtons, setNumButtons] = useState(6);
	const [gamesFiltered, setGamesFiltered] = useState([]);
	const [screenOrientation, setScreenOrientation] = useState(["0","90"])
	const [hideCats, setHideCats] = useState([
		"clones",
		"mature",
		"casino",
		"mahjong",
	]);

	const handleOrientationSelect = (e) => {
		if (e.target.checked) {
			setScreenOrientation([...screenOrientation, e.target.value]);
		} else {
			setScreenOrientation(filter(screenOrientation, (h) => h !== e.target.value));
		}
	};

	const handleHiddenSelect = (e) => {
		if (e.target.checked) {
			setHideCats([...hideCats, e.target.value]);
		} else {
			setHideCats(filter(hideCats, (h) => h !== e.target.value));
		}
	};

	const handleNplayersSelect = (e) => {
		if (e.target.checked) {
			setNplayersClicked([...nplayersClicked, e.target.value]);
		} else {
			setNplayersClicked(filter(nplayersClicked, (v) => v !== e.target.value));
		}
	};

	const handleControlsSelect = (e) => {
		if (e.target.checked) {
			setControlsClicked([...controlsClicked, e.target.value]);
		} else {
			setControlsClicked(filter(controlsClicked, (v) => v !== e.target.value));
		}
	};

	const handleGamesFiltered = (e) => {
		setGamesFiltered(e);
	}

	return (
		<div>
			<form>				
				<div>
					<MiscSettingsFormPart
						numButtons={numButtons}
						onButtonUpdateHandler={(event) => setNumButtons(event.target.value)}
						onChangeHandler={(event) => handleHiddenSelect(event)}
						onOrientationHandler={(event) => handleOrientationSelect(event)}	
					/>
				</div>
				<ControlsFormPart
					selectedValues={controlsClicked}
					onChangeHandler={(event) => handleControlsSelect(event)}
				/>
				<div>
					<NPlayersFormPart
						selectedValues={nplayersClicked}
						onChangeHandler={(event) => handleNplayersSelect(event)}
					/>
				</div>
				<div>
					<Button variant="primary" onClick={() => {
						gameListEngine(
							controlsClicked,
							nplayersClicked,
							numButtons,
							hideCats,
							screenOrientation,
							handleGamesFiltered
						);
					}}>
						{" "}
						Let's Go!{" "}
					</Button>
				</div>
				{gamesFiltered.length > 0 ? (
					<GameListRender games={gamesFiltered} />
				) : null}
			</form>
		</div>
	);
}
