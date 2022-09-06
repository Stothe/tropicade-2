/** WP deps */
import { SelectControl } from "@wordpress/components";
/**
 * local dependencies
 */
import Controls from "../json/control-options.json";
import CheckboxControl from "./checkbox-control.js";

export default function MiscSettingsFormPart({
	numButtons,
	selectedValues,
	onChangeHandler,
	onButtonUpdateHandler,
	onOrientationHandler,
	...props
}) {
	return (
		<fieldset className="other-options-fieldset">
			<legend> Options </legend>
            <div>
				<fieldset className="screen-orientation">
                    <legend> Screen Orientation </legend>
					<CheckboxControl
						label={"Horizontal"}
						value={"0"}
						onChange={onOrientationHandler}
						defaultChecked
					/>
					<CheckboxControl
						label={"Vertical"}
						value={"90"}
						onChange={onOrientationHandler}
						defaultChecked
					/>
				</fieldset>
			</div>
			<div>
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
			
			<div>
				<CheckboxControl
					label={"Hide Clones"}
					value={"clones"}
					onChange={onChangeHandler}
					defaultChecked
				/>
			</div>
			<div>
				<CheckboxControl
					label={"Hide Casino Games"}
					value={"casino"}
					onChange={onChangeHandler}
					defaultChecked
				/>
			</div>
			<div>
				<CheckboxControl
					label={"Hide Mahjong"}
					value={"mahjong"}
					onChange={onChangeHandler}
					defaultChecked
				/>
			</div>
			<div>
				<CheckboxControl
					label={"Hide Mature"}
					value={"mature"}
					onChange={onChangeHandler}
					defaultChecked
				/>
			</div>
			<div>
				<CheckboxControl
					label={"Hide PlayChoice10"}
					value={"pc10"}
					onChange={onChangeHandler}
					defaultChecked
				/>
			</div>
			<div>
				<CheckboxControl
					label={"Hide Nintendo Vs"}
					value={"vs"}
					onChange={onChangeHandler}
					defaultChecked
				/>
			</div>
		</fieldset>
	);
}
