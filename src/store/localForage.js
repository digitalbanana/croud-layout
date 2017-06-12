import localforage from 'localforage'
import jwtDecode from 'jwt-decode'

const jwt = localStorage.getItem('jwt') ? jwtDecode(localStorage.getItem('jwt')) : {}

localforage.config({
    name: jwt.sub,
})

export default localforage
