/** @jsx React.DOM */

'use strict';

var React = require('react');
var PlayersStore = require('../stores/PlayersStore');
var TicTacDispatcher = require('../dispatcher/TicTacDispatcher');
var Actions = require('../actions/TicTacAction');

var StartPage = require('./StartPage.react');
var PlayPage = require('./PlayPage.react');

//--------------------------------------------

function getAppState () {
	return {
		activePlayers: PlayersStore.getActivePlayers()
	};
}

// Export the main class...
module.exports = React.createClass({

	getInitialState: function () {
		return getAppState();
	},

	// Just some references to the main store and the dispatcher...
	_store: PlayersStore,
	_dispatcher: TicTacDispatcher,

	componentDidMount: function () {
		this._store.addChangeListener(this._onChangeEvent);
	},

	componentWillUnmount: function () {
		// TODO: Set deactivator to the active Players...
		this._store.removeChangeListener(this._onChangeEvent);
	},

	_onChangeEvent: function () {
		this.setState(getAppState());
	},
	_onFormSubmit: function (e) {
		e.preventDefault();

		var loader = e.target.querySelector('.form-actions').querySelector('.form-loader');
		loader.classList.remove('hidden');
		loader.classList.add('visible');

		var playerNames = [
			e.target['player-one'].value.trim(), 
			e.target['player-two'].value.trim()
		];
		
		if(playerNames[0] !== '' && playerNames[1] !== '') {

			// Added 2s timeout for dramatic effect, otherwise the spinner won't be seen :)
			setTimeout(function () {

				Actions.addPlayers([
					{
						name: playerNames[0],
						score: 0
					},
					{
						name: playerNames[1],
						score: 0
					}
				]);
				loader.classList.remove('visible');
				loader.classList.add('hidden');

			}, 1000);
		}
	},

	render: function () {

		var pageContent = this.state.activePlayers.length === 2 ? (<PlayPage players={this.state.activePlayers}/>) : (<StartPage submitState={this._onFormSubmit}/>)

		return (
			<div id="app-main">
				{ pageContent }
			</div>
		);
	}
});