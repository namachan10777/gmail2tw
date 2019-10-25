var CONSUMER_KEY = "<-CONSUMER_KEY->";
var CONSUMER_SECRET = "<-CONSUMER_SECRET->";
var INTERVAL = 30;

var twitter = TwitterWebService.getInstance(
  CONSUMER_KEY,
  CONSUMER_SECRET
);
 
function authorize() {
  twitter.authorize();
}
 
function reset() {
  twitter.reset();
}
 
function authCallback(request) {
  return twitter.authCallback(request);
}

function send(msg) {
  
  var service  = twitter.getService();
  var endPointUrl = 'https://api.twitter.com/1.1/statuses/update.json';
  
  var response = service.fetch(endPointUrl, {
    method: 'post',
    payload: {
      status: '@namachan10777 \nFROM: ' + msg.from + '\nSUBJECT: ' + msg.subj
    }
  });
}

function fetchNewMail() {
  const now = Math.floor(Date.now() / 1000);
  const query = '(is:unread after:' + (now - (60 * INTERVAL)) + ')';
  const threads = GmailApp.search(query);
  const msgs = GmailApp.getMessagesForThreads(threads);

  for (var i = 0; i < msgs.length; ++i) {
    send({
      from: msgs[i].slice(-1)[0].getFrom(),
      subj: msgs[i].slice(-1)[0].getSubject(),
    });
  }
}

