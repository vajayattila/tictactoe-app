import m from "mithril"
import Square from "./Square.js"

var Board={}

Board.getStepNumber=function(vnode){
    return vnode.attrs.gameObj.stepNumber
}

Board.insertSquare=function(vnode, i){
    return m(Square, {index: i, gameObj: vnode.attrs.gameObj})
}

Board.insertRow=function(vnode, i){
    return m("div.board-row", 
        this.insertSquare(vnode, i),
        this.insertSquare(vnode, i+1),
        this.insertSquare(vnode, i+2)
    )
}

Board.view=function(vnode){
    return m("div", 
        this.insertRow(vnode, 0),
        this.insertRow(vnode, 3),
        this.insertRow(vnode, 6)   
    )
}

export default Board