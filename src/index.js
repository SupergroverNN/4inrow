import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



class Board extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        squares: [
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0]
        ],
        counts: Array(7).fill(5),
        redIsNow: true
      };
    }
    // обработка нажатия на ячейку
    handleClick (i) {
      // debugger
      const squares = this.state.squares.slice();
      const counts = this.state.counts.slice();
      let col = i % 7;
      let line = counts[col];
      if(checkWin(squares, counts) || counts[col] < 0) {
        return;
      }
      squares[line][col] = this.state.redIsNow ? 'red' : 'blue';
      counts[col]--;
      this.setState({
        squares: squares,
        redIsNow: !this.state.redIsNow,
        counts: counts
      });
    }

    // меняем класс ячейки в зависимости от значения
    getClass = (i) => {
      let line = Math.floor(i / 7);
      let row = i % 7;
      let value = this.state.squares[line][row];
      if (value === 0) {
        return '';
      }
      return ` ${value}`;
    }
    
    // генерируем ячейку
    renderSquare = (i) => {
      return (
        <button className={`square${this.getClass(i)}`} onClick={() => this.handleClick(i)}></button>
      )
    }

    render() {
      let status;
      let winner = checkWin(this.state.squares, this.state.counts);
      if (winner === 'draw') {
        status = 'DRAW';
      } else if(winner) {
        status = `${winner === 'red' ? 'Red' : 'Blue'} player WIN!`;
      } else {
        status = `Current player: ${this.state.redIsNow ? 'Red' : 'Blue'} `;
      }

      return (
        <div className="gameboard">
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            {this.renderSquare(6)}
          </div>
          <div className="board-row">
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            {this.renderSquare(9)}
            {this.renderSquare(10)}
            {this.renderSquare(11)}
            {this.renderSquare(12)}
            {this.renderSquare(13)}
          </div>
          <div className="board-row">
            {this.renderSquare(14)}
            {this.renderSquare(15)}
            {this.renderSquare(16)}
            {this.renderSquare(17)}
            {this.renderSquare(18)}
            {this.renderSquare(19)}
            {this.renderSquare(20)}
          </div>
          <div className="board-row">
            {this.renderSquare(21)}
            {this.renderSquare(22)}
            {this.renderSquare(23)}
            {this.renderSquare(24)}
            {this.renderSquare(25)}
            {this.renderSquare(26)}
            {this.renderSquare(27)}
          </div>
          <div className="board-row">
            {this.renderSquare(28)}
            {this.renderSquare(29)}
            {this.renderSquare(30)}
            {this.renderSquare(31)}
            {this.renderSquare(32)}
            {this.renderSquare(33)}
            {this.renderSquare(34)}
          </div>
          <div className="board-row">
            {this.renderSquare(35)}
            {this.renderSquare(36)}
            {this.renderSquare(37)}
            {this.renderSquare(38)}
            {this.renderSquare(39)}
            {this.renderSquare(40)}
            {this.renderSquare(41)}
          </div>
        </div>
      );
    }
}

class Game extends React.Component {
  render () {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

ReactDOM.render( <Game />, document.getElementById('root') );

// проверяем на выйгрыш
function checkWin (squares, counts) {
  let checkDraw = 7;
  for(let count of counts) {
    if (count < 0) {
      checkDraw--;
    }
  }
  console.log(checkDraw);
  if(checkDraw === 0) {
    return 'draw';
  }
  let lineSquares = squares[0].concat(squares[1],squares[2],squares[3],squares[4],squares[5]);
  const lines = [
    // vertical
    [0, 7, 14, 21], [7, 14, 21, 28], [14, 21, 28, 35],
    [1, 8, 15, 22], [8, 15, 22, 29], [15, 22, 29, 36],
    [2, 9, 16, 23], [9, 16, 23, 30], [16, 23, 30, 37],
    [3, 10, 17, 24], [10, 17, 24, 31], [17, 24, 31, 38],
    [4, 11, 18, 25], [11, 18, 25, 32], [14, 21, 28, 35],
    [5, 12, 19, 26], [12, 19, 26, 33], [19, 26, 33, 40],
    [6, 13, 20, 27], [13, 20, 27, 34], [20, 27, 34, 41],
    // horizontal 
    [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
    [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13],
    [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 18, 19], [17, 18, 19, 20],
    [21, 22 , 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27],
    [28, 29, 30, 31], [29, 30, 31, 32], [30, 31, 32, 33], [31, 32, 33, 34],
    [35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41],
    // diagonal1
    [14, 22, 30, 38],[7, 15, 23, 31],[0, 8, 16, 24],[1, 9, 17, 25],[2, 10, 18, 26],[3, 11, 19, 27],
    [15, 23, 31, 39],[8, 16, 24, 32],[16, 24, 32, 40],[9, 17, 25, 33],[17, 25, 33, 41],[10, 18, 26, 34],
    // diagonal2
    [3, 9, 15, 21],[4, 10, 16, 22],[5, 11, 17, 23],[6, 12, 18, 24],[13, 19, 25, 31],[10, 16, 22, 28],
    [11, 17, 23, 29],[12, 18, 24, 30],[17, 23, 29, 35],[18, 24, 30, 36],[19, 25, 31, 37],[20, 26, 32, 38]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (lineSquares[a] !== 0 && lineSquares[a] === lineSquares[b] && lineSquares[a] === lineSquares[c] && lineSquares[a] === lineSquares[d]) {
      return lineSquares[a];
    }
  }
  return null;
}