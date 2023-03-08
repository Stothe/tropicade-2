/**
 * External dependencies
 */
import { map, filter, find, orderBy, includes } from 'lodash'
import { useEffect, useState } from '@wordpress/elements'

/**
 * Local dependencies
 */
import { specialClones, Mature, Casino, Mahjong, NPlayers, supplementalList, Games } from '../json'
import substitueTwoPlayerVersion from './four-to-two-player-conversion'
import sanitizeControls from './controls'

export default function gameListEngine (
  maxButtons,
  handleGamesFiltered,
  boxesState,
  searchTerm,
  jobType = 'list'
) {
  const gamesToAddArray = []
  const gamesTargets = Games.game

  //   const sanitizeControls = (ctl) => {
  //     try {
  //       if (ctl.input.control._type) {
  //         return ctl.input.control._type
  //       } else {
  //         return 'buttons only'
  //       }
  //     } catch {
  //       // sometimes the data has a goofy value so we just assume buttons only
  //       return 'buttons only'
  //     }
  //   }

  //   const handleTwoPlayer = (e) => {
  //     if (
  //       boxesState.nplayersClicked.indexOf('2P sim') >= 0 && boxesState.nplayersClicked.indexOf('4P sim') < 0
  //     ) {
  //       // push parent
  //       const parentRom = find(gamesTargets, { _name: e._cloneof })

  //       gamesToAddArray.push({
  //         rom: parentRom._name,
  //         gamelistIgonre: true
  //       })
  //     }
  //   }

  map(gamesTargets, (e) => {
    try { // generic try/catch to prevent errors from crashing the app
      const controller = sanitizeControls(e)
      const clone = !!e._cloneof
      const buttons = e.input._buttons ? parseInt(e.input._buttons) : 0
      const gameDesc = e.description
      const romName = e._name
      let rotate = e.display._rotate
      const working = e.driver._status
      const year = e.year
      const manufacturer = e.manufacturer
      const extraData = find(supplementalList, { rom: romName })
      const genre = extraData.genre ? extraData.genre : 'Not Classified'
      const description = extraData.desc ? extraData.desc : ''
      const parentCat = genre.length > 1 ? genre.split(',')[0] : genre
      const parentRom = e._cloneof

      // filter for search
      if (jobType !== 'list') {
        if (
          (clone && e._cloneof.includes(searchTerm.toLowerCase())) || gameDesc.toLowerCase().includes(searchTerm.toLowerCase()) || romName.includes(searchTerm.toLowerCase())
        ) {
          // push game to gamesToAddArray
          gamesToAddArray.push({
            rom: romName,
            clone,
            cloneof: parentRom,
            year,
            manufacturer,
            rotate,
            working,
            controller,
            buttons,
            description,
            genre,
            parentCat,
            gamelistIgonre: false
          })
        }
        return
      } else {
        // filter for list
        // filter on orientation
        if (boxesState.screenOrientation.length < 2) {
          if (rotate === '270') {
            rotate = '90'
          }
          if (boxesState.screenOrientation.indexOf(rotate) < 0) {
            return
          }
        }

        // filter on controls and buttons
        if (
          boxesState.controlsClicked.indexOf(controller) < 0 || maxButtons < buttons
        ) {
          return
        }
        // reject clones if option checked (exempt special clones)
        const goodClone = find(specialClones, { rom: romName })
        if (goodClone) {
          if (goodClone.twoPlayer === true) {
            substitueTwoPlayerVersion(e)
          }
        } else if (boxesState.filters.indexOf('clones') > -1 && clone) {
          return
        }

        // check against all filters
        const filterMap = {
          mature: Mature,
          casino: Casino,
          mahjong: Mahjong,
          pc10: ['pc_'],
          vs: ['Vs.'],
          cassette: ['Cassette']
        }

        for (const [filter, values] of Object.entries(filterMap)) {
          if (boxesState.filters.indexOf(filter) > -1) {
            if (values.some((value) => romName.includes(value))) {
              return
            }
          }
        }
      }

      // filter on nPlayers
      // get nplayer value for rom
      let players = NPlayers.find((p) => p.rom === romName)
      players = players.players
      if (jobType !== 'list') {
        // we don't need to filter against anything
      } else {
        // filter nplayer value against selected nplayers
        // nPlayers will sometimes have an invalid value, so we need to catch that
        try {
          if (boxesState.nPlayersClicked.indexOf(players) < 0) {
            return
          }
        } catch (error) {
          console.log(error.message, 'in nplayers filter')
          return
        }
      }

      // push game into temp array
      gamesToAddArray.push({
        rom: romName,
        control: controller,
        buttons,
        title: gameDesc,
        players,
        rotation: rotate,
        status: working,
        manufacturer,
        year,
        clone,
        genre,
        description,
        parentRom
      })
    } catch (error) {
      console.log(error.message, 'in gameListEngine catch')
      // end generic error handling
    }
  })

  // do something with gamesToAddArray
  const orderedArray = orderBy(gamesToAddArray, 'title', 'asc')
  orderedArray.length > 1
    ? handleGamesFiltered(orderedArray)
    : handleGamesFiltered('empty')
}

// scratchpad
