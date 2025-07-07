import { v4 as uuidv4 } from 'uuid';


export const pay = async (cart, userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("success")
        }, 3000)
    })
}

export const logAnalytics = async (data,message) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Anylytices log is creaed: ", message)
            resolve("success")
        }, 1000)
    })
}

export const createOrder = async (cart,userId) => {
    return new Promise((resolve, reject) => {
        const id = uuidv4()
        setTimeout(() => {
            resolve(id)
        }, 3000)
   })
}

export const sendEmail=async(orderId,userId)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("success")
        },3000)
    })
}