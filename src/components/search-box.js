/**
 * External Deps
 */
import { Button, Modal, SearchControl } from "@wordpress/components";
import { useState, useDispatch } from "@wordpress/element";
import { map } from "lodash";

/**
 * Internal Deps
 */
import gameListEngine from "../util/game-list-engine";
import plus from "../img/plus.svg";
import { CustomButton } from "./checkbox-control.js";

export default function SearchBox({
	openGameCard,
	onClickHandler,
	dispatch,
	state,
}) {
	const [searchText, setSearchText] = useState("");
	const [results, setResults] = useState([]);
	const [resultsText, setResultsText] = useState("");
	const jobType = "search";

	const keyDownHandler = (e) => {
		if (e.key === "Enter") {
			onSearchHandler(searchText);
		}
	};
	const onChangeHandler = (e) => {
		setSearchText(e);
		setResultsText(null);
	};

	const handleGamesFiltered = (games) => {
		setResults(games);
		setResultsText(searchText);
	};
	const onSearchHandler = () => {
		gameListEngine(null, handleGamesFiltered, null, searchText, jobType);
	};

	//functional components
	const RenderResults = () => {
		if (!resultsText) {
			if (results && !state.listShowing) {
				dispatch({ type: "filterTrue" });
				setResults(null);
			}
			return null;
		} else if (results === "empty") {
			return (
				<div className="search-no-results">
					{" "}
					No results found for {resultsText}
				</div>
			);
		} else {
			if (state.toggleFilter) {
				dispatch({ type: "filterFalse" });
			}
			return (
				<div div className="search-results-list">
					<h2>
						{results.length} Results for {resultsText}
					</h2>
					<table className="search-results-list-table">
						<tr className="search-results-list-table-heading">
							<th>Add to list</th>
							<th>Game Title</th>
							<th>ROM</th>
							<th>Parent ROM</th>
						</tr>
						{map(results, (r) => {
							return (
								<tr className="search-results-list-table-row">
									<td className="search-results-add">
										<CustomButton
											type="image"
											alt="add button"
											className="search-add-btn"
											src={plus}
											onClick={() => onClickHandler(event, r)}
										/>
									</td>
									<td className="search-results-title">
										<a
											href="javascript:void(0)"
											className="search-results-list-link"
											value={r.title}
											onClick={() => openGameCard(event, r)}
										>
											{r.title}
										</a>
									</td>
									<td className="search-results-rom">{r.rom}</td>
									<td className="search-results-parent">
										{r.parentRom ? r.parentRom : "n/a"}
									</td>
								</tr>
							);
						})}
					</table>
				</div>
			);
		}
	};

	return (
		<>
			<div className="search-form">
				<SearchControl
					label="Title Search"
					className="search-form-field"
					value={searchText}
					onChange={onChangeHandler}
					onKeyDown={keyDownHandler}
				/>
				<Button
					variant="primary"
					onClick={() => onSearchHandler(searchText)}
					className="search-form-submit"
				>
					Search
				</Button>
			</div>
			<RenderResults />
		</>
	);
}
