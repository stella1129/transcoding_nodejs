/**
 * Created by shiliyun on 2017/5/15.
 */
var express = require('express');
//form表单需要的中间件。
var mutipart = require('connect-multiparty');
var mutipartMiddeware = mutipart();
var fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
var app = express();
//下面会修改临时文件的储存位置，如过没有会默认储存别的地方，这里不在详细描述,这个修改临时文件储存的位置
app.use(mutipart({
    uploadDir: './public/upload'
}));
//设置http服务监听的端口号。
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
    console.log("Express started on http://localhost:" + app.get('port') + '; press Ctrl-C to terminate.');
});
//浏览器访问localhost会输出一个html文件
app.get('/', function(req, res) {
    res.type('text/html');
    res.sendfile('./public/html/login.html')
});
//这里就是接受form表单请求的接口路径，请求方式为post。
app.post('/upload', mutipartMiddeware, function(req, res) {
    //这里打印可以看到接收到文件的信息。
    console.log(req.files);
    //成功接受到浏览器传来的文件。我们可以在这里写对文件的一系列操作。例如重命名，修改文件储存路径等。
    console.log(req.files.myfile);
    var inputFile = req.files.myfile;
    var uploadedPath = inputFile.path;
    //console.log(uploadedPath)
    var dstPath = './public/realvideo/' + inputFile.originalFilename;
    var exchangePath = './public/convert/' + inputFile.originalFilename;
    var name = inputFile.name.split('.')[0];
    console.log('name ' + name)
    fs.rename(uploadedPath, dstPath, function(err) {
        if (err) {
            console.log('rename error: ' + err)
        } else {
            console.log('rename ok!');
            if (inputFile.originalFilename.split('.')[1] != 'MP4' && inputFile.originalFilename.split('.')[1] != 'mp4') {
                var trans = new ffmpeg({
                        source: dstPath
                    })
                    .setFfmpegPath('./ffmpegg/bin/ffmpeg.exe')
                    .withAspect('4:3')
                    .withSize('1280x960')
                    .applyAutopadding(true, 'white')
                    .toFormat('mp4')
                    .saveToFile("./public/convert/" + name + '.mp4', function(error, retcode) {
                        if (error) {
                            console.log(error)
                        } else {
                            console.log('ok')

                        }
                    })
                    .on('progress', function(progress) {
                        console.log('Processing: ' + progress.percent + '% done');
                    })

                .on('end', function() {
                    console.log('转码完成!');
                    //给浏览器返回一个成功提示。
                    res.send('转码完成!');



                })
            }
        }
    })



});