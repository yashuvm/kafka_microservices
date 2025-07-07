import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: "order-service",
    brokers: ["localhost:9094"]
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: "order-service" })

const run = async () => {
    try {
        await consumer.connect()
        await producer.connect()
        await consumer.subscribe({
            topic: "payment-successfull", fromBeginning: true
        })
        const msg = consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const value = message.value.toString()
                const { userId, cart } = JSON.parse(value)
                console.log(`Order consumer : user id is : ${userId} and the cart is : ${cart}`)
                //after getting the user id we will produce msg on the topic of order-successfull
                //todo create order 
                const dummyOrderId = "123456789"
                await producer.send({
                    topic: "order-successfull",
                    messages: [{ value: JSON.stringify({ userId, orderId: dummyOrderId, cart }) }]
                })
                console.log("send to order-successfull topic ")
            }
        })

    } catch (err) {
        console.log("error in connecting order in services", err)
    }
}
run()