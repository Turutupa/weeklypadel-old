const express = require('express')
const path = require('path')
const PORT = 4000

// initiate app
const app = express()

// serve static files
app.use(express.static(path.resolve(__dirname + '/../client/build/')))

app.get('/', (req, res) => {
    // console.log('pathname', __dirname + '/../client/build/index.html')
    // return 200
    res.sendFile(path.resolve(__dirname + '/../client/build/index.html'))
})

app.listen(PORT, () => {
    console.log(`App running in port ${PORT}...`)
})