/**
 * External Deps
 */
import Button from "@wordpress/components";
import { map } from "lodash";

/** Function to download Attract Mode games lists
 * creates a blob from completed game objects
 * @arguments {string} content, file name, content type
 * prompts user to save file
 */
export default function downloadToFile(content, filename, contentType) {
	const a = document.createElement("a");
	const file = new Blob([content], { type: contentType });

	a.href = URL.createObjectURL(file);
	a.download = filename;
	a.click();

	URL.revokeObjectURL(a.href);
}
