/** @jsx React.DOM */

'use strict';

var React = require('react');

module.exports = React.createClass({

	render: function () {

		return (
			<div 
				onClick={this.props.cellClick}
				className="game-cell is-empty" 
				data-x={this.props.xCoord} 
				data-y={this.props.yCoord}>
			</div>
		);
	}
});