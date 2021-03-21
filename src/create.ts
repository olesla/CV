import fs from 'fs'
import util from 'util'
import path from 'path'
import puppeteer from 'puppeteer'
import handlebars from 'handlebars'

const jsonData = require('./../data.json')
const readFile = util.promisify(fs.readFile)

const styles: string[] = ['./style.css']

const scripts: string[] = [
  './node_modules/@fortawesome/fontawesome-free/js/brands.min.js',
  './node_modules/@fortawesome/fontawesome-free/js/solid.min.js',
  './node_modules/@fortawesome/fontawesome-free/js/fontawesome.min.js',
]

type Personalia = {
  firstName: string
  lastName: string
  dateOfBirth: string
  address: string
  contact: {
    phone: string
    email: string
  }
}

type Experience = {
  start: string
  end: string
  company: string
  title: string
  city: string
  description: string
}

type Education = {
  start : string
  end : string
  school : string
  course : string
  city : string
}

type Data = {
  title: string,
  personalia: Personalia
  img: string,
  skills: string[]
  links: string[]
  experience: Experience[]
  education: Education[]
}

const data = jsonData as Data

async function generatePdf() {
  const imgData = await readFile(path.resolve('./profile.jpg'))
  data.img = imgData.toString('base64')
  const content = await readFile(path.resolve('./template.html'), 'utf8')
  const template = handlebars.compile(content)
  const html = template(data)

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setContent(html)

  for (const style of styles) {
    await page.addStyleTag({path: style})
  }

  for (const script of scripts) {
    const scriptFile = await readFile(path.resolve(script), 'utf8')
    await page.addScriptTag({content: scriptFile})
  }

  await new Promise(resolve => setTimeout(resolve, 1500))
  await page.pdf({path: 'cv.pdf', format: 'a4', printBackground: true})
  await browser.close()

  console.info('PDF generated')
}

generatePdf()
