import express from 'express'
import cors from 'cors'
import { Kafka } from 'kafkajs'


const app = express()
app.use(cors(
    { origin: "http://localhost:3000" }
))

app.use(express.json())



//kafka producer
const kafka = new Kafka({
    clientId: "payment-services",
    brokers: ["localhost:9094"]
})
const producer = kafka.producer()

const connectToKafka = async () => {
    try {
        await producer.connect()
        console.log("Producer connect in payment-services")
    } catch (err) {
        console.log("Error connected to kafka-------:", err)
    }
}
//


app.post("/payment-service", async (req, res) => {
    try {
        const { cart } = req.body
        //Assueme that we get the cookie and decrypt the user id 
        const userId = "123"

        //TODO - PAYMENT

        //KAFKA 
        await producer.send({
            topic: "payment-successfull",
            messages: [{ value: JSON.stringify({ userId, cart }) }]
        })
        //
        return res.status(200).send("Payment Successfull")


    } catch (err) {
        return res.status(500).send(err)
    }
})


//error handler 
app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message)
})



app.listen(8000, (err, result) => {
    if (err) console.log(err)
    else {
        console.log("Payment service is running on port 8000")
        connectToKafka()
    }
})