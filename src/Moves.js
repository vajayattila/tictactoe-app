import m from "mithril"

var Moves={}

Moves.getMoves=function(vnode){
    const moves = vnode.attrs.gameObj.history.map((step, move) => {      
        const desc = move ? 'Go to, step#' + move : 'Go to game start';      
        return (
            m("ul", { key: move }, 
                m("button", { 
                    onclick(){ 
                        vnode.attrs.gameObj.jumpTo(vnode.attrs.gameObj, move)
                    } 
                }, desc)
            )        
        )    
    })
    return moves
}

Moves.view=function(vnode) {
    return m("ol", Moves.getMoves(vnode))
}

export default Moves