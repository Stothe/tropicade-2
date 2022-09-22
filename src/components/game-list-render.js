/**
 * External deps
 */
import { map, find } from "lodash";
import {
	Button,
	Dropdown,
	DropdownMenu,
	ToggleControl,
} from "@wordpress/components";
import { useState } from "@wordpress/element";

/**
 * Local deps
 */
import downloadToFile from "../util/downloader.js";
import { CheckboxControl, CustomButton } from "./checkbox-control.js";
import Trash from "../img/trash.svg";
import GameDetailModal from "./game-detail-card.js";

export default function GameListRender({
	games,
	onChangeHandler,
	onClickHandler,
}) {
	const [singleGame, setSingleGame] = useState({});
	const [paginate, setPaginate] = useState([0, 24]);
	const [resultsPerPage, setResultsPerPage] = useState(25);

	const updateResultsPerPage = (e) => {
		const numberPP = parseInt(e);
		setResultsPerPage(numberPP);
		setPaginate([paginate[0], paginate[0] + numberPP]);
	};

	const handlePaginateForward = () => {
		if (resultsPerPage + paginate[1] > games.length) {
			setPaginate([paginate[0] - resultsPerPage, games.length]);
			return;
		} else {
			setPaginate(paginate.map((e) => e + resultsPerPage));
		}
	};

	const handlePaginateBack = () => {
		if (paginate[0] - resultsPerPage < 0) {
			setPaginate([0, paginate[1]]);
			return;
		} else {
			setPaginate(paginate.map((e) => e - resultsPerPage));
		}
	};

	const ResultsPerPageDropdown = () => (
		<DropdownMenu
			label="results per page"
			className="pagination-dropdown"
			controls={[
				{
					title: "25",
					onClick: () => updateResultsPerPage(25),
				},
				{
					title: "50",
					onClick: () => updateResultsPerPage(50),
				},
				{
					title: "100",
					onClick: () => updateResultsPerPage(100),
				},
				{
					title: "500",
					onClick: () => updateResultsPerPage(500),
				},
				{
					title: "All",
					onClick: () => updateResultsPerPage(games.length),
				},
			]}
		/>
	);

	const PaginateControls = () => (
		<div className="results-pagination-div">
					<table>
						<tr className="results-pagination-tr">
							<td>
								{paginate[0] > 0 ? (
									<Button className="back-button" onClick={handlePaginateBack}>
										⬅️
									</Button>
								) : null}
							</td>
							<td className="paginate-count">
								Games {paginate[0] + 1} - {paginate[1] + 1} of {games.length}{" "}
							</td>
							<td>
								{games.length > paginate[1] ? (
									<Button
										className="next-button"
										onClick={handlePaginateForward}
									>
										➡️
									</Button>
								) : null}
							</td>
							<td className="results-per-page">
								{" "}
								Show {resultsPerPage} games per page.{" "}
							</td>
							<td className="pagination-filter-dropdown-wrapper">
								<ResultsPerPageDropdown />
							</td>
						</tr>
					</table>
				</div>
	)

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
			{games.length > 24 && (
				<PaginateControls />
			)}
			<table className="gamelist-table">
				<tr className="gl-header">
					<th>Delete</th>
					<th>Game</th>
					<th>Year</th>
					<th>Manufacturer</th>
				</tr>

				{map(games, (e, index) => {
					const rom = e.rom;
					if (!e.title) {
						return;
					}
					if (index > paginate[1]) {
						return false;
					} else if (index < paginate[0]) {
						return;
					}
					return (
						<tr className="list-row">
							<td className="gl-trash">
								<CustomButton
									type="image"
									alt="delete button"
									className="list-trash-btn"
									src={Trash}
									value={rom}
									onClick={onChangeHandler}
								/>
							</td>
							<td className="gl-title">
								<a
									href="javascript:void(0)"
									className="game-list-link"
									value={e}
									onClick={() => onClickHandler(event, e)}
								>
									{e.title}
								</a>
							</td>
							<td className="gl-year">{e.year}</td>
							<td className="gl-manu">{e.manufacturer}</td>
						</tr>
					);
				})}
			</table>
			{games.length > 24 && (
				<PaginateControls />
			)}
		</>
	);
}
