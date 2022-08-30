/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import uniq from 'lodash'

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
import Mame from './json/mame2003.json';
import ControlsFormPart from './components/controls-form-part';
import NPlayersFormPart from './components/nplayers';
// import ControlsFormPart from './components/controls-form-part';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit() {
	
	return (
		<>
		<p {...useBlockProps()}>
			{__("Tropicade 2 – hello from the editor!", "tropicade-2")}
		</p>
		<form {...useBlockProps.save()} >
		<ControlsFormPart />
		<div>
			<input type='text' value='6' id="num-buttons" name='num-buttons' />
		
			<label for="num-buttons"> buttons (or fewer)</label>
		</div>
		<div>
		<NPlayersFormPart />
		</div>
		<div>		
			<button type="submit"  onsubmit="">Make it so!</button>
		</div>
		</form>
		</>
	);
}
