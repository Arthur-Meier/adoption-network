import {detectlogin} from './routeProtect.js'

detectlogin()

const modalRegister = document.querySelector('.modalRegister')
const modalLogin = document.querySelector('.modalLogin')
const btnRegister = document.querySelector('.register')
const btnLogin = document.querySelector('.login')
const linkLogin = document.querySelector('.linkLogin')
const linkRegister = document.querySelector('.linkRegister')
const closeLogin = document.querySelector('.closeLogin')
const closeRegister = document.querySelector('.closeRegister')


function openModal() {
    btnRegister.addEventListener('click', () => {
        modalRegister.showModal()
    })

    btnLogin.addEventListener('click', () => {
        modalLogin.showModal()
    })

    linkLogin.addEventListener('click', (e) => {
        e.preventDefault()

        modalRegister.close()
        modalLogin.showModal()
    })

    linkRegister.addEventListener('click', (e) => {
        e.preventDefault()

        modalLogin.close()
        modalRegister.showModal()
    })
    closeModal()
}

function closeModal() {
    closeLogin.addEventListener('click', () => {
        modalLogin.close()
    })

    closeRegister.addEventListener('click', () => {
        modalRegister.close()
    })
}

openModal()

import { login, createUser } from "./requests.js";

// LOGIN

const loginForm = () => {
    const inputs = document.querySelectorAll("#inputLogin > input")
    const button = document.querySelector("#btnLogin")

    const loginUser = {}
    
    button.addEventListener("click", async (event) => {
        event.preventDefault()

        inputs.forEach(element => {
            loginUser[element.name] = element.value
        })
        const request = await login(loginUser)
        if(request.response == 'ERROR'){
            return ''
        }
        else
        localStorage.setItem("user", JSON.stringify(request))
    })
}
loginForm() 

// CADASTRO

const createUserForm = () => {
    const inputs = document.querySelectorAll("#inputRegister > input")
    const button = document.querySelector("#btnRegister")

    const newUser = {}

    button.addEventListener("click", async (event) => {
        event.preventDefault()

        inputs.forEach(element => {
            newUser[element.name] = element.value
        })

        const request = await createUser(newUser)
    })

    return newUser
}
createUserForm() 
