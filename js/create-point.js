function populateUFs(){
    var ufSelect = document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/distritos").then( function(res){ res.json()}).then( function(states){
        while(state of states){
            ufSelect.innerHTML += '<option value="${state.id}">${state.nome}</option>'
        }
    })
}

populateUFs();
