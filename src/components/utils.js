export const countSum = (s) => {
    let sum = 0;
    for (let i = 0; i < s.length; i++){
        sum+=s.charCodeAt(i)
    }
    return (sum % 15)+1;
}

export const getMonth = (num) => {
    num=parseInt(num)
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return months[num-1]
}