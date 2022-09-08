/**
 * external deps
 */
import { map, includes } from "lodash";

/**
 * internal deps
 */
import CheckboxControl from "./checkbox-control.js";
import supplemental from "../json/supplemental-gamelist.json";

export default function CategoryFormPart({
	selectedValues,
	onChangeHandler,
	hideCats,
	...props
}) {
	const childSet = new Set();
	const parentSet = new Set();
	const casinoCats = ["Casino", "Slot Machine"];
	map(supplemental, (e) => {
		const parentCat = e.genre.split(",")[0];
		if (includes(casinoCats, parentCat) && includes(hideCats, "casino")) {
			return;
		} else if (
			includes(e.genre.toLowerCase(), "mature") &&
			includes(hideCats, "mature")
		) {
			return;
		} else if (
			includes(e.genre.toLowerCase(), "mahjong") &&
			includes(hideCats, "mahjong")
		) {
			return;
		}
		childSet.add(e.genre);
		parentSet.add(parentCat);
	});

	const parents = Array.from(parentSet);

	return (
		<div>
			<fieldset className="category-fieldset">
				<legend>Hide Categories</legend>
				<div className="category-checkboxes">
					{map(parents, (e, index) => {
						return (
							<CheckboxControl
								key={index}
								label={e}
								value={e}
								onChange={onChangeHandler}
							/>
						);
					})}
				</div>
			</fieldset>
		</div>
	);
}
