/** @jsx React.DOM */

'use strict';

var React = require('react');

module.exports = React.createClass({
	render: function () {
		
		return (
			<div>
				<h5>
					Now playing:
				</h5>
				<ul className="players-list">
					<li>
						<span className="player-sign">O</span>
						{this.props.players[0].name}
						<span className="player-score">
							{this.props.players[0].score}
						</span>
					</li>
					<li>
						<span className="player-sign">X</span>
						{this.props.players[1].name}
						<span className="player-score">
							{this.props.players[1].score}
						</span>
					</li>
				</ul>
			</div>
		);
	}
});