import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import clientesroutes from './routes/clientesroutes.js';

const app = express()
app.use(express.json())

dotenv.config();

const dominiospermitidos = [process.env.FRONTEND_URL];

const coroptions = {
    origin: function(origin, callback) {
        if(dominiospermitidos.indexOf(origin) !== -1) {
            //El origen del request esta permitido
            callback(null, true)
        } else {
            callback(new Error('No permitido por CORS'))
        }
        
    }
}

app.use(cors(coroptions))

app.use('/api/clientes', clientesroutes)

const PORT = process.env.PORT || 4003

app.listen(PORT, () => {
    console.log(`Servidor funcionando desde el puerto ${PORT}`)
})