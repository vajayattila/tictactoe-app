import m from "mithril"

var Square={}

Square.getValue=function(vnode){
    return vnode.attrs.gameObj.history[vnode.attrs.gameObj.stepNumber].squares[vnode.attrs.index]
}

Square.view=function(vnode) {
    var value=Square.getValue(vnode)
    return m("button.square", {
        onclick(){
            vnode.attrs.gameObj.handleClick(vnode.attrs.gameObj, vnode.attrs.index)   
            value=Square.getValue(vnode)
        }
    }, value)
}

export default Square