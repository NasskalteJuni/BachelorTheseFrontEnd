module.exports = function filter(currentValueWeight = 0.75, floored = true){
    const previousValueWeight = 1 - currentValueWeight;
    let prev = null;
    return function add(value){
        if(prev === null) prev = value;
        prev = previousValueWeight*prev + currentValueWeight*value;
        return floored ? Math.floor(prev) : prev;
    }
};