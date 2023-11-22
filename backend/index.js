const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.post('/dev/sps/io/Vti/:turnOn', (req, res) => {
    const {miniserver} = req.body;
    const turnOn = req.params.turnOn;
    if(turnOn === "SET(Lico;On;Pulse)"){
        setTimeout(() => {
            res.send(`Ligning Controller of ${miniserver} is turned on`)}, 1000)}
    else if(turnOn === "SET(Lico;Off;Pulse)"){
        setTimeout(() => {
            res.send(`Ligning Controller of ${miniserver} is turned off`)}, 1000)
    }
})

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})