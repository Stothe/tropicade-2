/**
 * External deps
 */
import { map } from "lodash";
import { Button } from "@wordpress/components";

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
					<Button onClick={() => downloadToFile(games)} variant="primary">
						{" "}
						Download!{" "}
					</Button>
				</div>
			</div>
			<table>
				<tr>
					<th>Game</th>
					<th>Players</th>
					<th>Rom</th>
					<th>Control</th>
					<th>Buttons</th>
				</tr>
				{map(games, (e) => {
					return (
						<tr>
							<td>{e.title}</td>
							<td>{e.players}</td>
							<td>{e.rom}</td>
							<td>{e.control}</td>
							<td>{e.buttons}</td>
						</tr>
					);
				})}
			</table>
		</>
	);
}
