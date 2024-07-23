import { redirect } from "react-router-dom"

 export const getToken=()=>{
    const token= localStorage.getItem('token')
    return token
}

export const getRole=()=>{

    const role= localStorage.getItem('role')
    return role
}
export const getExpiration = _ => {
    const expiration = localStorage.getItem('expiration')
    return expiration

}

export const loaderForLogin = _ => {
    if (getToken() && (getRole() !== "_" || getRole !== "")) {
        if (getRole() === "admin") {
            return redirect('/dashboardSysAdmin')
        }
        if (getRole() === "admin_assistant") {
            return redirect('/dashboardAsst')
        }
        
        else{
            return null
        }
    }
    else {
        return null
    }

}
export const loaderForSaveRoutesWithExpForManager_Assistant = _ => {

    const expiration = new Date(parseInt(getExpiration()))
    const current_Date = new Date()


    const token = getToken();
    const role = getRole()
    if (!token || role !== 'admin_assistant') {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('role')
        return redirect('/')




    } else if (expiration < current_Date) {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('role')
        return redirect('/');

    } else {

        return null
    }
}
export const loaderForSaveRoutesWithExpForManager = _ => {

    const expiration = new Date(parseInt(getExpiration()))
    const current_Date = new Date()


    const token = getToken();
    const role = getRole()
    if (!token || role !== 'admin') {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('role')
        return redirect('/')




    } else if (expiration < current_Date) {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('role')
        return redirect('/');

    } else {

        return null
    }
}