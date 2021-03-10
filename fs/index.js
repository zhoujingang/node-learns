/**
 * 同步读取
 */
var fs = require('fs');
var data;
try {
    data = fs.readFileSync('./file.txt', 'utf8');
    console.log('文件内容: ' + data);
} catch(err) {
    console.error('读取文件出错：' + err.message)
}

/**
 * 异步读取
 */
fs.readFile('./file.txt', 'utf8', function(err, data) {
    if (err) {
        return console.error('读取文件出错：' + err.message)
    }
    console.log('文件内容: ' + data);
})

/**
 * 通过文件流读取
 */
var readStream = fs.createReadStream('./file.txt', 'utf8');
readStream.on('data', function(chunk) {
    console.log('读取数据: ' + chunk);
}).on('error', function(err){
    console.log('出错: ' + err.message);
})
.on('end', function(){  // 没有数据了
    console.log('没有数据了');
})
.on('close', function(){  // 已经关闭，不会再有事件抛出
    console.log('已经关闭');
});

/**
 * 同步写入文件
 */
try {
    fs.writeFileSync('./write.txt', 'hello world', 'utf8')
    console.log('同步写入文件成功')
} catch(err) {
    throw err
}
/**
 * 文件写入
 */
fs.writeFile('./write.txt', 'hello world', 'utf-8', function(err){
    if(err) throw err;
    console.log('文件写入成功');
})

/**
 * 通过文件流写入文件
 */
const writeStream = fs.createWriteStream('./write.txt', 'utf8');
writeStream.on('close', function() {
    console.log('已经关闭')
})
writeStream.write('hello');
writeStream.write(' ');
writeStream.write('world');
writeStream.end('');

/**
 * 判断文件是否存在
 */
fs.access('./file.txt', function(err) {
    if (err) throw err;
    console.log('file.txt存在');
})

/**
 * 创建目录 （如果文件已存在，会报错）
 */
fs.mkdir('./hello', function(err) {
    if (err) throw err;
    console.log('目录创建成功')
})

/**
 * 同步创建目录
 */
try{
    // fs.mkdirSync('./hello2')
    console.log('目录创建成功')
} catch(err) {
    if (err) throw err;
}

/**
 * 删除文件 （如果文件不存在，会报错）
 */
// fs.unlink('./write.txt', function(err) {
//     if (err) throw err;
//     console.log('文件删除成功')
// })

/**
 * 同步删除文件
 */
try{
    // fs.unlinkSync('./write.txt')
    console.log('同步删除文件成功')
} catch (err) {
    if (err) throw err;
}

var options = {
    persistent: true,  // 默认就是true
    interval: 2000  // 多久检查一次
}
fs.watchFile('./watch.txt', options, function(cur, prev){
    console.log('修改时间为：' , cur)
})


