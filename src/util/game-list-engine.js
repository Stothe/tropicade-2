/**
 * External dependencies
 */
import { map, filter, find, orderBy } from "lodash";
import { useState, useEffect, useMemo } from "@wordpress/element";

/**
 * Local dependencies
 */
import Games from "../json/mame2010.json";
import specialClones from "../json/specialclones.json";
import Mature from "../json/mature.json";
import Casino from "../json/casino.json";
import Mahjong from "../json/mahjong.json";
import NPlayers from "../json/nplayers.json";

export default function gameListEngine(
	controlsClicked,
	nplayersClicked,
	numButtons,
	hideCats,
	screenOrientation,
	handleGamesFiltered
) {
	let foundCount = 0;
	let nullCount = 0;
	const tempArray = [];
	const gamesTargets = Games.game;

	const sanatizeControls = (ctl) => {
		try {
			if (ctl.input.control._type) {
				return ctl.input.control._type;
			} else {
				return "buttons only";
			}
		} catch {
			return "buttons only";
		}
	};

	map(gamesTargets, (e) => {
		try {			
			const controller = sanatizeControls(e);
			let clone = e._cloneof ? true : false;
			const buttons = e.input._buttons ? e.input._buttons : 0;
			let gameDesc = e.description;
			const romName = e._name;
			const rotate = e.display._rotate;
			const working = e.driver._status;

			//filter roms

			//filter on orientation
			if (screenOrientation.length < 2) {
				if(screenOrientation.indexOf(rotate) <0 ) {
					return;
				}
			}

			//filter on controls and buttons
			if (controlsClicked.indexOf(controller) < 0 || numButtons <= buttons) {
				return;
			}

			//reject clones if option checked (exempt special clones)
			const goodClone = find(specialClones, { rom: romName });
			if (goodClone) {
				if (goodClone.twoPlayer === true) {
					//figure out how to handle these, another function I guess
					return;
				} else {
					// console.log("found good clone, adding to rotation", gameDesc);
				}
			} else if (hideCats.indexOf("clones") > -1 && clone) {
				return;
			}

			// if enabled, check rom name against mature, casino, mahjong filters
			if (hideCats.indexOf("mature") > -1 && Mature.indexOf(romName) > -1) {
				//mature
				return;
			}

			if (hideCats.indexOf("casino") > -1 && Casino.indexOf(romName) > -1) {
				//casino
				return;
			}

			if (hideCats.indexOf("mahjong") > -1 && Mahjong.indexOf(romName) > -1) {
				//mahjong
				return;
			}

			if (hideCats.indexOf("pc10") > -1 && romName.startsWith("pc_")) {
				//playchoice 10
				return;
			}

			if (hideCats.indexOf("vs") > -1 && gameDesc.startsWith("Vs.")) {
				//nintendo vs
				return;
			}

			//filter on nPlayers
			// get nplayer value for rom
			let players = NPlayers.find((p) => p.rom == romName);
			players = players.players;
			// filter nplayer value against selected nplayers
			try {
				if (nplayersClicked.indexOf(players) === -1) {
					return;
				}
			} catch {
				return;
			}

			//push game into temp array
			tempArray.push({
				rom: romName,
				control: controller,
				buttons: buttons,
				title: gameDesc,
				players: players,
				orientation: rotate,
				status: working,
			});
		} catch (error) {
			//end generic error handling
			console.log(error.message);
		}
	});

	//do something with tempArray
	const orderedArray = orderBy(tempArray, "title", "asc");
	handleGamesFiltered(orderedArray);
}
