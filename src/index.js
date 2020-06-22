import React from 'react';
import  ReactDOM from 'react-dom';
import './index.css';

/*class Square extends React.Component {
    /*constructor(props){
        super(props);
        this.state = {
            value: null,
        };
    }*

    render(){
        return(
            <button 
                className="square" 
                //onClick={() => this.setState({value: 'X'}) }
                onClick={() => this.props.onClick() }
            >
                {this.props.value}
            </button>
        );
    }
}*/

function Square(props){
    return(
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    /*constructor(props){
        super(props);
        this.state = {
            squares : Array(9).fill(null),
            xIsNext : true,
        };
    }*/

    /*handleClick(i){
        const squares = this.state.squares.slice();

        //verificar si alguien ha ganado o  si un cuadrado ya esta rellenado...
        if( calculateWinner(squares) || squares[i] ){
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares : squares,
            xIsNext : !this.state.xIsNext,
        });
    }*/

    renderSquare(i){
        return(
            <Square 
                value={this.props.squares[i]} 
                estatusJugada={'no'} 
                //onClick={() => this.handleClick(i)}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render(){
        //const status = 'Próximo jugador: X';
        /*const ganador = calculateWinner(this.state.squares);
        let status;

        if(ganador){
            status = 'Ganador: ' + ganador;
        }else{
            status  = 'Próximo jugador: ' + (this.state.xIsNext ? 'X' : 'O');
        }*/

        return(
            <div>
                <div className="board-now">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-now">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-now">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history : [{
                squares : Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext : true,
        }
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1]
        const squares = current.squares.slice();

        //verificar si alguien ha ganado o  si un cuadrado ya esta rellenado...
        if( calculateWinner(squares) || squares[i] ){
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history : history.concat([{
                squares : squares
            }]),
            stepNumber: history.length,
            xIsNext : !this.state.xIsNext,
        });
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render(){
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        //historial de movimientos.
        const moves = history.map( (step,move) => {
            const desc = move ?
                'Ir al movimiento #' + move :
                'Ir al comienzo';
            return(
                <li key={move}>
                    <button onClick={ () => this.jumpTo(move) }>{desc}</button>
                </li>
            );
        });

        let status;
        if(winner){
            status = 'Ganador: ' + winner;
        }else{
            status = 'Próximo en jugar: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return(
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={ (i) => this.handleClick(i) }
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
)

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }