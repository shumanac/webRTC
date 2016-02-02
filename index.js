process.env.NODE_ENV = process.env.NODE_ENV || 'development';


var express = require('express'),
    bodyParser = require('body-parser');
var app = express();

app.use('/static', express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.set('views', './app/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(9966, function () {
    console.log('Example app listening on port 9966!');
});


var getUserMedia = require('getusermedia')



getUserMedia({
    video: true,
    audio: false
}, function (err, stream) {
    if (err) return console.error(err)



    var Peer = require('simple-peer')
    var peer = new Peer({
        initiator: location.hash === '#init',
        trickle: false,
        stream: stream
    })

    peer.on('signal', function (data) {
        document.getElementById('yourId').value = JSON.stringify(data)
    })

    document.getElementById('connect').addEventListener('click', function () {
        var otherId = JSON.parse(document.getElementById('otherId').value)
        peer.signal(otherId)
    })

    document.getElementById('send').addEventListener('click', function () {
        var yourMessage = document.getElementById('yourMessage').value
        peer.send(yourMessage)
    })

    peer.on('data', function (data) {
        document.getElementById('messages').textContent += data + '\n'
    })

    peer.on('stream', function (stream) {
        var video = document.createElement('video')
        document.body.appendChild(video)

        video.src = window.URL.createObjectURL(stream)
        video.play()
    })
})