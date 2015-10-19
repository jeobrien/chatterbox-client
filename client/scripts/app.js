// YOUR CODE HERE:
// Why no URL for ajax GET?

var app = {};

app.init = function () {
  app.server = 'https://api.parse.com/1/classes/chatterbox';
  $(this).on('click', '.username', this.addFriend());
  $(this).on('click', '.submit', this.handleSubmit());
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
      console.log('chatterbox: Message retrieved');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to retrieve message');
    }
  });
};

app.addMessage = function(message) {
  $('#chats').append('<div class="' + message.username + '">' + message.text + '</div>');
};

app.clearMessages = function(){
  $('#chats').empty();
};
app.addRoom = function (message) {
  $('#roomSelect').append('<div>' + message.roomname + '</div>');
};
app.addFriend = function () {
  //$('.username').click();
};
app.handleSubmit = function () {
  //$('.submit').click();
};








