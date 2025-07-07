import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: "email-service",
    brokers: ["localhost:9094"]
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: "email-service" })

const run = async () => {
    try {
        await consumer.connect()
        await producer.connect()
        await consumer.subscribe({
            topic: "order-successfull", fromBeginning: true
        })

        const msg = consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const value = message.value.toString()
                const { userId, orderId, cart } = JSON.parse(value)
                console.log(`getting data in email consumer user id is ${userId} and order id is ${orderId}`)
                //send email to the user 
                const dummyEmailid = "123456789abannabnab"
                await producer.send({
                    topic: "email-successfull",
                    messages: [{ value: JSON.stringify({ userId, emailId: dummyEmailid, cart }) }]
                })
            }
        })


    } catch (err) {
        console.log("error in connecting email in services", err)
    }
}
run()