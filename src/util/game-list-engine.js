/**
 * External dependencies
 */
import { map, filter, find, orderBy, includes } from "lodash";
import { useEffect, useState } from "@wordpress/elements";

/**
 * Local dependencies
 */
import Games from "../json/mame2010.json";
import specialClones from "../json/specialclones.json";
import Mature from "../json/mature.json";
import Casino from "../json/casino.json";
import Mahjong from "../json/mahjong.json";
import NPlayers from "../json/nplayers.json";
import supplementalList from "../json/supplemental-gamelist.json";

export default function gameListEngine(
	numButtons,
	handleGamesFiltered,
	boxesState,
	searchText,
	jobType = "list"
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

	const handleTwoPlayer = (e) => {
		if (
			boxesState.nplayersClicked.indexOf("2P sim") >= 0 &&
			boxesState.nplayersClicked.indexOf("4P sim") < 0
		) {
			//push parent
			const parentRom = find(gamesTargets, { _name: e._cloneof });

			tempArray.push({
				rom: parentRom._name,
				gamelistIgonre: true,
			});
		}
	};

	map(gamesTargets, (e) => {
		try {
			const controller = sanatizeControls(e);
			let clone = e._cloneof ? true : false;
			const buttons = e.input._buttons ? parseInt(e.input._buttons) : 0;
			let gameDesc = e.description;
			const romName = e._name;
			let rotate = e.display._rotate;
			const working = e.driver._status;
			const year = e.year;
			const manufacturer = e.manufacturer;
			const extraData = find(supplementalList, { rom: romName });
			const genre = extraData.genre ? extraData.genre : "Not Classified";
			const description = extraData.desc ? extraData.desc : "";
			const parentCat = genre.length > 1 ? genre.split(",")[0] : genre;
			const parentRom = e._cloneof;

			//filter for search
			if (jobType !== "list") {
				if (
					(clone && e._cloneof.includes(searchText.toLowerCase())) ||
					gameDesc.toLowerCase().includes(searchText.toLowerCase()) ||
					romName.includes(searchText.toLowerCase())
				) {
				} else {
					return;
				}
				//filter for list
			} else {
				//filter on orientation
				if (boxesState.screenOrientation.length < 2) {
					if (rotate === "270") {
						rotate = "90";
					}
					if (boxesState.screenOrientation.indexOf(rotate) < 0) {
						return;
					}
				}

				//filter on controls and buttons
				if (
					boxesState.controlsClicked.indexOf(controller) < 0 ||
					numButtons < buttons
				) {
					return;
				}
				//reject clones if option checked (exempt special clones)
				const goodClone = find(specialClones, { rom: romName });
				if (goodClone) {
					if (goodClone.twoPlayer === true) {
						handleTwoPlayer(e);
					}
				} else if (boxesState.filters.indexOf("clones") > -1 && clone) {
					return;
				}
				// if enabled, check rom name against mature, casino, mahjong filters
				if (
					boxesState.filters.indexOf("mature") > -1 &&
					Mature.indexOf(romName) > -1
				) {
					//mature
					return;
				}

				if (
					boxesState.filters.indexOf("casino") > -1 &&
					Casino.indexOf(romName) > -1
				) {
					//casino
					return;
				}

				if (
					boxesState.filters.indexOf("mahjong") > -1 &&
					Mahjong.indexOf(romName) > -1
				) {
					//mahjong
					return;
				}

				if (
					boxesState.filters.indexOf("pc10") > -1 &&
					romName.startsWith("pc_")
				) {
					//playchoice 10
					return;
				}

				if (
					boxesState.filters.indexOf("vs") > -1 &&
					gameDesc.startsWith("Vs.")
				) {
					//nintendo vs
					return;
				}

				if (includes(gameDesc, "Cassette")) {
					//Deco cassette and other crap
					return;
				}

				//genre filter
				if (boxesState.category.indexOf(parentCat) >= 0) {
					return;
				}
			}
			//filter on nPlayers
			// get nplayer value for rom
			let players = NPlayers.find((p) => p.rom == romName);
			players = players.players;
			if (jobType !== "list") {
				//we don't need to filter against anything
			} else {
				// filter nplayer value against selected nplayers
				try {
					if (boxesState.nplayersClicked.indexOf(players) < 0) {
						return;
					}
				} catch (error) {
					console.log(error.message);
					return;
				}
			}

			//push game into temp array
			tempArray.push({
				rom: romName,
				control: controller,
				buttons: buttons,
				title: gameDesc,
				players: players,
				rotation: rotate,
				status: working,
				manufacturer: manufacturer,
				year: year,
				clone: clone,
				genre: genre,
				description: description,
				parentRom: parentRom,
			});
		} catch (error) {
			//end generic error handling
		}
	});

	//do something with tempArray
	const orderedArray = orderBy(tempArray, "title", "asc");
	orderedArray.length > 1
		? handleGamesFiltered(orderedArray)
		: handleGamesFiltered("empty");
}

//scratchpad
