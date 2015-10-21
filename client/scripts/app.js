
// var Message = Backbone.Model.extend({
//   initialize: function(message) {
//     url: 'https://api.parse.com/1/classes/chatterbox';
//     defaults: {
//       username: '';
//       text: '';
//     }
//   }
// });

// var Messages = Backbone.Collection.extend({
//   model: Message
// });

// var MessageView = Backbone.View.extend({
//   el: '.chat',
//   initialize: function() {
//     this.model.on('change:text', this.render, this);
//   };

//   render: function() {
//     var html = [
//       '<p class=username>',
//         this.model.get('username') + ': ',
//       '</p>'
//       '<p>'
//         this.model.get('text'),
//       '</p>'
//     ].join('');

//     return this.$el.html(html);
//   }
// });
// var MessagesView = Backbone.View.extend({
//   el: '#chats',
//   initialize: function () {
//     this.collection.on('change:text', this.render, this);
//     setInterval(function() {this.model.fetch()}, 3000);
//   }, 

//   render: function() {
//     var html = [
//       '<div class=chat>',
//         // output from MessageView
//       '</div>'
//     ].join('');
//     return this.$el.html(html);
//   }
  
// });


var app = {};

$( document ).ready(function() {
    app.init();
    $(".btn").click(function(event){
      event.preventDefault();
      app.handleSubmit($('.msg'), $('.usr'), $('.rm'));
      $('.msg').val('');
      $('.usr').val('');
      $('.rm').val('');
    });
    $('#').click(function() {

    }); 
});

app.init = function () {
  this.server = 'https://api.parse.com/1/classes/chatterbox';
  this.rooms = [];
  this.currentRooms = {};
  setInterval(function() {
    app.clearMessages();
    app.fetch(); 
  }, 4000);
};

app.send = function(message) {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function() {
  $.ajax({
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: 'JSON',
    contentType: 'application/json',
    success: function (data) {
      // console.log(data);
      for (var i = 0; i < data.results.length; i++) {
        app.rooms.push(data.results[i]["roomname"]);
        app.addRoom(app.rooms);
        app.addMessage(data.results[i]);
      }
    },
    error: function (data) {
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
  if (message.username !== undefined && message.text !== undefined) {
    var user = this.escapeHTML(message.username);
    var txt = this.escapeHTML(message.text);
    $('#chats').append('<div class=chat><p class=username' + user + '>' + user + ":</p> <p>" + txt + '</p></div>');
  }
};

app.clearMessages = function(){
  $('#chats').empty();
};
app.addRoom = function (roomsArray) {
  for (var i = 0; i < roomsArray.length; i++) {
    if (roomsArray[i] !== undefined && roomsArray[i] !== "" && !app.currentRooms[roomsArray[i]]) {
      app.currentRooms[roomsArray[i]] = roomsArray[i];
      $('.room').append('<option value=' + roomsArray[i] + '>' + roomsArray[i] + '</option>'); //may need classname
    }
  }
};
app.addFriend = function () {
  //$('.username').click();
};

app.handleSubmit = function (msg, usr, rm) {
  console.log(message);
  var message = {};
  message.username = usr.val();
  message.text = msg.val();
  if (rm.val() === undefined || rm.val() === "") {
    message.roomname = $( "select.room option:selected").val();
    console.log(message.roomname);
  } else {
    message.roomname = rm.val();
  }
  app.send(message);
};








