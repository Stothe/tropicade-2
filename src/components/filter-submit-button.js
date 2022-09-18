/**
 * External Deps
 */
import { Button } from "@wordpress/components";

export default function FilterSubmitButton({ handleCreate, dispatch, state }) {
	if (state.toggleFilter) {
		return (
			<div className="div-filter-submit-button">
				<Button
					className="filter-submit-button"
					onClick={handleCreate}
					variant="primary"
				>
					Let's go!
				</Button>
			</div>
		);
	} else {
		
		return (
			<div className="div-filter-reset-button">
				<Button
					className="filter-reset-button"
					variant="primary"
					onClick={() => dispatch({ type: "resetList" })}
				>
					{" "}
					Reset list{" "}
				</Button>
			</div>
		);
	}
}
