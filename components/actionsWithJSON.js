const fs = require('fs')
const pathToFileJSONForBots = "C:/Users/cumputer/Desktop/myAppElectron/danilaBotInst/bots.json"
const { log } = require('./console.js');

function setValueInObjOfBotsJson(id, key, value) {
    let listOfAllBots = require(pathToFileJSONForBots);
    
    listOfAllBots.map(elem => {
        if (elem.id == id) {
            if (key === 'login' ||
                key === 'password') {
                    elem.authorization[key] = value;
                    return elem;
            }
            if (key === 'csrftoken' ||
                key === 'rur' ||
                key === 'mid' ||
                key === 'urlgen' ||
                key === 'ds_user' ||
                key === 'shbid' ||
                key === 'shbts' ||
                key === 'ds_user_id' ||
                key === 'sessionid' ||
                key === 'igfl' ||
                key === 'ig_did' ||
                key === 'Authorization') {
                    elem.cookies[key] = value;
                    return elem;
            }
            if (key === 'mailLogin' ||
                key === 'mailPassword') {
                    elem.email[key] = value;
                    return elem;
                }
            if (key === 'allImgs' ||
                key === 'currentNumberImgs' ||
                key === 'pathFoulderImgs') {
                    elem.progressImgs[key] = value;
                    return elem;
            }
        }
    })

    saveContentInBotsJson(listOfAllBots)

    log(`bot = ${id}: ${key} = ${value}`, console)
}

function getValueInObjOfBotsJson(id, key) {
    let listOfAllBots = require(pathToFileJSONForBots);
    let result;
    listOfAllBots.forEach(elem => {
        if (elem.id == id) {
            if (key === 'login' ||
                key === 'password') {
                    result = elem.authorization[key]
            }
            if (key === 'csrftoken' ||
                key === 'rur' ||
                key === 'mid' ||
                key === 'urlgen' ||
                key === 'ds_user' ||
                key === 'shbid' ||
                key === 'shbts' ||
                key === 'ds_user_id' ||
                key === 'sessionid' ||
                key === 'igfl' ||
                key === 'ig_did' ||
                key === 'Authorization') {
                    result = elem.cookies[key]
            }
            if (key === 'mailLogin' ||
                key === 'mailPassword') {
                    result = elem.email[key]
                     
                }
            if (key === 'allImgs' ||
                key === 'currentNumberImgs' ||
                key === 'pathFoulderImgs') {
                    result = elem.progressImgs[key]  
            }
        }
    })
    return result
}

function saveContentInBotsJson(content) {
    const contentInJSON = JSON.stringify(content)
    fs.writeFileSync('bots.json', contentInJSON);
}

function getBotsObjectByIdsInJson(arrAndStringOfId) {
    const result = [];
    let listOfAllBots = require(pathToFileJSONForBots)

    if (arrAndStringOfId.length > 1) {
        arrAndStringOfId.forEach(id => {
            listOfAllBots.forEach(elem => {
                if (id == elem.id) {
                    result.push(elem)
                }
            })
        })
        return result
    }

    if (arrAndStringOfId.length <= 1) {
        const id = arrAndStringOfId[0]
        listOfAllBots.forEach(elem => {
            if (id == elem.id) {
                result.push(elem)
            }
        })
        return result
    }
}

exports.setValueInObjOfBotsJson = setValueInObjOfBotsJson;
exports.getValueInObjOfBotsJson = getValueInObjOfBotsJson;
exports.saveContentInBotsJson = saveContentInBotsJson;
exports.getBotsObjectByIdsInJson = getBotsObjectByIdsInJson;