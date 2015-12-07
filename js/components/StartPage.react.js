/** @jsx React.DOM */

'use strict';

var React = require('react');

module.exports = React.createClass({
	render: function () {
		return (
			<section>
				<div id="logo">
					<img src="img/logo.png" />
					<h1>Tic Tac Toe</h1>
				</div>
				<form id="start-form" onSubmit={ this.props.submitState }>
					<h4>
						Please enter your names bellow
					</h4>
					<div className="form-group">
						<label htmlFor="player-name"/>
						<input type="text" name="player-one" placeholder="Player One name..." />
					</div>
					<div className="form-group">
						<label htmlFor="player-name"/>
						<input type="text" name="player-two" placeholder="Player Two name..." />
					</div>
					<div className="form-actions">
						<span className="form-loader hidden"></span>
						<input type="submit" name="submit" value="Let's Play"/>
					</div>
				</form>
			</section>
		);
	}
});