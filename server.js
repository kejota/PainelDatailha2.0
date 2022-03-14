const express = require('express')
const app = express()

const baseDir = `${__dirname}/build/`
console.log('URL: ', baseDir)
app.use(express.static(baseDir))

app.get('*', (request, response) => {
    response.sendFile('index.html', {
        root: baseDir
    })

})

const port = 3000
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})