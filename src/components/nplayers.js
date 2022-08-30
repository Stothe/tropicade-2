/**
 * external dependencies
 */
 import { useState, useEffect } from '@wordpress/element'
 import { map, filter } from "lodash";

/**
 * local dependencies
 */
import Players from "../json/number-players-options.json";
import CheckboxControl from "./checkbox-control.js";

export default function NPlayersFormPart({ selectedValues, onChangeHandler, ...props}) {

    const [weirdChecked, setWeirdChecked] = useState(false);
    const handleWeirdClick = () => setWeirdChecked(!weirdChecked);
    // const handleNplayersSelect = (e) => {
    //     if (e.target.checked) {
    //         setNplayersClicked([...nplayersClicked, e.target.value]);            
    //       } else {
    //         setNplayersClicked(filter(nplayersClicked, (v) => v !== e.target.value));           
    //       }
    //     };

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
                                onChange={onChangeHandler}
                                />
                       )
                    } else if (weirdChecked) {
                        return (           
                            <CheckboxControl
                                key={index}
                                label={control.label}
                                value={control.value}
                                onChange={onChangeHandler}
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
