/** @jsx React.DOM */

'use strict';

var React = require('react');
var Row = require('./Row.react');

module.exports = React.createClass({

	render: function () {

		var gameRows = [];

		for(var i = 0; i < 3; i++) {
			gameRows[i] = <Row coord={ i } cellClick={ this.props.cellClick }/>;
		}

		return (
			<div id="game-field">
				{ gameRows }
			</div>
		);
	}

});