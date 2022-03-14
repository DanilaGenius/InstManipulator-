const {setValueInObjOfBotsJson} = require('./actionsWithJSON.js')


const { log } = require('./console.js');
const console = document.querySelector('#console')

function findIdSelectedBotsInList() {
    const idsArray = [];
    const elems = list.querySelectorAll('.selected');
    elems.forEach(elem => {
        const id = elem.getAttribute('data-id-bot');
        idsArray.push(id);
    })
    return idsArray;
}

function getDivInfoOfBotInList(id, divList, elemId) {
    const div = divList.querySelector(`#${elemId}[data-id-bot="${id}"]`)
    return div
}

function setTextInDivOfBotInList(id, divList, elemId, value) {
    const div = divList.querySelector(`#${elemId}[data-id-bot="${id}"]`)
    div.textContent = value
}

function createDivOfList(index, login, password, idBot) {
    const div = document.createElement('div');
    const id = idBot
    div.classList.add('list__elems')
    div.id = id
    div.setAttribute('data-id-bot', id)
    div.innerHTML = `<div class="list__elems-num list__elem"> 
                          <div class="list__elems-elem" id="id" data-id-bot="${id}">${id}</div>
                      </div>
                      <div class="list__elems-login list__elem" >
                          <div class="list__elems-elem" id="login" data-id-bot="${id}">${login}</div>
                      </div>
                      <div class="list__elems-pass list__elem">
                          <div class="list__elems-elem" id="password" data-id-bot="${id}">${password}</div>
                      </div>
                      <div class="list__elems-progress list__elem" >
                          <div class="list__elems-elem" id="progress" data-id-bot="${id}">?</div>
                      </div>

                      <div class="list__elems-imgs list__elem">
                          <div class="list__elems-elem">
                              <input  class="list__elems-select" type="file" id="pathToFoulder" data-id-bot="${id}" webkitdirectory />
                          </div>
                      </div>`

    div.querySelector("#pathToFoulder").addEventListener('change', eventSelectFoulderImgs)
    return div
}

function eventSelectFoulderImgs() {
    const pathRelative = getPathParent(this.files[0].path)
    const filesLength = this.files.length + '';
    const idBot = this.getAttribute('data-id-bot');

    setValueInObjOfBotsJson(idBot, 'allImgs', filesLength);
    setValueInObjOfBotsJson(idBot, 'pathFoulderImgs', pathRelative);
    setTextInDivOfBotInList(idBot, list, 'progress', `0/${filesLength}`);
    
}

function getPathParent(pathNode) {
    const pathSplit = pathNode.split('\\');
    pathSplit.pop();
    const pathRelative = pathSplit.join('\\') + '\\';
    return pathRelative;
}

exports.findIdSelectedBotsInList = findIdSelectedBotsInList
exports.getDivInfoOfBotInList = getDivInfoOfBotInList
exports.setTextInDivOfBotInList = setTextInDivOfBotInList
exports.createDivOfList = createDivOfList
exports.eventSelectFoulderImgs = eventSelectFoulderImgs