var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

// index.htmlから読み込まれている静的ファイルを送れるようにしておく
app.use(express.static('src/'));

// GETされたらindex.htmlを送信する
app.get('/', function(req, res){
    res.sendfile('src/index.html');
});

// クライアントからの接続を待つ
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    // クライアントからメッセージを受け取ったら投げ返す
    socket.on('bingo', function(msg){
        // 同じクライアントに送信する場合は socket.emit を io.emit に変える
        console.log(msg);
        io.emit('bingo', msg);
    });
    socket.on('reset', function(msg){
        io.emit('reset', msg);
    });
    socket.on('null', function(msg){
        io.emit('null', msg);
    });

});

http.listen(PORT, function(){
    console.log('listening on *:3000');
});