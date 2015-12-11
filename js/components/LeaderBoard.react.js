/** @jsx React.DOM */

'use strict';

var React = require('react');

var PlayersStore = require('../stores/PlayersStore');

function getState () {
	return {
		players: PlayersStore.getAll()
	};
}

module.exports = React.createClass({

	getInitialState: function () {
		return getState();
	},

	render: function () {

		return (
			<div id="leaderboard">
				<h1 className="title">
					<span className="title-inner">
						Leaderboard
					</span>
				</h1>
				<div className="content">
					<ol type="1" className="players-list">
						{this.state.players.map(function(player) {
				          	return (
				          		<li key={player.id}>
									{player.name}
									<span className="player-score">
										{player.score}
									</span>
				          		</li>
				          	);
				        })}
					</ol>
				</div>
			</div>
		);

	}

});