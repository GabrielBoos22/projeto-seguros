function cpfFormatador() {
  var input = document.getElementById("cpf")
  let inputlength = input.value.length
  
  if( inputlength === 3 || inputlength ===7){
    input.value += '.'
  } else if (inputlength === 11){
    input.value += '-'
  }

}

function getStorageData(key) {
    const data = localStorage.getItem(key);
  
    return JSON.parse(data) || [];
   
  }
  

  function validaCPF($http, cpf) {
    return new Promise(function(resolve, reject) {
      $http.get('/listar/' + cpf)
        .then(function (cotacoes) {
          if (cotacoes.data) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }
  
  