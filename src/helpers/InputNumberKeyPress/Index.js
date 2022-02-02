export const handlerInputNumberKeyPress = (e)  => {
    if(e.charCode === 44) e.preventDefault()
    else if(e.charCode === 45) e.preventDefault()
    else if(e.charCode === 46) e.preventDefault()
    else if(e.charCode === 69) e.preventDefault()
    else if(e.charCode === 101) e.preventDefault()
}