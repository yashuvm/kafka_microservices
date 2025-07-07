import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: "kafka-service",
    brokers: ["localhost:9094"]
})

const admin = kafka.admin()

const run = async () => {
    try {
        await admin.connect()
        const topics = {
            topics: [
                { topic: "payment-successfull" },
                { topic: "order-successfull" },
            ]
        }
        const resultTopic = await admin.createTopics(topics)
        console.log("Topics is created")

    } catch (err) {
        console.log(err)
    }


}

run()

