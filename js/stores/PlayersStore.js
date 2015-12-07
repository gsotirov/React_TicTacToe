'use strict';

var React = require('react');

var TicTacDispatcher = require('../dispatcher/TicTacDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ACTION_SETTINGS = require('../action-settings');

var CHANGE_EVENT = 'change';

var id = 0;
var _players = [];

var PlayersStore = assign({}, EventEmitter.prototype, {

	emitChange: function () {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function (callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function (callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	getActivePlayers: function () {
		return _players.filter(function (player) {
			return player.active === true;
		});
	},

	getAll: function () {
		return _players;
	},

	add: function (names) {
		for(var i = 0; i < names.length; i++) {
			_players.push({
				id: ++id,
				name: names[i],
				score: 0,
				active: true
			});
		}
	},

	updateScore: function (name, newScore) {

		for(var i = 0; i < _players.length; i++) {
			if(_players[i].name === name) {
				_players[i].score = newScore;
			}
		}

	},

	destroy: function (id) {
		delete _players[id];
	}

});

TicTacDispatcher.register(function (payload) {

	var action = payload.actionType;
	var playerNames = '';

	switch(action) {
		case ACTION_SETTINGS.add:
			playerNames = payload.playerNames;
			if(playerNames.length > 0) {
				PlayersStore.add(playerNames);
				PlayersStore.emitChange();
			}
			break;

		case ACTION_SETTINGS.updateScore:

			var name = payload.pName,
				score = payload.score;

			if(score && typeof score === 'number') {
				PlayersStore.updateScore(name, score);
				PlayersStore.emitChange();
			}
			break;
		default: 
	}
});

module.exports = PlayersStore;

