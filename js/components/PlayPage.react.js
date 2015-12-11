/** @jsx React.DOM */

'use strict';

var React = require('react');
var GameField = require('./GameField.react');
var PlayersList = require('./PlayersList.react');
var MessageBox = require('./MessageBox.react');
var LeaderBoard = require('./LeaderBoard.react');

var ACTION_SETTINGS = require('../action-settings');
var Actions = require('../actions/TicTacAction');

var field = (function () {

	var field = [];

	for(var i = 0; i < 3; i++) {
		field[i] = [];
		for(var j = 0; j < 3; j++) {
			field[i][j] = null;
		}
	}
	return field;
})();

var marks = {
	0: 'zero',
	1: 'cross'
};

var activeCells = [];

module.exports = React.createClass({

	getInitialState: function () {
		return {
			gameComplete: false,
			moveCount: 0,
			drawCount: 0,
			players: this.props.players,
			nowPlaying: 0,
			messageClass: 'alert-info',
			newButtonClass: 'hidden'
		};
	},

	_setMark: function (e) {

		var cell = e.target;

		if(this.state.gameComplete || !cell.classList.contains('is-empty')) {
			return;
		}

		this.setState({
			moveCount: this.state.moveCount + 1
		});

		cell.classList.remove('is-empty');
        cell.classList.add('sign-' + marks[this.state.nowPlaying]);
        
        activeCells.push(cell);

        var coordinates = cell.dataset;
        
        var xPos = coordinates['x'],
            yPos = coordinates['y'];
        
        field[yPos][xPos] = this.state.nowPlaying;

        var gameEnded = this._checkForWinner(xPos, yPos);

        if(!gameEnded) {

        	var activePlayer = this.state.nowPlaying ? 0 : 1;
        	this.setState({
        		nowPlaying: activePlayer
        	});
        }

	},

	_checkForWinner: function (x, y) { // We only need the yPos here...

		var winningRow = this._checkRow(y),
			winningCol = this._checkCol(x),
			winningDiag = this._checkDiag(),
			winningRevDiag = this._checkRevDiag();

		var win = winningRow || winningCol || winningDiag || winningRevDiag;
		var draw = this.state.moveCount >= 8 && !win;

		if(win) {
			this._handleWin();
			return true;
		}

		if(draw) {
			this._handleDraw();
			return true;
		}

		return false;
	},

	_checkRow: function (y) {

		var a = field[y][0], 
			b = field[y][1], 
			c = field[y][2];

		return (a === b && a === c && a === this.state.nowPlaying);
	}, 

	_checkCol: function (x) {

		var a = field[0][x], 
			b = field[1][x], 
			c = field[2][x];

		return (a === b && a === c && a === this.state.nowPlaying);
	},

	_checkDiag: function () {

		var a = field[2][0], 
			b = field[1][1], 
			c = field[0][2];

		return (a === b && a === c && a === this.state.nowPlaying);
	},

	_checkRevDiag: function () {

		var a = field[0][0], 
			b = field[1][1], 
			c = field[2][2];

		return (a === b && a === c && a === this.state.nowPlaying);
	},

    _newGame: function () {
        
		this.setState({
			moveCount: 0,
			nowPlaying: 0,
			gameComplete: false,
			result: '',
			messageClass: 'alert-info',
			newButtonClass: 'hidden'
		});

        this._resetBoard();
    },

	_handleWin: function () {
		this.setState({
			gameComplete: true,
			result: 'win',
			messageClass: 'alert-success',
			newButtonClass: 'visible'
		});

		Actions.updatePlayerScore(
			this.state.players[this.state.nowPlaying].name, 
			this.state.players[this.state.nowPlaying].score + 1
		);
	},

	_handleDraw: function () {
		this.setState({
			result: 'draw',
			drawCount: this.state.drawCount + 1,
			newButtonClass: 'visible'
		});
	},

	_resetBoard: function () {

		for(var i = 0; i < activeCells.length; i++) {

			activeCells[i].className = 'game-cell is-empty';
		}

		for(var i = 0; i < 3; i++) {
			field[i] = [];
			for(var j = 0; j < 3; j++) {
				field[i][j] = null;
			}
		}
	},

	render: function () {
		
		return (
			<div id="play-page" className="clearfix">
				<LeaderBoard />
				<MessageBox result={this.state.result} messageClass={ this.state.messageClass } activePlayer={ this.state.players[this.state.nowPlaying].name }/>
				<div className="col-md-6">
					<GameField cellClick={ this._setMark }/>
				</div>
				<div className="col-md-6">
					<PlayersList players={ this.state.players }/>
					<div className="moves">
						Moves: { this.state.moveCount }
					</div>
					<div className="draws">
						Draws: { this.state.drawCount }
					</div>
					<button id="new-game" className={this.state.newButtonClass} onClick={this._newGame}>New Game</button>
				</div>
			</div>
		);
	}
});