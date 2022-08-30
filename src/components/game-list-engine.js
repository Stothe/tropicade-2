import { map, filter } from "lodash";
import { useState, useEffect, useMemo } from "@wordpress/element";

import Games from "../json/mame2003.json";

export default function GameList(gamesFiltered, ...props) {
	// const gamesDetails = Games.elements[1].elements;
	// const [gamesFiltered, setGamesFiltered] = useState([]);
	// const tempFilter = "joy4way";
    // const hackyArray = [];
	// console.log(
	// 	gamesDetails[77].elements.find((e) => e.name == "input").attributes.control
    // )

    //     {map(gamesDetails, (e) => { 
    //         try {
    //             const input = e.elements.find((a) => a.name == "input").attributes.control;
    //             if(input === control) {
    //                hackyArray.push(e);
    //             }
    //         } catch(error) {
    //             console.log(error);
    //         }
    //     } ) }
     
    // useEffect( () => {
    //  setGamesFiltered([...gamesFiltered, hackyArray])
    // },[])
    console.log(gamesFiltered.length);
    return null;

    if( gamesFiltered.length < 1) {return null}
    else {
        return 
        <ul className="filter-results" >
            
            {
              gamesFiltered.forEach(e => {
                console.log(e)
                return(
                  <li>{e}</li>
                )
              })
            }
            </ul>
    }


}
