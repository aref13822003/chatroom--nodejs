export const sendCode=async(Mobile)=>{
    try {
        const res=await fetch('https://api.limosms.com/api/sendcode',{
            method:'POST',
            headers:{
                'ApiKey':process.env.API_KEY,
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Mobile,
                Footer:"aref chatroom "
            })
        })
        const data=await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}
export const validateCode=async(Mobile,Code)=>{
    try {
        const res= await fetch('https://api.limosms.com/api/checkcode',{
            method:'POST',
            headers:{
                'ApiKey':process.env.API_KEY,
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Mobile,
                Code
            })
        })
        const data=await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}