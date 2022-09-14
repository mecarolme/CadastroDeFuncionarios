const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const nome = document.querySelector('#nome')
const funcao = document.querySelector('#funcao')
const salario = document.querySelector('#salario')
const btnSave = document.querySelector('#btnSave')


let itens
let id

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

btnSave.onclick = e => {
    if(nome.value == '' || funcao.value == '' || salario.value == '') {
        return
    }

    e.preventDefault();

    if(id !== undefined) {
        itens[id].nome = nome.value
        itens[id].funcao = funcao.value
        itens[id].salario = salario.value
    } else {
        itens.push({'nome': nome.value, 'funcao': funcao.value, 'salario': salario.value})
    }

    setItensBD()

    modal.classList.remove('active')
    loadItens()
    id = undefined
}

function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    })
}

loadItens()

function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.funcao}</td>
        <td>R$ ${item.salario}</td>

        <td class="action">
            <button onclick="editItem(${index})"> <i class="fa-solid fa-pen"></i> </button>
        </td>

        <td class="action">
            <button onclick="deleteItem(${index})"> <i class="fa-solid fa-trash"></i> </button>
        </td>
    `
    tbody.appendChild(tr)
}

function editItem(index) {
    openModal(true, index)
}

function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

function openModal(edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if(e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        }
    }

    if(edit) {
        nome.value = itens[index].nome
        funcao.value = itens[index].funcao
        salario.value = itens[index].salario
        id = index
    } else {
        nome.value = ''
        funcao.value = ''
        salario.value = ''
    }
}
