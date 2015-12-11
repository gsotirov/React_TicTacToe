/** @jsx React.DOM */

'use strict';

var React = require('react');

var Cell = require('./Cell.react');

module.exports = React.createClass({

	render: function () {

		var gameCells = [];

		for(var i = 0; i < 3; i++) {
			gameCells[i] = <Cell xCoord={ i } yCoord={ this.props.coord } cellClick={ this.props.cellClick }/>;
		}

		return (
			<div className="gameRow clearfix">
				{ gameCells }
			</div>
		);
	}
});