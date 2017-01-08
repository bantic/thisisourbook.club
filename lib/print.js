// use this to print out all of the items
//
var meetings = require('../_data/meetings.json');

function logMeeting(m) {
  console.log(`
    Date: ${m.title}
    Host: ${m.host}
    Books: ${m.books.map(b => b.title).join(', ')}
  `);
}

meetings.forEach(logMeeting);
