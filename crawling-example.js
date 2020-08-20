/*
  - Dividir em classes crawling e notificação telegram
  - Criar regra para salvar quem tiver sala aberta


*/



const puppeteer = require('puppeteer')

//BOT
const TelegramBot = require( 'node-telegram-bot-api' )
const TOKEN = 'SDADADAS' //ID BOT TELEGRAM
const bot = new TelegramBot( TOKEN, { polling: true } )


//Usuario enviando msg
bot.on('message', (msg) => {
    
    console.log(msg.chat.id)
    console.log(msg.text.toString())

    //Respondendo msg
    bot.sendMessage(msg.chat.id,"Hello dear user");

});

//ENVIA NOTIFICAÇÃO PELO O TELEGRAM, QUANDO TEM SALA ABERTA
function notificaTelegram(acao , codigoEmpresa){

  bot.sendMessage(581647920,'Empresa: ' + codigoEmpresa + ' -> Valor ação: ' + acao );

}



//RECERA O VALOR DA AÇÃO
let scrape = async (codigoEmpresa) => {

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('https://www.google.com/search?q=BVMF%3A' + codigoEmpresa + '&oq=BVMF%3A' + codigoEmpresa)
    
    const valor = await page.evaluate(() => document.querySelector('.IsqQVc' ).textContent);

    notificaTelegram(valor, codigoEmpresa)
    
    return valor

}


//FAZ A CHAMADA
scrape('CIEL3').then((value) => { 
  console.log(value)
})


    
   




    




