/**
 * external deps
 */
import { map } from "lodash";

/**
 * internal deps
 */
import CheckboxControl from "./checkbox-control.js";
import supplemental from "../json/supplemental-gamelist.json";

export default function CategoryFormPart(
	selectedValues,
	onChangeHandler,
	...props
) {
	const childSet = new Set();
	const parentSet = new Set();
	map(supplemental, (e) => {
		childSet.add(e.genre);
		parentSet.add(e.genre.split(",")[0]);
	});
	const parents = Array.from(parentSet);

	return (
		<div>
			<fieldset className="category-fieldset">
				<legend>Include only these categories</legend>
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
