import { getUser } from './requests.js'
const user = getUser()

export function detectlogged() {

    if(!user){
        window.location.replace('/')
    }
}
export function detectlogin() {
    if(user){
        window.location.replace('/src/pages/loggedPage.html')
    }
}