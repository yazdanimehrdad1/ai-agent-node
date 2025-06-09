import { openai } from './openai.js'
import readline from 'node:readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const systemPrompt = `You are a helpful assistant.`
const userPrompt = 'Hello, how are you?'

const newMessage = async (history, message) => {
    const result = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [...history, message],
        temperature: 0,
    })

    return result.choices[0].message
}


const formatMessage = (userInput) => ({role: 'user', content: userInput})

const formatResponse = (response) => ({role: 'assistant', content: response})

const formatHistory = (history) => history.map(message => ({role: message.role, content: message.content}))

const formatMessages = (history, message) => [...formatHistory(history), formatMessage(message)]

const chat = () => {
    const history = [
        {role: 'system', content: systemPrompt}
    ]

    const start = () => {
        rl.question('You: ', async (userInput) => {
            if (userInput.toLowerCase() === 'exit') {
                rl.close()
                return
            }

            const userMessage = formatMessage(userInput)
            const response = await newMessage(history, userMessage)
            history.push(response)
            console.log('\n\n', response.content, '\n\n')
            start();
        })
    }

    start()
}
console.log('Welcome to the chat! Type "exit" to end the chat.')
chat()