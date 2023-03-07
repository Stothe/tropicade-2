/**
 * external dependencies
 */
 import { useState } from '@wordpress/element'
 import { map, filter } from "lodash";

/**
 * local dependencies
 */
import Players from "../json/number-players-options.json";
import CheckboxControl from "./checkbox-control.js";

export default function NPlayersFormPart({ selectedValues, boxesDispatch, ...props}) {

    const [weirdChecked, setWeirdChecked] = useState(false);
    const handleWeirdClick = () => setWeirdChecked(!weirdChecked);

    return (
        <div>
        <fieldset class='num-players-fieldset'>
        <legend>Select Number of Players</legend>
        <div>
        <input type="checkbox" id="weird" value="weird"  onChange={handleWeirdClick} checked={weirdChecked} />
        <label for="select all">Show unusual configurations</label>               
        </div>
        <div class="players-checkbox-div">
            {
                map(Players, (control, index) => {
                    if (control.common ) {
                        return (           
                            <CheckboxControl
                                key={index}
                                label={control.label}
                                value={control.value}
                                onChange={(e) => boxesDispatch({ type: "nPlayersClicked", value: e.target.value, checked: e.target.checked})}
                                defaultChecked={control.default}
                                />
                       )
                    } else if (weirdChecked) {
                        return (           
                            <CheckboxControl
                                key={index}
                                label={control.label}
                                value={control.value}
                                onChange={() => boxesDispatch({ type: "nPlayersClicked"}, event)}
                                />
                       )
                    }
                })
            }		
        </div>	
        </fieldset>
        </div>
    )
}

//  export default NPlayersFormPart;
