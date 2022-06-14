import mongoose from 'mongoose'
const uri: string = 'mongodb+srv://root:Rafalp123@merntypescript.e4hqdg6.mongodb.net/?retryWrites=true&w=majority'
try {
    (async () => {
        const db = await mongoose.connect(uri)
        console.log('conectado a la base de datos', db.connect.name)
    })()

} catch (error) {
    console.log('err', error)
}