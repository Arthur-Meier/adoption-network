import { getAllMyPets, getProfileData, updateProfile, createPet , updatePet, deleteUser} from "./requests.js";
import {detectlogged} from './routeProtect.js'
// IMG USER

detectlogged()

const myPets = await getAllMyPets()
const profileData = await getProfileData()
const modal = document.querySelector('.modal-profilePage')
console.log(profileData);

const containerUser = document.querySelector('.container__profile-img')
const imgUser = document.createElement('img')
imgUser.src = profileData.avatar_url

containerUser.appendChild(imgUser)

// PROFILE DATA

function renderProfileData(user){
    const containerProfileData = document.querySelector('.container__profile-data')

    const title = document.createElement('h2')
    title.innerText = 'Dados pessoais'

    const userName = document.createElement('p')
    userName.innerText = `Nome: ${user.name}` 

    const userEmail = document.createElement('p')
    userEmail.innerText = `Email: ${user.email}`

    const adoptedPets = document.createElement('p')
    adoptedPets.innerText = `Pets adotados: ${user.my_pets.length}`

    const buttons = document.createElement('div')
    buttons.className = 'btns'

    const btnAtt = document.createElement('button')
    btnAtt.innerText = 'Atualizar informações'
    btnAtt.classList = 'btn purple'
    btnAtt.addEventListener('click', ()=> {modalAtt(user)})

    const btnDelete = document.createElement('button')
    btnDelete.innerText = 'Deletar conta'
    btnDelete.classList = 'btn red'
    btnDelete.addEventListener('click', ()=> {modalDelete(user)})

    buttons.append(btnAtt,btnDelete)
    containerProfileData.append(title, userName,userEmail, adoptedPets, buttons)
}
renderProfileData(profileData)

// CARD ADOPTED PETS

myPets.forEach(element => renderCardPet(element))

function renderCardPet(pet){
    const petId = pet.id
    
    const containerPets = document.querySelector('.container__pets')

    const cardPet = document.createElement('div')
    cardPet.className = 'card__pet'

    const imgCard = document.createElement('img')
    imgCard.src = pet.avatar_url
    imgCard.alt = 'imgPet'
    imgCard.className = 'profile__img-card'

    const cardInfo = document.createElement('div')
    cardInfo.className = 'card__info'

    const petName = document.createElement('p')
    petName.innerText = pet.name
    petName.style.fontWeight = "700"

    const petSpecies = document.createElement('p')
    petSpecies.innerText = pet.species

    const petBread = document.createElement('p')
    petBread.innerText = pet.bread

    const editPet = document.createElement('button')
    editPet.innerText = 'Atualizar'
    editPet.className = 'btn purple'
    editPet.addEventListener('click', ()=> {modalAttPet(petId)})

    cardInfo.append(petName,petSpecies,petBread,editPet)
    cardPet.append(imgCard, cardInfo)
    containerPets.appendChild(cardPet)
}

// MODAL DELETE USER

function renderModalDelete(user){

    const headerModal = document.createElement('div')
    headerModal.className ='headerModal'
    const imgHeaderModal = document.createElement('img')
    imgHeaderModal.src = "/src/assets/imgs/Vector (1).svg"
    imgHeaderModal.addEventListener('click', ()=> modal.close())

    const bodyModal = document.createElement('div')
    bodyModal.className = 'bodyModal'

    const text = document.createElement('h2')
    text.innerText = 'Deseja mesmo deletar sua conta?'

    const buttons = document.createElement('div')
    buttons.className = 'btns-modal-delete'

    const btnCancel = document.createElement('button')
    btnCancel.classList = 'btn purple'
    btnCancel.innerText = 'Não desejo deletar minha conta'
    btnCancel.addEventListener('click', ()=> {modal.close()})

    const btnDelete = document.createElement('button')
    btnDelete.classList = 'btn red'
    btnDelete.innerText = 'Quero deletar minha conta'
    btnDelete.addEventListener('click', ()=> {deleteAccount(user)})

    const footerModal = document.createElement('div')
    footerModal.className = 'footerModal'

    buttons.append(btnCancel,btnDelete)
    headerModal.append(imgHeaderModal)
    bodyModal.append(text,buttons)
    modal.append(headerModal,bodyModal,footerModal)
}

function modalDelete(user) {
    modal.innerHTML = ''
    renderModalDelete(user)
    modal.showModal()
}
// FUNCTION DELETE USER

