import dotenv from 'dotenv/config'
import OpenAI from 'openai'
import util from 'util'

const openai = new OpenAI({})

const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Hello, how are you?' },
  ],
})

// Display the full object with colors and proper nesting
console.log(
  util.inspect(response, { colors: true, depth: null, maxArrayLength: null })
)
