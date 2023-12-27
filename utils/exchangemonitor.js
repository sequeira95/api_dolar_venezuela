import { chromium } from 'playwright';
export async function getValoresExchange(){
  //iniciamos el navegador
  const browser = await chromium.launch()

  //abrimos una nueva pagina en el navegador
  const page = await browser.newPage()

  //URL que queremos ir 
  await page.goto('https://exchangemonitor.net/dolar-venezuela')
  //evaluamos la pagina y buscamos los datos de interes
  const data = await page.evaluate(()=>{
    const datosMonetarios = document.querySelectorAll('.c-nombre')
    const valoresMonetarios = [...datosMonetarios].map((dato) =>{
      const nombre = dato.querySelector('.nombre').innerText
      const unidad = dato.querySelector('.unidad').innerText
      const precio = dato.querySelector('.precio').innerText
      return {
        nombre,
        unidad,
        precio
      }
    }).filter(e=> e.nombre === "EnParaleloVzla" || e.nombre === "Monitor Dolar Venezuela" || e.nombre === "BCV")
    return valoresMonetarios

  })
  //cerramos el navegador
  await browser.close()
  //console.log(data)
  return data
}