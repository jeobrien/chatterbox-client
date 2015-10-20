// YOUR CODE HERE:
// Why no URL for ajax GET?

var app = {};

app.init = function () {
  this.server = 'https://api.parse.com/1/classes/chatterbox';
  $(this).on('click', '.username', this.addFriend());
  $(this).on('click', '.submit', this.handleSubmit());
  // this.data = this.fetch();
  // console.log(data);
  // for (var i = 0; i < data.length; i++) {
  //   this.addMessage(data[i]);
  // }
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
      // console.log(data);
      var arr = data.results;
      // console.log(data);
      for (var i = 0; i < arr.length; i++) {
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
  console.log(user);
  $('#chats').append('<div class=".username"><p>' + user + ":</p> <p>" + txt + '</p></div>');
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
app.handleSubmit = function () {
  //$('.submit').click();
};








