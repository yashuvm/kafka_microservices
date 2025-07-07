import express from 'express'
import cors from 'cors'
import { pay, logAnalytics, createOrder, sendEmail } from './db.js'
import { authMiddleware } from './middleware/auth.js'


const app = express()

app.use(cors())

app.use(express.json())



app.post("/order", authMiddleware, async (req, res) => {
    try {
        const { cartssss } = req.body
        const userId = req.userId
        //pay function 
        const paymentResult = await pay(cart, userId)
        //log analytices 
        await logAnalytics({ cart, userId }, "Payment Successfull")
        //order function 
        const orderId = await createOrder(cart, userId)
        //log analytices
        await logAnalytics({ orderId, userId }, "Order Created")
        //email function 
        const emailResult = await sendEmail(orderId, userId)
        //log analytices
        await logAnalytics({ orderId, userId }, "Email is send")

        //
        return res.status(200).send({ orderId, paymentResult, emailResult })

    } catch (err) {
        return res.status(500).send(err)
    }
})





app.use((err, req, res, next) => {
    console.log("A")
    return res.status(err.status || 500).json(err.message,"aa")
})

app.listen(3000, (err, result) => {
    if (err) console.log(err)
    console.log(`Server is connected at the port of: ${3000}`)
})

