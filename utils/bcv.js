import { chromium } from 'playwright';
export async function getValoresBcv(){
  //iniciamos el navegador
  const browser = await chromium.launch()

  //abrimos una nueva pagina en el navegador
  const page = await browser.newPage()

  //URL que queremos ir 
  await page.goto('https://www.bcv.org.ve/', {timeout: 0})
  //evaluamos la pagina y buscamos los datos de interes
  const data = await page.evaluate(()=>{
    const dolar = document.querySelectorAll('#dolar')
    const valorDolar = [...dolar].map(dato => {
      const nombre = dato.querySelector('span').innerText
      const valor = dato.querySelector('strong').innerText
      return { nombre, valor }
    })
    const euro = document.querySelectorAll('#euro')
    const valorEuro = [...euro].map(dato => {
      const nombre = dato.querySelector('span').innerText
      const valor = dato.querySelector('strong').innerText
      return { nombre, valor }
    })
    return { valorDolar, valorEuro }
  })
  //cerramos el navegador
  await browser.close()
  console.log(data)
  return data
}