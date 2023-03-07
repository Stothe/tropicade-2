/** WP deps */
import { SelectControl } from "@wordpress/components";
/**
 * local dependencies
 */
import Controls from "../json/control-options.json";
import CheckboxControl from "./checkbox-control.js";

export default function MiscSettingsFormPart({
	numButtons,
	boxesDispatch,
	onButtonUpdateHandler,
	...props
}) {
	return (
		<fieldset className="other-options-fieldset">
			<legend> Options </legend>
			<div className="flex-wrapper">
				<div className="other-options-box-1">
					<fieldset className="screen-orientation">
						<legend> Screen Orientation </legend>
						<CheckboxControl
							label={"Horizontal"}
							value={"0"}
							onChange={(e) => boxesDispatch({ type: "screenOrientation", value: e.target.value, checked: e.target.checked })}
							defaultChecked
						/>
						<CheckboxControl
							label={"Vertical"}
							value={"90"}
							onChange={(e) => boxesDispatch({ type: "screenOrientation", value: e.target.value, checked: e.target.checked })}
							defaultChecked
						/>
					</fieldset>

					<div className="buttons-select">
						<input
							type="text"
							maxlength="2"
							size="2"
							value={numButtons}
							id="num-buttons"
							name="num-buttons"
							onChange={onButtonUpdateHandler}
						/>
						<label for="num-buttons"> buttons (or fewer)</label>
					</div>
				</div>

				<fieldset className="filter-settings">
					<legend>Filters</legend>
					<div>
						<CheckboxControl
							label={"Hide Clones"}
							value={"clones"}
							onChange={(e) => boxesDispatch({ type: "filters", value: e.target.value, checked: e.target.checked})}
							defaultChecked
						/>
					</div>
					<div>
						<CheckboxControl
							label={"Hide Casino Games"}
							value={"casino"}
							onChange={(e) => boxesDispatch({ type: "filters", value: e.target.value, checked: e.target.checked})}
							defaultChecked
						/>
					</div>
					<div>
						<CheckboxControl
							label={"Hide Mahjong"}
							value={"mahjong"}
							onChange={(e) => boxesDispatch({ type: "filters", value: e.target.value, checked: e.target.checked})}
							defaultChecked
						/>
					</div>
					<div>
						<CheckboxControl
							label={"Hide Mature"}
							value={"mature"}
							onChange={(e) => boxesDispatch({ type: "filters", value: e.target.value, checked: e.target.checked})}
							defaultChecked
						/>
					</div>
					<div>
						<CheckboxControl
							label={"Hide PlayChoice10"}
							value={"pc10"}
							onChange={(e) => boxesDispatch({ type: "filters", value: e.target.value, checked: e.target.checked})}
							defaultChecked
						/>
					</div>
					<div>
						<CheckboxControl
							label={"Hide Nintendo Vs"}
							value={"vs"}
							onChange={(e) => boxesDispatch({ type: "filters", value: e.target.value, checked: e.target.checked})}
							defaultChecked
						/>
					</div>
				</fieldset>
			</div>
		</fieldset>
	);
}
