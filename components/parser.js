const fs = require('fs')

function createObj(arr) {
    const result = {
        id: '',
        authorization: {},
        cookies: {},
        email: {},
        progressImgs: {
            allImgs: '0',
            currentNumberImgs: '0',
            pathFoulderImgs: './',
        },
    };
    arr.forEach((elem, index) => {
        if ((elem.includes(':')) && (index == 0 || index == 1)) {
            const arr = elem.split(':');
            const idBot = 4 + arr[0].slice(1, 5) + 10;
            result['id'] = idBot
            result.authorization['login'] = arr[0];
            result.authorization['password'] = arr[1]
            return
        }
        if (elem.includes('@')) {
            const arr = elem.split(':');
            result.email['mailLogin'] = arr[0];
            result.email['mailPassword'] = arr[1]
            return
        }
        const split = elem.split('=');
        result.cookies[split[0]] = split[1]
    })
    return result
}

function parserTextInObj(textOneBot) {

    const strNoSpace = textOneBot.replace(/\s/g, '')
    const arr = strNoSpace.split(';');

    const arrAfterFilter = arr.filter(elem => {
        if (elem.includes('=') || 
            elem.includes('|I') ||
            elem.includes('||')) return true
    }).map(elem => {
        if (elem.includes('csrftoken')) {   
            const index = elem.indexOf('|');
            const result = elem.slice(index + 1);
            return result
        }
        if (elem.includes('|Instagra')) {   
            const index = elem.indexOf('|');
            const result = elem.slice(0, index);
            return result
        }
        if (elem.includes('||')) {   
            const index = elem.indexOf('||');
            const result = elem.slice(index + 2)
            return result
        }
        return elem
    })

    const result = createObj(arrAfterFilter)

    return result
}

function allBotsInObj(text) {
    const result = [];
    const splitBotsArr = text.split('\r\n').map(e => {
    e.replace(/\s/g, '')
    return e
}).filter(e => {
    if (e.length > 1) {
        return true
    }
});

splitBotsArr.forEach(text => {
    const obj = parserTextInObj(text);
    result.push(obj)
})
return result
}

function startParser(pathOfFile = './dat.txt') {
    try {
        if (!pathOfFile.includes(".txt")) {
            return "Фаил нужен текстовый .txt"
        };
        const str = fs.readFileSync(pathOfFile, 'utf8');
        const result = JSON.stringify(allBotsInObj(str));
        fs.writeFile('bots.json', result, (err) => {
            if(err) throw err;
        });
        return 'File bots.json created';
    } catch (err) {
        return err
    }
}

exports.startParser = startParser

