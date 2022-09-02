/**
 * WP dependencies
 */
import { useState, useEffect } from "@wordpress/element";

/**
 * local dependencies
 */
import Controls from "../json/control-options.json";
import CheckboxControl from "./checkbox-control.js";

export default function  ControlsFormPart({ selectedValues, onChangeHandler, ...props}) {
	
	return (
		<div>
			<fieldset className="controls-fieldset">
				<legend>Select Controls</legend>
				<div className="individual-control-checkboxes">
					{Controls.map((e, index ) => {
						return (
							<CheckboxControl
                                key={index}
                                label={e.label}
                                value={e.value}
                                onChange={onChangeHandler}
								defaultChecked={e.default}
                            />
						);
					})}
				</div>
			</fieldset>
		</div>
	);
};
