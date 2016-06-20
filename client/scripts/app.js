// YOUR CODE HERE:
var message = {
  username: 'shawndrost',
  text: "<script>$('#main h1').text('Dane and Roy were here ;)')</script>",
  roomname: '4chan'
};

$.ajax({
  url: 'https://api.parse.com/1/classes/messages',
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


$.ajax({
  url: 'https://api.parse.com/1/classes/messages',
  headers: {
    'X-Parse-Application-Id':'6UJYuifdHSHnOvG2DiYXU6cwluUvgDiVOpr8Weqi',
    'X-Parse-REST-API-Key':'gYu7Z35zwiNz4BaNgwyaq9u9A36eVHd38MiDvCH5'
  },
  type: 'GET',
  // data: JSON.stringify(message),
  contentType: 'application/json',
  success: function(data) {
    var results = data.results;
    appendData(results);
  },
  error: function(data) {
    console.error('chatterbox: Failed to receive message', data);
  }
});

var $genMessage = $("<div class='message'><h3>Test</h3><p></p></div>");

var appendData = function(results) {

  for (var message of results) {
    $genMessage.select('h3')

    $('.messages').append($genMessage);
  }
};

