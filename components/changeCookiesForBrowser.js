function changeCookiesForBrowser(obj) {
    const csrftoken = obj.csrftoken || '';
    const rur = obj.rur || '';
    const mid = obj.mid || '';
    const ds_user_id = obj.ds_user_id || '';
    const sessionid = obj.sessionid || ''; 
    const ig_did = obj.ig_did || '';
  
    const result = [{
      name: 'rur',
      value: rur,
      url: 'https://www.instagram.com/',
      domain: '.instagram.com',
      path: '/',
      expires: -1,
      httpOnly: true,
      secure: true,
      sameSite: 'Stric',
    },
    {
      name: 'sessionid', 
      value: sessionid,
      url: 'https://www.instagram.com/',
      domain: '.instagram.com',
      path: '/',
      expires: 1677118550.913065, //2023-02-23T14:15:51.561Z
      httpOnly: true,
      secure: true,
      sameSite: 'Stric',
    },
    {
      name: 'csrftoken',  
      value: csrftoken,
      url: 'https://www.instagram.com/',
      domain: '.instagram.com',
      path: '/',
      expires: 1677032167.111801,
      httpOnly: false,
      secure: true,
      sameSite: 'Stric',
    },
    {
      name: 'ds_user_id',   
      value: ds_user_id,
      url: 'https://www.instagram.com/',
      domain: '.instagram.com',
      path: '/',
      expires: 1653358567.111933,
      httpOnly: false,
      secure: true,
      sameSite: 'Stric',
    },
    {
      name: 'ig_did',
      value: ig_did,
      url: 'https://www.instagram.com/',
      domain: '.instagram.com',
      path: '/',
      expires: 1708654518.540937,
      httpOnly: true,
      secure: true,
      sameSite: 'Stric',
    },
    {
      name: 'mid',   
      value: mid,
      url: 'https://www.instagram.com/',
      domain: '.instagram.com',
      path: '/',
      expires: 1708654518.540809,
      size: 31,
      httpOnly: false,
      sameSite: 'Stric',
    },
    // {
    //   name: 'ig_nrcb',   
    //   value: '1',
    //   url: 'https://www.instagram.com/',
    //   domain: '.instagram.com',
    //   path: '/',
    //   expires: '',
    //   size: 8,
    //   httpOnly: false,
    //   sameSite: 'Stric',
    // }
]
    return result
  }

  exports.changeCookiesForBrowser = changeCookiesForBrowser