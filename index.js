import express from "express";
import { getValoresExchange } from "./utils/exchangemonitor.js";
import { getValoresBcv } from "./utils/bcv.js";

const app = express()
app.disable('x-powered-by')
const PORT = process.env.PORT || 5000



app.get('/api/v1/monedaVenz', async (req, res) =>{
  res.header('Access-Control-Allow-Origin', '*')
  // const datosMonetarios = await getValoresExchange()
  const datosMonetarios = await getValoresBcv()
  return res.json(datosMonetarios)

})
app.listen(PORT, () => console.log('http://localhost:' + PORT))