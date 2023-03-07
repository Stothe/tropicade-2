import { Button } from '@wordpress/components'
import { useState, useReducer, useDispatch } from '@wordpress/element'
import * as ReactDOM from 'react-dom'
import { filter, find } from 'lodash'

import './style.scss'
import {
  ControlsFormPart,
  NPlayersFormPart,
  GameListRender,
  CheckBoxControl,
  MiscSettingsFormPart,
  CategoryFormPart,
  GameCardModal,
  SearchBox,
  FilterHeading,
  FilterWrapper,
  FilterSubmitButton
} from './components'
import gameListEngine from './util/game-list-engine'

const divsToUpdate = document.querySelectorAll('.form-goes-here')
divsToUpdate.forEach(function (div) {
  ReactDOM.render(<Form />, div)
})

function Form () {
  /**
	 * States
	 */

  const [openGameDetail, setOpenGameDetail] = useState(false)
  const [numButtons, setNumButtons] = useState(6)
  const [gamesFiltered, setGamesFiltered] = useState([])
  const [selectedGame, setSelectedGame] = useState(null)
  const [singleGameAdded, setSingleGameAdded] = useState(false)

  /**
	 * Checkboxes reducer
	 */
  const boxesInitialState = {
    category: [],
    nPlayersClicked: ['2P alt', '2P sim', '3P alt', '4P alt'],
    filters: ['clones', 'mature', 'casino', 'mahjong', 'pc10', 'vs'],
    controlsClicked: ['joy2way', 'vjoy2way', 'joy4way', 'joy8way'],
    screenOrientation: ['0', '90']
  }

  const [boxesState, boxesDispatch] = useReducer(
    boxesReducer,
    boxesInitialState
  )

  function boxesReducer (boxesState, action) {
    const value = action.value
    const boxType = action.type
    switch (action.checked) {
      case true:
        return { ...boxesState, [boxType]: [...boxesState[boxType], value] }
      case false:
        return {
          ...boxesState,
          [boxType]: filter(boxesState[boxType], (e) => e !== value)
        }
      default:
        console.log('oops state action failed')
    }
  }

  /**
	 * generic reducer
	 */

  const initialState = {
    toggleFilter: true,
    listShowing: false
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  function reducer (state, action) {
    switch (action.type) {
      case 'filterTrue':
        return {
          ...state,
          toggleFilter: true
        }
      case 'filterFalse':
        return {
          ...state,
          toggleFilter: false
        }
      case 'resetList':
        setGamesFiltered([])
        return {
          ...state,
          toggleFilter: true,
          listShowing: false
        }
      case 'listShowing':
        return {
          ...state,
          listShowing: true
        }

      default:
        console.log('no generic state found')
    }
  }
  /**
	 * end reducers
	 */

  function handleGamesFiltered (e) {
    if (singleGameAdded) {
      setGamesFiltered([...gamesFiltered, ...e])
    } else {
      setGamesFiltered(e)
    }
    setSingleGameAdded(false)
  }

  const handleGameDelete = (e) => {
    e.preventDefault()
    const rom = e.target.value
    setGamesFiltered(filter(gamesFiltered, (g) => g.rom !== rom))
  }

  const handleGameAdd = (e, game) => {
    e.preventDefault()
    setGamesFiltered([...gamesFiltered, game])
    setSingleGameAdded(true)
  }

  const toggleGameDetail = (event, game) => {
    event.preventDefault()
    setSelectedGame(game)
    setOpenGameDetail(true)
  }

  const closeGameDetail = (e) => {
    setOpenGameDetail(false)
  }

  const handleCreate = () => {
    gameListEngine(numButtons, handleGamesFiltered, boxesState)
    dispatch({ type: 'filterFalse' })
    dispatch({ type: 'listShowing' })
  }

  const isInList = (e) => {
    if (!gamesFiltered || gamesFiltered.length < 1) {
      return null
    } else if (!find(gamesFiltered, { rom: e })) {
      return null
    } else {
      return true
    }
  }

  return (
		<div>
			{selectedGame && openGameDetail
			  ? (
				<GameCardModal
					game={selectedGame}
					openGameDetail={openGameDetail}
					closeModal={(event) => closeGameDetail(event)}
					onAddGame={handleGameAdd}
					onDelGame={handleGameDelete}
					isInList={isInList}
				/>
			    )
			  : null}

			<form>
			<SearchBox
				openGameCard={toggleGameDetail}
				onAddGame={handleGameAdd}
				onDelGame={handleGameDelete}
				dispatch={dispatch}
				state={state}
				isInList={isInList}
			/>
				<FilterWrapper filterDisplay={state.toggleFilter}>
					<FilterHeading />
					<div>
						<MiscSettingsFormPart
							numButtons={numButtons}
							onButtonUpdateHandler={(event) =>
							  setNumButtons(event.target.value)
							}
							boxesDispatch={boxesDispatch}
						/>
					</div>
					<div></div>
					<div>
						<CategoryFormPart
							selectedValues={boxesState.category}
							hideCats={boxesState.filters}
							boxesDispatch={boxesDispatch}
						/>
					</div>
					<ControlsFormPart
						selectedValues={boxesState.controlsClicked}
						boxesDispatch={boxesDispatch}
					/>
					<div>
						<NPlayersFormPart
							selectedValues={boxesState.nPlayersClicked}
							boxesDispatch={boxesDispatch}
						/>
					</div>
				</FilterWrapper>
				<FilterSubmitButton
					handleCreate={() => handleCreate()}
					dispatch={dispatch}
					state={state}
				/>

				{gamesFiltered.length > 0
				  ? (
					<GameListRender
						games={gamesFiltered}
						onChangeHandler={handleGameDelete}
						onClickHandler={toggleGameDetail}
					/>
				    )
				  : null}
			</form>

		</div>
  )
}
