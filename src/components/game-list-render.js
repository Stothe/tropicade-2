/**
 * External deps
 */
import { map } from "lodash";
import { Button, Dropdown } from "@wordpress/components";

/**
 * Local deps
 */
import downloadToFile from "../util/downloader.js";

export default function GameListRender(props) {
	const { games } = props;
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
			<table>
				<tr>
					<th>Game</th>
					<th>Year</th>
					<th>Manufacturer</th>
				</tr>
				{map(games, (e) => {
					return (
						<tr>
							<td>{e.title}</td>
							<td>{e.year}</td>
							<td>{e.manufacturer}</td>
						</tr>
					);
				})}
			</table>
		</>
	);
}
