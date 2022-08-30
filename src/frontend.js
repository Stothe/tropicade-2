import { useBlockProps } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";
import { map, filter, orderBy, find } from "lodash";

import "./style.scss";
// import Mame from './json/mame2003.json';
import ControlsFormPart from "./components/controls-form-part";
import NPlayersFormPart from "./components/nplayers";
import Mature from "./json/mature.json";
import Casino from "./json/casino.json";
import Mahjong from "./json/mahjong.json";
import Games from "./json/mame2003.json";
import NPlayers from "./json/nplayers.json";
import CheckboxControl from "./components/checkbox-control.js";
import GameListRender from "./components/game-list-engine.js";
import MiscSettingsFormPart from "./components/misc-settings-form-part.js";

const divsToUpdate = document.querySelectorAll(".form-goes-here");
divsToUpdate.forEach(function (div) {
	ReactDOM.render(<Form />, div);
});

function Form() {
	const tempArray = [];
	const [nplayersClicked, setNplayersClicked] = useState([]);
	const [controlsClicked, setControlsClicked] = useState([]);
	const [numButtons, setNumButtons] = useState(6);
	const [gamesFiltered, setGamesFiltered] = useState([]);
	const [hideCats, setHideCats] = useState(['clones', 'mature', 'casino', 'mahjong'])

	const gameList = () => {
		const gamesDetails = Games.elements[1].elements;		
		{
			map(gamesDetails, (e) => {
				try {
					const input = e.elements.find((a) => a.name == "input").attributes;
					const controller = input.control;
					let clone = e.attributes.cloneof ? true : false;
					const buttons = input.buttons ? input.buttons : 0;
					const gameDesc = e.elements.find((a) => a.name == "description").elements[0].text;

					//start filtering all games based on control and number of buttons
					if (
						controlsClicked.indexOf(controller) > -1 &&
						buttons <= numButtons
					) {						
						//reject clones if option checked
						if ( hideCats.indexOf('clones') > -1 && clone ) {
							return
						}

						const romName = e.attributes.name;

						// if enabled, check rom name against mature, casino, mahjong filters
						if ( hideCats.indexOf('mature') > -1 && Mature.indexOf(romName) > -1 ) { //mature
							return
						}

						if ( hideCats.indexOf('casino') > -1 && Casino.indexOf(romName) > -1 ) { //casino
							return
						}

						if ( hideCats.indexOf('mahjong') > -1 && Mahjong.indexOf(romName) > -1 ) { //mahjong
							return
						}

						if ( hideCats.indexOf('pc10') > -1 &&  romName.startsWith('pc_')) { //playchoice 10
							return
						}


						if ( hideCats.indexOf('vs') > -1 &&  gameDesc.startsWith('Vs.')) { //nintendo vs
							return
						}

						// get nplayer value for rom
						let players = NPlayers.find((p) => p.rom == romName);
						players = players.players
						// filter nplayer value against selected nplayers
						try{
							if(nplayersClicked.indexOf(players) === -1) {
								return}
						} catch {
							return
						}

						tempArray.push({
							rom: romName,
							control: controller,
							buttons: buttons,
							title: gameDesc,
							players: players
						});
					}
				} catch (error) {
					//nothing to see here
				}
			});
			const orderedArray = orderBy(tempArray, 'title', 'asc');
			setGamesFiltered(orderedArray);
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
		// console.log(e);
		if (e.target.checked) {
			setControlsClicked([...controlsClicked, e.target.value]);
		} else {
			setControlsClicked(filter(controlsClicked, (v) => v !== e.target.value));
		}
	};

	return (
		<div>
			<form>
				<div>
					<MiscSettingsFormPart
						numButtons={numButtons} 
						onButtonUpdateHandler={ (event) => setNumButtons(event.target.value)}
						onChangeHandler={(event) => handleHiddenSelect(event)}
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
					<Button variant="primary" onClick={() => gameList(controlsClicked)}>
						{" "}
						Let's Go!{" "}
					</Button>
				</div>
				{ gamesFiltered.length > 0 ?
					<>
					<div>{gamesFiltered.length} games</div>					
					<table>
						<tr>
							<th>Game</th>
							<th>Players</th>
							<th>Rom</th>
							<th>Control</th>
							<th>Buttons</th>
						</tr>
						{map(gamesFiltered, (e) => {
							return (
								<tr>
									<td>{e.title}</td>
									<td>{e.players}</td>
									<td>{e.rom}</td>
									<td>{e.control}</td>
									<td>{e.buttons}</td>
								</tr>
							);
						})}
					</table>
					</>
				: '' }
			</form>
		</div>
	);
}
