/** @jsx React.DOM */

'use strict';

var React = require('react');

module.exports = React.createClass({

	render: function () {


		var message;

		switch(this.props.result) {
			case 'win':
				message = this.props.activePlayer + ' wins!';
				break;
			case 'draw':
				message = 'It\'s a Draw!';
				break;
			default:
				message = 'It\'s ' + this.props.activePlayer + '\'s turn!';
				break;
		}

		return (
			<div className={ this.props.messageClass }>
				{ message }
			</div>
		);
	}
});