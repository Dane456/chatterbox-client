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
        debugger;
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
        results = data.results;
        appendData(results);
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
    $message.addClass('username');
    if(prependTo){
      $('#chats').prepend($message);
    } else {
      $('#chats').append($message);
    }
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
  handleSubmit: function() {
    console.log('');
  },
  roomNames: {},
  createChatroom: function() {
    var newChat = $('.roomSelect').val();
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
  }
};

app.fetch();

var appendData = function(results) {
  
  var genStr = "<div class='message'><h3></h3><p></p></div>";
  var $message = $($.parseHTML(genStr));
  
  for (var message of results) {
    //if roomName is not defined add message to new room
    if (app.roomNames[message.roomname] === undefined) {
      app.roomNames[message.roomname] = [message];
      app.addRoom(message.roomname);
    }
    //only append if message does not exist 
    else {
      app.roomNames[message.roomname].push(message);
    }
  }
  for (var object of results) {
    if (object.roomname === $('#roomSelect').val()) {
      app.addMessage(object); 
    }
  }

};

// {
//   roomName1: [{
//               message1:'blah',
//               un: 'dude',
//               room: 'kink.com'
//             },
//             {
//               message2: 'dude',
//               un: 'chocolaterain',
//               room: 'cheeseplease'
//             }],
// roomName2: [{
//               message1:'blah',
//               un: 'dude',
//               room: 'kink.com'
//             },
//             {
//               message2: 'dude',
//               un: 'chocolaterain',
//               room: 'cheeseplease'
//             }]
// }

var refresh = function() {
  location.reload();
};

$(document).ready(function() { 
  $('#roomSelect').on('change', function(e) {
    //Get selected item
    var selectedVal = this.value;
    app.clearMessages();
    // debugger;
    for (var roomMessage of app.roomNames[selectedVal]) {
      app.addMessage(roomMessage);
    }
    //repopulate the page with relevant results
  });
  //debugger;
  //$('.newRoom').on('click', console.log('dane'));
});





