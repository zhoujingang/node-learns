var http = require('http');
var server = http.createServer(function(req, res) {
    console.log('收到客户端请求', req.url)
    req.on('aborted', function() {
        console.log('客户端请求aborted')
    })
    req.on('close', function() {
        console.log('客户端请求close')
    })
    var url = req.url;
    // res.end('您访问的地址是：' + url)
});
server.listen(3000);

var client = http.get('http://127.0.0.1:3000/abc', function(res){
    res.pipe(process.stdout)
})
setTimeout(function() {
    client.abort()
},  100)