function deleteAccount(user){
    deleteUser()
    localStorage.removeItem('user')
    location.reload()
}

// MODAL ATT USER

function renderModalAtt(user){

    const headerModal = document.createElement('div')
    headerModal.className ='headerModal'
    
    const imgHeaderModal = document.createElement('img')
    imgHeaderModal.src = "/src/assets/imgs/Vector (1).svg"
    imgHeaderModal.addEventListener('click', ()=> modal.close())

    const bodyModal = document.createElement('div')
    bodyModal.className = 'bodyModal'

    const text = document.createElement('h2')
    text.innerText = 'Atualizar perfil'

    const form =  document.createElement('form')
    form.className = 'form-att-user'

    const userName = document.createElement('input')
    userName.placeholder = 'Novo nome'
    userName.name = 'name'

    const userAvatar = document.createElement('input')
    userAvatar.placeholder = 'Link para nova imagem'
    userAvatar.name = 'avatar_url'

    const buttons = document.createElement('div')
    buttons.className = 'btns-modal-delete'

    const btnAtt = document.createElement('button')
    btnAtt.classList = 'btn purple'
    btnAtt.id = 'btn-att-user'
    btnAtt.innerText = 'Atualizar'
    btnAtt.addEventListener('click', ()=> {attUser()})

    const footerModal = document.createElement('div')
    footerModal.className = 'footerModal'

    buttons.append(btnAtt)
    headerModal.append(imgHeaderModal)
    form.append(userName,userAvatar)
    bodyModal.append(text,form,buttons)
    modal.append(headerModal,bodyModal,footerModal)
}

function modalAtt(user) {
    modal.innerHTML = ''
    renderModalAtt(user)
    modal.showModal()
}
// ATT USER FUNCTION 

async function attUser(){
    
    const inputs = document.querySelectorAll(".form-att-user > input")
    let attUser = {}
        inputs.forEach(input => {
            if(input.value){
                attUser[input.name] = input.value
                } else if(input.name == "name"){
                    attUser[input.name] = profileData.name
                } else if(input.name == "avatar_url"){
                    attUser[input.name] = imgUser.src
                }
        })

        const request = await updateProfile(attUser)
        localStorage.setItem("newInfo", JSON.stringify(request))
        
        const containerData = document.querySelector('.container__profile-data')
        containerData.innerHTML = ''
        
        const newProfileData = await getProfileData()

        renderProfileData(newProfileData)
        imgUser.src = newProfileData.avatar_url
        modal.close()
    
}


// MODAL ADD PET

const btnNewPet = document.querySelector('#btn-new-pet')
btnNewPet.addEventListener('click', ()=> {modalAddNewPet()})

function renderModalAddNewPet(){

    const headerModal = document.createElement('div')
    headerModal.className ='headerModal'
    
    const imgHeaderModal = document.createElement('img')
    imgHeaderModal.src = "/src/assets/imgs/Vector (1).svg"
    imgHeaderModal.addEventListener('click', ()=> modal.close())

    const bodyModal = document.createElement('div')
    bodyModal.className = 'bodyModal'

    const text = document.createElement('h2')
    text.innerText = 'Cadastrar pet'

    const form =  document.createElement('form')
    form.className = 'form-adc-pet'

    const petName = document.createElement('input')
    petName.placeholder = 'Nome'
    petName.name = 'name'

    const petBreed = document.createElement('input')
    petBreed.placeholder = 'Raça'
    petBreed.name = 'bread'

    let allSpecies = ['Cachorro', 'Gato', 'Aves', 'Repteis', 'Outros']

    const petSpecies = document.createElement('select')
    petSpecies.placeholder = 'Selecione a espécie'
    petSpecies.name = 'species'
    petSpecies.required = true
    petSpecies.insertAdjacentHTML('beforeend', `<option value="not-selected"> Selecione uma espécie </option>`)
    allSpecies.forEach(element => petSpecies.insertAdjacentHTML('beforeend', `<option value="${element}">${element}</option>`))


    const petAvatar = document.createElement('input')
    petAvatar.placeholder = 'Link para imagem'
    petAvatar.name = 'avatar_url'

    const buttons = document.createElement('div')
    buttons.className = 'btns-modal-delete'

    const btnAddNewPet = document.createElement('button')
    btnAddNewPet.classList = 'btn purple'
    btnAddNewPet.innerText = 'Cadastrar'
    btnAddNewPet.id = 'btn-adc-pet'
    btnAddNewPet.addEventListener('click', (event)=> {addNewPet(event)})

    const footerModal = document.createElement('div')
    footerModal.className = 'footerModal'

    buttons.append(btnAddNewPet)
    headerModal.append(imgHeaderModal)
    form.append(petName,petBreed,petSpecies,petAvatar)
    bodyModal.append(text,form,buttons)
    modal.append(headerModal,bodyModal,footerModal)
}

