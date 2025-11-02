#!/usr/bin/env bun
import { Elysia } from 'elysia'
import { cors } from './src/index'

// Test async origin function
const app = new Elysia()
    .use(cors({
        origin: async (request) => {
            const origin = request.headers.get('origin')
            console.log(`Checking origin asynchronously: ${origin}`)
            
            // Simulate async operation (database lookup, API call, etc.)
            await new Promise(resolve => setTimeout(resolve, 100))
            
            // Allow localhost origins for testing
            return origin?.includes('localhost') || origin?.includes('127.0.0.1') || !origin
        }
    }))
    .get('/', () => 'Hello with async CORS!')
    .listen(3000)

console.log('🦊 Server running on http://localhost:3000')
console.log('Test with: curl -H "Origin: http://localhost:8080" http://localhost:3000')