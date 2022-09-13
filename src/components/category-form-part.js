/**
 * external deps
 */
import { map, includes, filter } from "lodash";
import { useState, useReducer } from "@wordpress/element";

/**
 * internal deps
 */
import CheckboxControl from "./checkbox-control.js";
import CustomButton from "./checkbox-control.js";
import supplemental from "../json/supplemental-gamelist.json";
import DownArrow from "../img/downarrow.svg";
import RightArrow from "../img/rightarrow.svg";

export default function CategoryFormPart({
	selectedValues,
	hideCats,
	boxesDispatch,
	...props
}) {
	
	const [showSection, setShowSection] = useState(false)
	const onClickHandler = () => {setShowSection( ! showSection)}
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

	if (showSection) {
		return (
			<div>
				<fieldset className="category-fieldset">
					<legend className="legend-with-button">
						Hide Categories{" "}
						<CustomButton
							type="image"
							value='test'
							src={DownArrow}
							onClick={onClickHandler}
							className="svg-button"
							alt="click to collapse"
							payload="Hello World!"
						/>
					</legend>
					<div className="category-checkboxes">
						{map(parents, (e, index) => {
							return (
								<CheckboxControl
									key={index}
									label={e}
									value={e}
									onChange={() => boxesDispatch({ type: "category"}, event)}
								/>
							);
						})}
					</div>
				</fieldset>
			</div>
		);
	} else {
		return (
			<div>
				<fieldset className="category-fieldset-collapsed">
					<legend className="legend-with-button">
						<div>Hide Categories </div>
						<div>
							<CustomButton
								type="image"
								src={RightArrow}
								onClick={onClickHandler}
								className="svg-button"
								alt="click to expand"
							/>
						</div>
					</legend>
				</fieldset>
			</div>
		);
	}
}
