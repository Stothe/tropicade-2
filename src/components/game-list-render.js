/**
 * External deps
 */
import { map } from "lodash";
import { Button, Dropdown, ToggleControl } from "@wordpress/components";


/**
 * Local deps
 */
import downloadToFile from "../util/downloader.js";
import { CheckboxControl, CustomButton } from "./checkbox-control.js";
import Trash from "../img/trash.svg"




export default function GameListRender({ games, onChangeHandler}) {

	return (
		<>
			<div className="game-list-action-span">
				<div>{games.length} games</div>
				<div>
					<Dropdown
						className="my-container-class-name"
						contentClassName="my-popover-content-classname"
						position="bottom right"
						renderToggle={({ isOpen, onToggle }) => (
							<Button
								variant="primary"
								onClick={onToggle}
								aria-expanded={isOpen}
							>
								Export...
							</Button>
						)}
						renderContent={() => (
							<>
								<Button
									onClick={() => downloadToFile(games, "copyStub")}
									variant="tertiary"
								>
									{" "}
									Copy files stub{" "}
								</Button>
								<Button
									onClick={() => downloadToFile(games, "attract")}
									variant="tertiary"
								>
									{" "}
									Attract Mode rom list{" "}
								</Button>{" "}
							</>
						)}
					/>
				</div>
			</div>
			<table className="gamelist-table">
				<tr className="gl-header">
					<th>Delete</th>		
					<th>Game</th>
					<th>Year</th>
					<th>Manufacturer</th>
				</tr>
				
				{map(games, (e) => {
					const rom = e.rom
					return (						
						<tr className="list-row">
							<td className="gl-trash">
							<CustomButton
								type="image"
								alt="delete button"
								className="list-trash-btn"
								src={Trash}
								value={rom}							
								onClick={ onChangeHandler }
							/>
							
							</td>
							<td className="gl-title">{e.title}</td>
							<td className="gl-year">{e.year}</td>
							<td className="gl-manu">{e.manufacturer}</td>
						</tr>
					);
				})}
				
			</table>
		</>
	);
}
