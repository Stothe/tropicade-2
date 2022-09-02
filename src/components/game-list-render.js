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
