const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
function download(url, callback) {
    request(url, function(err, res, body) {
        if (err) { callback(null) }
        if (body) { callback(body) }
    })
}
const url = 'http://github.com/timqian/chinese-independent-blogs/blob/master/blogs-original.csv';
download(url, function(data) {
    console.log(111)
    if (data) {
        const $ = cheerio.load(data);
        let arr = []
        try {
            $('tr.js-file-line').each(function(index, e) {
                if (index > 0) { 
                    const bokeer = {}
                    $(e).children('td').each(function(index, child) {
                        const text = $(child).text()
                        switch (index) {
                            case 1: 
                                bokeer.name = text;
                            case 2:
                                bokeer.address = text;
                            case 3:
                                bokeer.rssFeed = text;
                            case 4:
                                bokeer.tags = text;
                            default:;
                        }
                    })
                    arr.push(bokeer) 
                }
                
                
            })
        } catch(err) {
            return []
        }
        try {
            fs.writeFileSync('./data.json', JSON.stringify(arr), 'utf8')
            console.log('写入文件成功')
        } catch(e) {
            console.log('写入文件失败')
        }
        return arr
    } else {
        console.log('error')
    }
});

