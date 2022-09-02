/**
 * External Deps
 */
import Button from "@wordpress/components";
import { map } from "lodash";

export default function downloadToFile(
	games,
	filename = "test.txt",
	contentType = "text"
) {
	console.log(games);
	//grab fields we need and format it as a text file.  Hardcoded to search and replace for now
	let content = "";
	const createBatRoot = map(games, (e) => {
		content = content + "%sourcedir%" + e.rom + ".zip %targetdir% \n";
	});

	const a = document.createElement("a");
	const file = new Blob([content], { type: contentType });

	a.href = URL.createObjectURL(file);
	a.download = filename;
	a.click();

	URL.revokeObjectURL(a.href);
}
