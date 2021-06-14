import app from "./app"
import dotenv from "dotenv"

dotenv.config();
// console.log(process.env)
const main = async() =>{
    const port = process.env.PORT
    await app.listen(port)
    console.log(`Servidor escuchando en el puerto ${port}`);
}

main()