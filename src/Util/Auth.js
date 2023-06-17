 export const getToken=()=>{
    const token= localStorage.getItem('token')
    return token
}

export const getRole=()=>{

    const role= localStorage.getItem('role')
    return role
}