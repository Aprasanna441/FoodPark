const storeToken=(token)=>{
if(token){
    console.log(token)
    localStorage.setItem("authToken",token)

}
}
const getToken=()=>{
    const token=localStorage.getItem("authToken")
    return token
    }


const removeToken=()=>{
        localStorage.removeItem("authToken")
        }

export {getToken,storeToken,removeToken}