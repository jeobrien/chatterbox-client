

var app = {};

$( document ).ready(function() {
    app.init();
    $(".btn").click(function(event){
      event.preventDefault();
      app.handleSubmit($('.msg'), $('.usr'));
    }); 
    // $(this).on('click', '.username', this.addFriend());
});

app.init = function () {
  this.server = 'https://api.parse.com/1/classes/chatterbox';
  this.rooms = [];
  setInterval(function() {
    app.clearMessages();
    app.fetch(); 
    // console.log(app.rooms);
  }, 4000);
  // $('.msg').on('click', 'button', function () {
  //   console.log("hello");
  //   //this.handleSubmit($(this).text()); 
  // });
  // $(this).on('click', '.submit', this.handleSubmit());
};

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: 'JSON',
    contentType: 'application/json',
    success: function (data) {
      var arr = data.results;
      console.log(data.results);
      for (var i = 0; i < arr.length; i++) {
        // if (app.rooms.indexOf(data.results[i].roomname) < 0) {
          app.rooms.push(data.results[i].roomname);
        // }
        // console.log(arr[i].text);
        app.addMessage(arr[i]);
      }
      //this.addMessage(data);
      //console.log('chatterbox: Message retrieved');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to retrieve message');
    }
  });
};

app.escapeHTML = function (unsafe_str) {
  return unsafe_str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#39;'); // '&apos;' is not valid HTML 4
};

app.addMessage = function(message) {
  var user = this.escapeHTML(message.username);
  var txt = this.escapeHTML(message.text);
  $('#chats').append('<div class=chat><p class=username>' + user + ":</p> <p>" + txt + '</p></div>');
};

app.clearMessages = function(){
  $('#chats').empty();
};
app.addRoom = function (message) {
  $('.room').append('<option>' + message.roomname + '</option>'); //may need classname
};
app.addFriend = function () {
  //$('.username').click();
};

app.handleSubmit = function (msg, usr) {
  console.log(message);
  var message = {};
  message.username = usr.val();
  message.text = msg.val();
  message.roomname = "room1";
  app.send(message);
};








