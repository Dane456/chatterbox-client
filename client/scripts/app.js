// YOUR CODE HERE:
var ourMessage = {
  username: 'djre',
  text: "test1",
  roomname: '4chan'
};


var app = {
  init: function() {
    this.addFriend();
    this.handleSubmit();
  },
  send: function(message) {
    $.ajax({
      url: this.server,
      headers: {
        'X-Parse-Application-Id':'6UJYuifdHSHnOvG2DiYXU6cwluUvgDiVOpr8Weqi',
        'X-Parse-REST-API-Key':'gYu7Z35zwiNz4BaNgwyaq9u9A36eVHd38MiDvCH5'
      },
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log('chatterbox: Message sent');
      },
      error: function(data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  server: 'https://api.parse.com/1/classes/messages',
  fetch: function() {
    $.ajax({
      url: this.server,
      headers: {
        'X-Parse-Application-Id':'6UJYuifdHSHnOvG2DiYXU6cwluUvgDiVOpr8Weqi',
        'X-Parse-REST-API-Key':'gYu7Z35zwiNz4BaNgwyaq9u9A36eVHd38MiDvCH5'
      },
      type: 'GET',
      // data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        var results = data.results;
        //appendData(results);
      },
      error: function(data) {
        console.error('chatterbox: Failed to receive message', data);
      }
    });
  },
  clearMessages: function() {
    $('#chats').children().remove();
  },
  addMessage: function(message) {
    //Generate HTML String
    var genStr = "<div class='message'></div>";
    var unStr = message.username;
    var pStr = message.text;

    var $un = $($.parseHTML(unStr));
    var $userText = $($.parseHTML(pStr));
    //Turn HTML String into JQuery Object
    var $message = $($.parseHTML(genStr));
    $message.append("<a href='#'>" + $un.text() + "</a>");
    $message.append("<p>" + $userText.text() + "</p>");
    $message.addClass('username');
    $('#chats').append($message);
    //debugger;
  },
  addRoom: function(roomName) {
    var roomString = "<option></option>";
    var $room = $($.parseHTML(roomString));
    $room.attr('value', roomName);
    $room.text(roomName);
    $('#roomSelect').append($room);
  },
  addFriend: function() {
    $('.messages').find('.username').on('click', function() {
      return true;
    });
  },
  escapeHTML: function(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  },
  handleSubmit: function() {
    console.log('');
  }

};
var entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': '&quot;',
  "'": '&#39;',
  "/": '&#x2F;'
};




// var appendData = function(results) {
  var genStr = "<div class='message'><h3>Test</h3><p></p></div>";
  var $message = $($.parseHTML(genStr));
//  // debugger;
//   for (var message of results) {

//     var finMessage = $.parseHTML($message);
//     $('.messages').append($message);
//   }
// };

