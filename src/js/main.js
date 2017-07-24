members = [
    {id:  0, value: "A"},
    {id:  1, value: "B"},
    {id:  2, value: "C"},
    {id:  3, value: "D"},
    {id:  4, value: "E"},
    {id:  5, value: "F"},
    {id:  6, value: "G"},
    {id:  7, value: "H"},
    {id:  8, value: "I"},
    {id:  9, value: "J"},
    {id: 10, value: "K"},
    {id: 11, value: "L"},
    {id: 12, value: "M"},
    {id: 13, value: "N"},
    {id: 14, value: "O"},
    {id: 15, value: "P"},
    {id: 16, value: "Q"},
    {id: 17, value: "R"},
    {id: 18, value: "S"},
    {id: 19, value: "T"},
    {id: 20, value: "U"},
    {id: 21, value: "V"},
    {id: 22, value: "W"},
    {id: 23, value: "X"},
    {id: 24, value: "Z"},
    {id: 25, value: "AA"},
    {id: 26, value: "AB"},
    {id: 27, value: "AC"},
    {id: 28, value: "AD"}
];

data = {
    selected_ids: []
};

$('#start').click(function () {
    document.getElementById('screen').webkitRequestFullscreen();
    return false;
});

// var socket = new WebSocket("ws://localhost:3001");
// var socket = new WebSocket("ws://node-websocket-bingo.herokuapp.com")

var socket = io();
socket.on('bingo', function (data) {
    console.log(JSON.parse(data));
});

var interval;
var isRunning = false;
var id;
var value;

document.onkeydown = (function () {
    if (event.keyCode === 32) { // space
        if (isRunning) {
            // for SE section
            $("#mario").get(0).pause();
            $("#mario").get(0).currentTime = 0;
            $("#dora").get(0).play();

            // for extracting id section
            clearInterval(interval);
            value = $('#main').text();
            id = extract_corresponded_id_from_value(value);
            members = cut(id);
            data.selected_ids.push(id);

            // for websocket section
            socket.emit('bingo', JSON.stringify(data));
            console.log(JSON.stringify(data));
            isRunning = false;
        } else {
            // for SE section
            $("#mario").get(0).play();

            // for roulette section
            interval = setInterval(function () {
                $('#main').text(members[Math.floor(Math.random() * members.length)].value);
            }, 25);
            isRunning = true;
        }
    } else if (event.keyCode === 82) { // r
        socket.emit('reset', 0);
    } else if (event.keyCode === 84) { // t
        socket.emit('null', 0);
    } else if (event.keyCode === 13) { // enter
        $('#main').text(name_2)
    }
});

function cut(id) {
    return members.filter(function (v) {
        return v.id !== id;
    });
}

function extract_corresponded_id_from_value(option) {
    var id;
    members.forEach(function (v) {
        if (v.value === option) {
            id = v.name;
        }
    });
    return id;
}
