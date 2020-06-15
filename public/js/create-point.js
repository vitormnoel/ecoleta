function populateUFs(){
    const stateSelect = document.querySelector("select[name=state]")

    const ur = `https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`

    fetch(ur)
    .then( res => res.json())
    .then( states => {

        for(const state of states){
            stateSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state1]")

    const stateValue = event.target.value

    const indexSecetedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexSecetedState]

    const url= `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateValue}/distritos?orderBy=nome`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url).then( res => res.json() ).then( cities => {
        
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document.querySelector("select[name=state]").addEventListener("change", getCities)

//items

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    const itemId = event.target.dataset.id

    console.log('ITEM ID: ', itemId)

    itemLi.classList.toggle("selected")

    const alredySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })

    if(alredySelected >= 0){
        const filteredItems = selectedItems.filter(item =>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    }else{
        selectedItems.push(itemId)
    }

    console.log('selectedItems: ', selectedItems)

    collectedItems.value = selectedItems   
}