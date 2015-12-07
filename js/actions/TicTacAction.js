'use strict';

var Dispatcher = require('../dispatcher/TicTacDispatcher');
var ACTION_SETTINGS = require('../action-settings');

module.exports = {

	addPlayers: function (names) {
		Dispatcher.dispatch({
			actionType: 'PLAYERS_ADD',
			playerNames: names
		});
	},
	updatePlayerScore: function (name, score) {
		Dispatcher.dispatch({
			actionType: ACTION_SETTINGS.updateScore,
			pName: name,
			score: score
		});
	}
};