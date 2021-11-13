import jsonWebTokenService from 'jsonwebtoken'

const isAuthenticated = () => {
    try {
        const jwt = localStorage.getItem('token')
        if (jwt != null && jwt != undefined & jwt != "") {
            const decodedjwt = jsonWebTokenService.decode(jwt)
            localStorage.setItem('role', decodedjwt.perfil)
            localStorage.setItem('user', decodedjwt.name)
            return true
        } else {
            return false
        }
    } catch (error) {
        if (error) return false
        throw error
    }
}

export default isAuthenticated