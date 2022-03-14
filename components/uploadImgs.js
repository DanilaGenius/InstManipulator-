const puppeteer = require('puppeteer');
const fs = require('fs');
const { log } = require('./console.js');
const console = document.querySelector('#console')
const { changeCookiesForBrowser } = require('./changeCookiesForBrowser.js')
const {setTextInDivOfBotInList} = require('./actionsWitsList');
const {setValueInObjOfBotsJson} = require('.//actionsWithJSON')

async function botUploadImgs(obj, pathAtImgs) {

  const instagramUrl = "https://www.instagram.com"
  
  const id = obj.id;
  const idInConsole = ` bot = ${id}: `
  const login = obj.authorization.login;
  const password = obj.authorization.password;
  const cookiesKeys = obj.cookies;
  const mailLogin = obj.email.mailLogin
  const mailPassword = obj.email.mailPassword
  const dirWithImgs = pathAtImgs

  await log(dirWithImgs, console);  

  await log(idInConsole + ' start ', console);
  const browser = await puppeteer.launch({
    headless: false,
    product: 'chrome',
    slowMo: 100
  });
  const page = await browser.newPage();
  const parseCookies = changeCookiesForBrowser(cookiesKeys);
  await page.setCookie(...parseCookies);
  await log(idInConsole + ' load cookies', console);
  await page.goto(instagramUrl);
  await log(idInConsole + ' go to the page ' + instagramUrl, console);

  await page.waitForTimeout(randomDelay(3000, 1200))
  await instAuth(login, password)
  try {
    await log(idInConsole + 'start authorization', console);
    await instAuth(login, password)
    await log(idInConsole + 'end authorization', console);
    await page.waitForTimeout(randomDelay(3000, 1200))
  } finally {
    try {
      await page.waitForTimeout(3000)
      await page.goto(instagramUrl);
      try {
        await page.waitForSelector('body > div > div > div > div > div > div > div > img[src="/static/images/ico/xxhdpi_launcher.png/99cf3909d459.png"]')

        await page.click('body > div > div > div > div > div > button:nth-child(2)')

      } finally {
        const arrImgs = findArrImgs(dirImgs);

        await log(idInConsole + 'start load imgs', console);

        for (let imgName of arrImgs) {
          await UploadPhoto(dirWithImgs, imgName, page)
          await log(idInConsole + ' img ' + imgName + ' loaded', console);
        }

        await log(idInConsole + 'end load imgs', console);
      }
      await log(idInConsole + ' script load imgs end', console);
    } catch (e) {
      log(e, console)
    }
  }
  

  //! fn async
  async function waitAndClick(selector) {
    await page.waitForSelector(selector)
    await page.click(selector)
  }

  async function UploadPhoto(dir, nameImg, page) {
    await waitAndClick('svg[aria-label="Новая публикация"]')

    await page.waitForSelector('body > div > div > div > div > div > div > div > div > div > div > div > button')

    const [fileChooser] = await Promise.all([
      page.waitForFileChooser(),
      page.click("body > div > div > div > div > div > div > div > div > div > div > div > button") // some button that triggers file selection
    ]);
    await fileChooser.accept([dir + nameImg])

    await waitAndClick('body > div > div > div > div > div > div > div > div > div:nth-child(3) > div > button')

    await page.waitForTimeout(randomDelay(4000, 1200))
    await waitAndClick('body > div > div > div > div > div > div > div > div > div:nth-child(3) > div > button')

    await page.waitForTimeout(randomDelay(4000, 1200))
    await waitAndClick('body > div > div > div > div > div > div > div > div > div:nth-child(3) > div > button')


    await page.waitForSelector('body > div > div > div > div > div > div > div > div > div > div > h2')
    await page.click('body > div > div > button > div > svg')
    await page.waitForTimeout(randomDelay(4000, 1200))
  }

  async function instAuth(login, password) {
    await page.waitForSelector('input[name="username"]')
    await page.click('input[name="username"]')
    await page.type('input[name="username"]', login, {
      delay: randomDelay()
    })

    await page.waitForSelector('input[name="password"]')
    await page.click('input[name="password"]')
    await page.type('input[name="password"]', password, {
      delay: randomDelay()
    })

    await page.click('button[type="submit"]')
  }
  //! fn async end
};



function findArrImgs(dir) {
  const files = fs.readdirSync(dir);
  const jpgs = files.filter(function (el, i) {
    return el.substring(el.length - 3) == 'jpg';
  });
  return jpgs
}

function createObjImgs() {
  let nameImgs = findArrImgs(dirImgs)
  const formData = {};
  for (var i = 1; i < nameImgs.length; i++) {

    formData[i] = fs.createReadStream(dirImgs + nameImgs[i]);
  }

  return formData
}

function randomDelay(max = 500, min = 300) {
  return (Math.round(max * Math.random()) + min)
}






exports.botUploadImgs = botUploadImgs
//ig_nrcb = 1 httpOnly: 1 sameSite: ''(all),