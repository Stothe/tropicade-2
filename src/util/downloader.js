/**
 * External Deps
 */
import Button from "@wordpress/components";
import { map, find } from "lodash";

/**
 * Internal Deps
 */
import supplemental from "../json/supplemental-gamelist.json";

export default function downloadToFile(
	games,
	mode,
	filename = "test.txt",
	contentType = "text"
) {
	// const mode = "copyStub";
	const getGenre = (e) => {
		const findrom = find(supplemental, { rom: e }).genre;
		return findrom ? findrom : "";
	};

	//grab fields we need and format it as a text file.
	let amContent =
		"#Name;Title;Emulator;CloneOf;Year;Manufacturer;Category;Players;Rotation;Control;Status;DisplayCount;DisplayType;AltRomname;AltTitle;Extra;Buttons\n";
	let content = "";
	const catArray =[];
	const createBatRoot = map(games, (e) => {		
		const name = e.rom;
		const title = e.title;
		const emulator = "Arcade";
		const cloneOf = e.clone ? e.clone : "";
		const year = e.year ? e.year : "";
		const manufacturer = e.manufacturer ? e.manufacturer : "";
		const category = getGenre(e.rom); //need a category *&^#
		const players = e.players;
		const rotation = e.rotation ? e.rotation : "";
		const control = e.control;
		const status = e.status ? e.status : "";
		const displayCount = "";
		const displayType = "";
		const altRomname = "";
		const altTitle = "";
		const extra = "";
		const buttons = e.buttons;

		catArray.push(category.split(',')[0])
		if (mode === "attract") {
			if(e.gamelistIgonre) {
				return
			}
			amContent =
				amContent +
				name +
				";" +
				title +
				";" +
				emulator +
				";" +
				cloneOf +
				";" +
				year +
				";" +
				manufacturer +
				";" +
				category +
				";" +
				players +
				";" +
				rotation +
				";" +
				control +
				";" +
				status +
				";" +
				displayCount +
				";" +
				displayType +
				";" +
				altRomname +
				";" +
				altTitle +
				";" +
				extra +
				";" +
				buttons +
				"\n";

				console.log(new Set(catArray));
		} else if(mode==="copyStub") {
			content = content + "copy %path_to_Source_dir%" + name + ".zip %path_to_Target_dir% \n";
		}
	});

	//set right content
    if(content.length < 1){content = amContent};

	const a = document.createElement("a");
	const file = new Blob([content], { type: contentType });

	a.href = URL.createObjectURL(file);
	a.download = filename;
	a.click();

	URL.revokeObjectURL(a.href);
}
