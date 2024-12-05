const express = require('express')
const fs = require('fs')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const PORT = 3000

const HTML_FILE = path.join(__dirname, '../', 'client', 'index.html')
const DATA_FILE = path.join(__dirname, 'tabs_data.json')

app.use(express.static(path.join(__dirname, '../', 'client')))

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(HTML_FILE)
})

app.post('/api/post', (req, res) => {
    const {name, content} = req.body

    let data = []
    if(fs.existsSync(DATA_FILE)) {
        if(fs.readFileSync(DATA_FILE, 'utf-8')) {
            data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
        }
    }

    data.push({name, content})

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
    res.json({ status: 'success', message: 'Tab saved.' })
})

app.get('/api/get', (req, res) => {
    if (fs.existsSync(DATA_FILE)) {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
        res.json(data)
    } else {
        res.json([])
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})