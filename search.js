import { openai } from './openai.js'
import { Document } from 'langchain/document'

import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { ChatPromptTemplate } from 'langchain/prompts'

import {movies} from './constants.js'

const createVectorStore =  () => MemoryVectorStore.fromDocuments(
    movies.map(movie => new Document({
        pageContent: `Title: ${movie.title}\nDescription: ${movie.description}`, 
        metadata: {source: movie.id, title: movie.title}
    })
    ),
    new OpenAIEmbeddings()
)

const search = async(query, count=1) => {
    const vectorStore = await createVectorStore()
    return vectorStore.similaritySearchWithScore(query, count)
}

console.log(await search('A funny movie',2))