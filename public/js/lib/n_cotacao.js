

function __getProximoNumero(){
   
       
    let sequenciaNumeroCotacao = Number( localStorage.getItem("sequenciaNumeroCotacao"));

    if (sequenciaNumeroCotacao < 100){
        
        sequenciaNumeroCotacao = sequenciaNumeroCotacao + Math.floor(Math.random() * 10000 + 1)
    
        sequenciaNumeroCotacao++;

        localStorage.setItem("sequenciaNumeroCotacao", sequenciaNumeroCotacao);
    
        return sequenciaNumeroCotacao
    } else {
        
    sequenciaNumeroCotacao++;
    
    localStorage.setItem("sequenciaNumeroCotacao", sequenciaNumeroCotacao);

    return sequenciaNumeroCotacao 
    }

}

function __getAntigoNumero(){
    //Recupera Sequencia 
    let sequenciaNumeroCotacao = Number( localStorage.getItem("sequenciaNumeroCotacao"))

    //Volta numero antigo
    sequenciaNumeroCotacao--

    //Atualiza sequencia
    localStorage.setItem("sequenciaNumeroCotacao", sequenciaNumeroCotacao);

    //Retorna número
    return sequenciaNumeroCotacao;
}

function __getProximoNumero2(){
    let sequenciaNumeroCotacao = Number( localStorage.getItem("sequenciaNumeroCotacao"));

    sequenciaNumeroCotacao++;

    localStorage.setItem("sequenciaNumeroCotacao", sequenciaNumeroCotacao);

}







