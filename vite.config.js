import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

const NOTES_FILE = path.resolve(import.meta.dirname, 'src/data/notes.json')

function notesApi() {
  return {
    name: 'notes-api',
    configureServer(server) {
      server.middlewares.use('/api/notes', (req, res) => {
        if (req.method === 'GET') {
          try {
            const data = fs.existsSync(NOTES_FILE)
              ? fs.readFileSync(NOTES_FILE, 'utf-8')
              : '{}'
            res.setHeader('Content-Type', 'application/json')
            res.end(data)
          } catch {
            res.statusCode = 500
            res.end('{}')
          }
        } else if (req.method === 'POST') {
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            try {
              JSON.parse(body) // validate
              fs.writeFileSync(NOTES_FILE, body, 'utf-8')
              res.setHeader('Content-Type', 'application/json')
              res.end('{"ok":true}')
            } catch {
              res.statusCode = 400
              res.end('{"error":"invalid json"}')
            }
          })
        } else {
          res.statusCode = 405
          res.end('')
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), notesApi()],
})
