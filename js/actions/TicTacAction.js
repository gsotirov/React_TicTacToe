'use strict';

var Dispatcher = require('../dispatcher/TicTacDispatcher');
var ACTION_SETTINGS = require('../action-settings');

module.exports = {

	addPlayers: function (players) {
	    Dispatcher.dispatch({
			actionType: ACTION_SETTINGS.add,
			players: players
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