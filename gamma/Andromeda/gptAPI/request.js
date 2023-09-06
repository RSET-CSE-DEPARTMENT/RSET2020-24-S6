const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto('https://discord.com/api/v9/channels/1053101349908271114/messages');
  
  await page.setExtraHTTPHeaders({
    'Authorization': 'NzU1Nzk2NDI2ODY4NjU0MTcy.GOBbNS.qhnLd6oi97iPz2h5IxQFkZsw0FoM-eUNlqx0ZM'
  });

  await page.waitForSelector('textarea.slateTextArea-1Mkdgw');

  await page.type('textarea.slateTextArea-1Mkdgw', '/imagine');
  await page.keyboard.press('Enter');

  await browser.close();
})();