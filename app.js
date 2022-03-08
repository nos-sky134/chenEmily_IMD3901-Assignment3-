const express   = require('express');
const app       = express();
const http      = require('http');
const server    = require('http').createServer(app);  
const io        = require('socket.io')(server);

const LISTEN_PORT   = 8080;

server.listen(LISTEN_PORT);
app.use(express.static(__dirname + '/public')); //set root path of server ...

console.log("Listening on port: " + LISTEN_PORT );

//our routes
app.get( '/', function( req, res ){ 
    res.sendFile( __dirname + '/public/index.html' );
});

app.get( '/2D', function( req, res ){ 
    res.sendFile( __dirname + '/public/2D.html' );
});

app.get( '/3D', function( req, res ){ 
    res.sendFile( __dirname + '/public/3D.html' );
});

//socket.io stuff
io.on('connection', (socket) => {

    console.log( socket.id + " connected" );

    socket.on('disconnect', () => {
        console.log( socket.id + " disconnected" );
    });

    socket.on("red", (data) => {
        console.log( "red event received" );
        io.sockets.emit("Moving", true);
        console.log( "end of red event" );
    });

    socket.on("blue", (data) => {
        console.log( "blue event received" );
        io.sockets.emit("Moving", false);

    });


    socket.on("left", (data) => {
        console.log( "red event received" );
        io.sockets.emit("color_change", {r:255, g:0, b:0});
    });

    socket.on("right", (data) => {
        console.log( "red event received" );
        io.sockets.emit("color_change", {r:255, g:0, b:0});
    });

    
    //infinite loop with a millisecond delay (but only want one loop running ...)
    //a way to update all clients simulatenously every frame i.e. updating position, rotation ...
    // if (setIntervalFunc == null) {
    //     console.log("setting interval func");
    //     setIntervalFunc = setInterval( () => {
    //         //if we want to do loops 
    //     }, 50);
    // }
});