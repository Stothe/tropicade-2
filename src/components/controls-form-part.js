/**
 * External dependencies
 */
import { useState, useEffect } from "@wordpress/element";
import {map} from "lodash";

/**
 * local dependencies
 */
import Controls from "../json/control-options.json";
import CheckboxControl from "./checkbox-control.js";

export default function  ControlsFormPart({ selectedValues, boxesDispatch, ...props}) {
	
	return (
		<div>
			<fieldset className="controls-fieldset">
				<legend>Select Controls</legend>
				<div className="individual-control-checkboxes">
					{map (Controls, (e, index ) => {
						return (
							<CheckboxControl
                                key={index}
                                label={e.label}
                                value={e.value}
                                onChange={(e) => boxesDispatch({ type: "controlsClicked", value: e.target.value, checked: e.target.checked})}
								defaultChecked={e.default}
                            />
						);
					})}
				</div>
			</fieldset>
		</div>
	);
};
