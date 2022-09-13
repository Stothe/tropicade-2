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
							onChange={() => boxesDispatch({ type: "screenOrientation" }, event)}
							defaultChecked
						/>
						<CheckboxControl
							label={"Vertical"}
							value={"90"}
							onChange={() => boxesDispatch({ type: "screenOrientation" }, event)}
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
							onChange={() => boxesDispatch({ type: "filters" }, event)}
							defaultChecked
						/>
					</div>
					<div>
						<CheckboxControl
							label={"Hide Casino Games"}
							value={"casino"}
							onChange={() => boxesDispatch({ type: "filters" }, event)}
							defaultChecked
						/>
					</div>
					<div>
						<CheckboxControl
							label={"Hide Mahjong"}
							value={"mahjong"}
							onChange={() => boxesDispatch({ type: "filters" }, event)}
							defaultChecked
						/>
					</div>
					<div>
						<CheckboxControl
							label={"Hide Mature"}
							value={"mature"}
							onChange={() => boxesDispatch({ type: "filters" }, event)}
							defaultChecked
						/>
					</div>
					<div>
						<CheckboxControl
							label={"Hide PlayChoice10"}
							value={"pc10"}
							onChange={() => boxesDispatch({ type: "filters" }, event)}
							defaultChecked
						/>
					</div>
					<div>
						<CheckboxControl
							label={"Hide Nintendo Vs"}
							value={"vs"}
							onChange={() => boxesDispatch({ type: "filters" }, event)}
							defaultChecked
						/>
					</div>
				</fieldset>
			</div>
		</fieldset>
	);
}
