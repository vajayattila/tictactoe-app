import m from "mithril"
import Board from "./Board.js"
import Moves from "./Moves.js"

var Game={}

Game.oninit=function(vnode){
    this.history=[{
        squares: Array(9).fill(null)
    }]
    this.xIsNext=true
    this.stepNumber=0
    this.thereIsAWinner=false
}

Game.view=function(vnode){
    return m(".game", 
        m(".game-board", 
            m(Board, {gameObj: this})
        ),
        m(".game-info", 
            m(".status", this.getStatus()),
            m(Moves, {gameObj: this})
        )
    )    
}

Game.getCurrent=function(){
    const hist = this.history.slice(0, this.stepNumber + 1);
    const current = hist[hist.length - 1];
    return current
}

Game.handleClick=function(gameObj, i){
    const hist = gameObj.history.slice(0, gameObj.stepNumber + 1);
    const current = hist[hist.length - 1];
    const squares = current.squares.slice();
    if (gameObj.calculateWinner(squares) || squares[i]) {
        return;
    }
    squares[i]=gameObj.xIsNext ? 'X' : 'O';
    gameObj.history=hist.concat([{
        squares: squares
    }])
    gameObj.stepNumber=gameObj.history.length-1
    gameObj.xIsNext=!gameObj.xIsNext 
}

Game.calculateWinner=function(squares) {
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

Game.getStatus=function(){
    const current = this.getCurrent();     
    const winner = this.calculateWinner(current.squares) 
    let status=null
    if (winner) {
        status = 'Winner: ' + winner
        this.thereIsAWinner = true
    } else {
        status = 'Next player: ' + (this.xIsNext ? 'X' : 'O')
    }
    return status
}

Game.jumpTo=function(gameObj, step){
    gameObj.stepNumber=step,      
    gameObj.xIsNext=(step % 2) === 0    
}

export default Game