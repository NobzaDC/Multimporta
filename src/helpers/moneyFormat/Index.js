const formater = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export const handlerSetMoneyFormat = (value = undefined, emptyCase = '')  => {
    if (value === undefined || value === null ) return emptyCase 
    else return formater.format(value)
}