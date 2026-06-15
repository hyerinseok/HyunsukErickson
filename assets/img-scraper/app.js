const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs')

const url = 'https://www.hyunsukerickson.art/drawings'
let linkList = []
let dlinkList = []


const getWebsiteLinks = async (url) => {
  try {
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)
    $('div.js-content-mode-element').each(function (i, elem) {  
      let link = $(elem).find('img').attr('data-src')
      linkList.push(link)
    });
  } catch (error) {
    console.error(error)
  }
}


const downloadLinks = async (linkList) => {
  var count = 0;
  for (const link of linkList) {
    const response = await axios({
      url: link,
      method: 'GET',
      responseType: 'stream'
    });
    console.log(link)
  
    //console.log("C:\\Users\\perso\\Downloads\\GoalKicker-Books-Script-master\\GoalKicker-Books-Script-master\\imgs\\" + count + ".jpeg")
    
    const writer = fs.createWriteStream("C:\\Users\\perso\\Downloads\\GoalKicker-Books-Script-master\\GoalKicker-Books-Script-master\\drawings\\" + count + ".jpeg");
      response.data.pipe(writer);

    count++;
  }  
  
}

(async () => {
  await getWebsiteLinks(url)
  await downloadLinks(linkList)
})()