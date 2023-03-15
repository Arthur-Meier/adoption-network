import { toast } from "./toast.js"

const modalRegister = document.querySelector('.modalRegister')
const modalLogin = document.querySelector('.modalLogin')

// PEGAR USUÁRIO DO LOCALSTORAGE
export const getUser = () => {
    const user = JSON.parse(localStorage.getItem("user"))

    return user
}

// ATALHOS

const baseUrl = "http://localhost:3333"
const user = getUser() || {}
const requestHeaders = {
    "Content-type": "application/json",
    Authorization: `Bearer ${user}`
}

// LOGIN

export const login = async (data) => {
    const loginData = await fetch(`${baseUrl}/session/login`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(data)
    })

    const loginDataJson = await loginData.json()
    
    
    if (!loginData.ok) {
        toast(loginDataJson.message, '#ff0000')
        return loginDataJson
    } else {
        toast(`Seja bem vindo ${loginDataJson.user.name}`,'#008000')
        setTimeout(() => {window.location.replace("/src/pages/loggedPage.html")}, "1000")
    }

    return loginDataJson
}

//CRIAR USUÁRIO 
export const createUser = async (data) => {
    
    const newUser = await fetch(`${baseUrl}/users`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(data)
    })

    const newUserJson = await newUser.json()

    if (!newUser.ok) {
        toast(newUserJson.message, '#ff0000')
        
        return newUser
    } else {
        toast("Usuário cadastrado com sucesso!",'#008000')
            modalRegister.close()
            modalLogin.showModal()
        }
    

    return newUser
}

// PROFILE PAGE

// PETS

// ALL PETS

const getAllMyPets = async () => {
    const token = JSON.parse(localStorage.getItem("user"))
    const realToken = token.token    
    const allMyPets = await fetch(`${baseUrl}/pets/my_pets`, {method:'GET',headers:{"Content-type": "application/json","Authorization": `Bearer ${realToken}`}})

    return allMyPets.json()
}

// ADD NEW PET

const createPet = async (pet) => {

    const token = JSON.parse(localStorage.getItem("user"))
    const realToken = token.token


    const createPet = await fetch(`http://localhost:3333/pets`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${realToken}`
        },

        body: JSON.stringify(pet)
    })
    const createPetJson = await createPet.json()

    if (!createPet.ok) {
        toast(createPetJson.message, '#ff0000')
        
    } else {
        toast("Novo pet cadastrado com sucesso!",'#008000')
    }
    
    /*setTimeout(()=> {return createPetJson}, "2000")*/
}

// UPDATE PET

const updatePet = async (id, data) => {
    const token = JSON.parse(localStorage.getItem("user"))
    const realToken = token.token
   
    const updatePet = await fetch(`http://localhost:3333/pets/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${realToken}`
        },
    
        body: JSON.stringify(data)
    })

    if (!updatePet.ok) {
        toast('Falha ao atualizar informações do pet', '#ff0000')
        return ''
        
    } else {
        toast("Pet atualizado com sucesso!",'#008000')
    }
    
    return updatePet
}

// USER DATA!

// GET USER DATA

const getProfileData = async () => {
    const token = JSON.parse(localStorage.getItem("user"))
    const realToken = token.token
    
    const profileData = await fetch(`${baseUrl}/users/profile`, {method:'GET',headers:{"Content-type": "application/json","Authorization": `Bearer ${realToken}`}})

    return profileData.json()
}

// UPDATE USER DATA

const updateProfile = async (data) => {
    const token = JSON.parse(localStorage.getItem("user"))
    const realToken = token.token
    const profileData = await fetch(`${baseUrl}/users/profile`, {method:'PATCH',headers:{"Content-type": "application/json","Authorization": `Bearer ${realToken}`},body: JSON.stringify(data)})


    if (!profileData.ok) {
        toast('Falha ao atualizar informações, confira os dados!', '#ff0000')
        return ''
        
    } else {
        toast("Informações atualizadas!",'#008000')
    }

    return await profileData.json()
}

// DELETE USER

const deleteUser = async () => {
    const token = JSON.parse(localStorage.getItem("user"))
    const realToken = token.token
    const deleteProfile = await fetch(`${baseUrl}/users/profile`, {method:'DELETE',headers:{"Content-type": "application/json","Authorization": `Bearer ${realToken}`}})

    
    return await deleteProfile.json()
}

export {
    getAllMyPets,
    getProfileData,
    updateProfile,
    createPet,
    updatePet,
    deleteUser
}