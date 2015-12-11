'use strict';

var React = require('react');

var TicTacDispatcher = require('../dispatcher/TicTacDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ACTION_SETTINGS = require('../action-settings');

var CHANGE_EVENT = 'change';

var id = 0;
var players = [];

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
		return players.filter(function (player) {
			return player.active === true;
		});
	},

	getAll: function () {
		return players;
	},

	add: function (player) {

		player.id = ++id;
		player.active = true;

		players.push(player);
	},

	updateScore: function (name, newScore) {

		for (var i = 0; i < players.length; i++) {
			if (players[i].name === name) {
				players[i].score = newScore;
			}
		}

	},

	destroy: function (id) {
		delete players[id];
	}

});

TicTacDispatcher.register(function (payload) {

	var action = payload.actionType;
	var players = [];

	switch (action) {

		case ACTION_SETTINGS.add:

			players = payload.players;

			if (players.length > 0) {

				for (var i = 0; i < players.length; i++) {
					PlayersStore.add(players[i]);
				}
				// Emit the change so the other components know about it and update accordingly.
				PlayersStore.emitChange();
			}
			break;

		case ACTION_SETTINGS.updateScore:

			var name = payload.pName,
				score = payload.score;

			if (score && typeof score === 'number') {

				PlayersStore.updateScore(name, score);

				// Emit the change so the other components know about it and update accordingly.
				PlayersStore.emitChange();
			}
			break;

		default: 
			break;
	}
});

module.exports = PlayersStore;

