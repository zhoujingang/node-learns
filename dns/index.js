/**
 * 域名解析： dns.lookup()
 */

var dns = require('dns');
dns.lookup('www.kuwo.cn', function(err, address, family){
    if (err) throw err;
    console.log(address)
})

var options = {all: true}
dns.lookup('www.kuwo.cn', options, function(err, address, family) {
    if (err) throw err;
    console.log(address)
})

/**
 * 域名解析 dns.resolve4()
 */
dns.resolve4('www.kuwo.cn', function(err, address) {
    if (err) throw err
    console.log('====', JSON.stringify(address));
});

// 可能最大的差异就在于，当配置了本地Host时，是否会对查询结果产生影响。

// dns.lookup()：有影响。
// dns.resolve4()：没有影响。