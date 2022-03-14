window.addEventListener('DOMContentLoaded', () => {
//! consts
    const fs = require('fs')
    const templateClearList = '<div class="list__title"><div class="list__title-num list__elem"><div class="list__title-title">ID</div></div><div class="list__title-login list__elem"><div class="list__title-title" id="login-title">login</div></div><div class="list__title-pass list__elem"><div class="list__title-title">password</div></div><div class="list__title-progress list__elem"><div class="list__title-title">progress</div></div><div class="list__title-imgs list__elem"><div class="list__title-title">Foulder Photos</div></div></div>'
    const { startParser } = require('./components/parser')
    const { log } = require('./components/console.js');
    const { botUploadImgs } = require('./components/uploadImgs.js')
    const {setValueInObjOfBotsJson, getValueInObjOfBotsJson, getBotsObjectByIdsInJson} = require('./components/actionsWithJSON.js');
    const {setTextInDivOfBotInList, getDivInfoOfBotInList, findIdSelectedBotsInList, createDivOfList} = require('./components/actionsWitsList.js')

    const pathToFileJSONForBots = "C:/Users/cumputer/Desktop/myAppElectron/danilaBotInst/bots.json"
    const console = document.querySelector('#console')
    const selectOfBotTxt = document.querySelector('#selectOfBotTxt')
   
    const comment = document.querySelector('#comment')

    const btnUploadImgs = document.querySelector('#btnUploadImgs')
    const btnParserFile = document.querySelector('#btnParserFile')
    const btnUploadInList = document.querySelector('#btnUploadInList')

    const list = document.querySelector('#list')

//! consts end

//! events
  btnUploadImgs.addEventListener('click', eventUploadImgs)
  btnParserFile.addEventListener('click', eventParserFile)
  btnUploadInList.addEventListener('click', eventAddBotsInList)
  list.addEventListener('click', eventSelectElemList)

//! events end

  function eventAddBotsInList() {
      //! not work with a variable in a function (pathToFileJSONForBots)
      let bots = require(pathToFileJSONForBots)
      list.innerHTML = templateClearList
      bots.forEach((elem, index) => {
          const login = elem.authorization.login;
          const password = elem.authorization.password
          const id = elem.id
          const elementOfList = createDivOfList(index, login, password, id)
          list.append(elementOfList)
      })


      log('Addition done', console)
  }

  function eventSelectElemList(event) {
      if (event.target.id == 'login') {
          event.target.parentNode.parentNode.classList.toggle('selected')
          return
      }

      if (event.target.id == 'login-title') {
          const allElem = document.querySelectorAll('.list__elems')

          allElem.forEach(elem => {
              elem.classList.toggle('selected')
          })

          return
      }
      return
  }

  function eventParserFile() {
    pathFileWithBot = selectOfBotTxt.files[0].path
    log("Фаил: " + pathFileWithBot, console)
    const massage = startParser(pathFileWithBot)
    log(massage, console)
  }

  function eventUploadImgs() {
    
    arrayOfIds = findIdSelectedBotsInList()
    arrayOfObjectsBotsById = getBotsObjectByIdsInJson(arrayOfIds)
    
    arrayOfObjectsBotsById.forEach(obj => {
        botUploadImgs(obj, obj.pathImgs)
    })

    //! не работает путь до файла
  }




//! event load
})