function modalAddNewPet(user) {
    modal.innerHTML = ''
    renderModalAddNewPet()
    modal.showModal()
}

// FUNCTION ADD NEW PET

async function addNewPet(event){
    event.preventDefault()
    
    const inputs = document.querySelectorAll(".form-adc-pet > input")
    const select = document.querySelector(".form-adc-pet > select")
    const selectValue = select.value
    const modalPet = document.querySelector('.modal-profilePage')

    let newPet = { "species" : selectValue}
    
        inputs.forEach(input => {
            newPet[input.name] = input.value
        })

        await createPet(newPet)
        const containerPets = document.querySelector('.container__pets')
        containerPets.innerHTML = ''
        
        const newMyPets = await getAllMyPets()
        newMyPets.forEach(element => renderCardPet(element))
        modalPet.close()
}

// MODAL ATT PET

function renderModalAttPet(petId){

    const headerModal = document.createElement('div')
    headerModal.className ='headerModal'
    
    const imgHeaderModal = document.createElement('img')
    imgHeaderModal.src = "/src/assets/imgs/Vector (1).svg"
    imgHeaderModal.addEventListener('click', ()=> modal.close())

    const bodyModal = document.createElement('div')
    bodyModal.className = 'bodyModal'

    const text = document.createElement('h2')
    text.innerText = 'Atualizar pet'

    const form =  document.createElement('form')
    form.className = 'form-att-pet'

    const petName = document.createElement('input')
    petName.placeholder = 'Nome'
    petName.name = 'name'
    petName.required;

    const petBreed = document.createElement('input')
    petBreed.placeholder = 'Raça'
    petBreed.name = 'bread'

    let allSpecies = ['Cachorro', 'Gato', 'Aves', 'Repteis', 'Outros']

    const petSpecies = document.createElement('select')
    petSpecies.placeholder = 'Selecione a espécie'
    petSpecies.name = 'species'
    petSpecies.required = true
    petSpecies.insertAdjacentHTML('beforeend', `<option value="not-selected"> Selecione uma espécie </option>`)
    allSpecies.forEach(element => petSpecies.insertAdjacentHTML('beforeend', `<option value="${element}">${element}</option>`))

    const petAvatar = document.createElement('input')
    petAvatar.placeholder = 'Link para imagem'
    petAvatar.name = 'avatar_url'

    const buttons = document.createElement('div')
    buttons.className = 'btns-modal-delete'

    const btnAtt = document.createElement('button')
    btnAtt.classList = 'btn purple'
    btnAtt.innerText = 'Atualizar'
    btnAtt.id = 'btn-att-pet'
    btnAtt.addEventListener('click', (event)=> {attPet(petId,event)})

    const footerModal = document.createElement('div')
    footerModal.className = 'footerModal'

    buttons.append(btnAtt)
    headerModal.append(imgHeaderModal)
    form.append(petName,petBreed,petSpecies,petAvatar)
    bodyModal.append(text,form,buttons)
    modal.append(headerModal,bodyModal,footerModal)
}

function modalAttPet(petId) {
    modal.innerHTML = ''
    renderModalAttPet(petId)
    modal.showModal()
}

// FUNCTION ATT PET

async function attPet(petId,event){
    event.preventDefault()
    const inputs = document.querySelectorAll(".form-att-pet > input")
    const select = document.querySelector(".form-att-pet > select")
    const selectValue = select.value
    

    let updatedPet =  { "species" : selectValue}

        inputs.forEach(input => {
            updatedPet[input.name] = input.value
        })
        await updatePet(petId,updatedPet)
        
        const containerPets = document.querySelector('.container__pets')
        containerPets.innerHTML = ''
        
        const newMyPets = await getAllMyPets()
        newMyPets.forEach(element => renderCardPet(element))
        modal.close()
}