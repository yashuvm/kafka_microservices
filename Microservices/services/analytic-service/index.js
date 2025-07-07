import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: "analytic-service",
    brokers: ["localhost:9094"]
})

const consumer = kafka.consumer({ groupId: "analytic-service" })

const run = async () => {
    try {
        await consumer.connect()
        await consumer.subscribe({
            //topic: "payment-successfull", fromBeginning: true
            topics: ["payment-successfull", "order-successfull", "email-successfull"],
            fromBeginning: true
        })
        const msg = consumer.run({
            eachMessage: async ({ topic, partition, message }) => {

                //
                if (topic === 'payment-successfull') {
                    const value = message.value.toString()
                    const { userId, cart } = JSON.parse(value)
                    console.log(`Analytics consumer : user id is : ${userId} and the cart is : ${cart}`)
                } else if (topic === 'order-successfull') {
                    const value = message.value.toString()
                    const { userId, orderId, cart } = JSON.parse(value)
                    console.log(`Analytics consumer : user id is : ${userId} and the order id is : ${orderId} body is ${cart}`)
                } else if (topic === 'email-successfull') {
                    const value = message.value.toString()
                    const { userId, emailId ,cart} = JSON.parse(value)
                    console.log(`Analytics consumer : user id is : ${userId} and the email id is : ${emailId} req body is ${cart}`)
                }


            }
        })

    } catch (err) {
        console.log("error in connecting consumer in analytic services", err.message)
    }
}
run()