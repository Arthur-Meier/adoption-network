import {detectlogged} from './routeProtect.js'

detectlogged()
// LIMPAR LOCALSTORAGE

const logout = document.querySelector(".link__logout")
logout.addEventListener("click", () => {
    localStorage.clear()
    location.reload()
})