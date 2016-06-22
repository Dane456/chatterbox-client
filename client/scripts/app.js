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
  fetch: function(searchString) {
    console.log('Searching with string: ' + searchString);
    $.ajax({
      url: this.server,
      headers: {
        'X-Parse-Application-Id':'6UJYuifdHSHnOvG2DiYXU6cwluUvgDiVOpr8Weqi',
        'X-Parse-REST-API-Key':'gYu7Z35zwiNz4BaNgwyaq9u9A36eVHd38MiDvCH5'
      },
      type: 'GET',
      // data: JSON.stringify(message),
      contentType: 'application/json',
      data: searchString,
      //data: "'" + searchString + "'",
      success: function(data) {
        console.log('chatterbox: Messages received');
        results = data.results;
        parseData(results);
      },
      error: function(data) {
        console.error('chatterbox: Failed to receive message', data);
      }
    });
  },
  clearMessages: function() {
    $('#chats').children().remove();
  },
  addMessage: function(message, prependTo) {
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
    $message.addClass('message');
    if(prependTo){
      $('#chats').prepend($message);
    } else {
      $('#chats').append($message);
    }
  },
  addRoom: function(roomName) {
    var roomString = "<option/>";
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
  handleSubmit: function() {
    console.log('');
  },
  roomNames: {},
  getRoomNames: function() {
    this.fetch('where={"roomname":{"$exists":true}}');
  },
  createChatroom: function() {
    var newChat = $('.roomInput').val();
    var newChatEsc = this.escapeRegExp(newChat);
    this.send({username: 'na', text: 'na', roomname: newChatEsc});
    this.addRoom(newChatEsc);
  },
  escapeRegExp: function(str) {
    return str.replace(/[\&\<\>\"\'\ \`\!\@\$\%\(\)\ \=\+\{\}\[\ \]|]/g, "\\$&");
  },
  sendMessage: function() {
    var newMessage = $('.inputText').val();
    var newChatEsc = this.escapeRegExp(newMessage);

    var user = prompt('What is your name?');
    var newChat = $('#roomSelect').val();  
    var newChatRoomEsc = this.escapeRegExp(newChat);
    var message = {username: user, text: newChatEsc, roomname:newChatRoomEsc};

    this.send(message);
    this.addMessage(message, true);
  },
  friends: {},
};

var parseData = function(results) {
  if (Object.keys(app.roomNames).length === 0) {
    for (message of results) {
      console.log(message.roomname);
      app.roomNames[message.roomname] = message.roomname;
    }
  } else {
    appendData(results);
  }
};
var appendData = function(results) {
  
  for (var object of results) {
    console.log('Posting message with roomname: ' + object.roomname);
    app.addMessage(object);
    var roomNamesArray = Object.keys(app.roomNames);
    if (roomNamesArray.length !== $('#roomSelect').children().length) {
      $('#roomSelect').empty();
      roomNamesArray.forEach(function(room) {
        app.addRoom(room);
      });
    } 
  }
};

var refresh = function() {
  location.reload();
};

$(document).ready(function() { 
  // app.fetch("where={'roomname': 'lobby'}");
  app.getRoomNames();
  app.fetch('where={"roomname":"lobby"}');
  $('#roomSelect').on('change', function() {
    var selectedVal = this.value;
    app.clearMessages();
    app.fetch('where={"roomname":' + '"' + $(this).val() + '"' + '}');
    // for (var roomMessage of app.roomNames[selectedVal]) {
    //   app.addMessage(roomMessage);
    // }
  });
  $('body').on('click', 'a', function(e) {
    e.preventDefault();
    var text = $(this).text();
    app.friends[text] = text;
    $('a').each(function() {
      if (app.friends[$(this).text()]) {
        $(this).css('font-weight', 'bold');
      }
    });
  });
});





