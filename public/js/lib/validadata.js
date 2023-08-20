
function validaData (dataFinal, inicio) {
    const dataEscolhida = dataFinal
    const dataMaxima = new Date(inicio.getUTCFullYear() + 10, inicio.getUTCMonth(), inicio.getUTCDate())
    const dataMinima = new Date(inicio.getUTCFullYear() + 5, inicio.getUTCMonth(), inicio.getUTCDate())
    
    if(dataEscolhida < dataMinima || dataEscolhida > dataMaxima){
        return true
    } else {
        return false
    }

}