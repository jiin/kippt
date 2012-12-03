var Kippt = require('./lib/kippt');

var lal = new Kippt({ username: 'Jiin', api_token: '6e77cd2f32d97857edb1f34167f70b88da60f3ca' });

lal.lists( function( err, lists ) {
  console.log( lists );
});

lal.starred(function( err, lists ) {
  console.log( lists );
});

/*
lal.delete({ id: '221337', type: 'lists' }, function( err, res ) {
  console.log( res );
});
*/

lal.account(function( err, body ) {
  console.log( body );
});

//lal.update({ id: '9554393', type:'clips' }, { is_starred: true }, function( err, res ) {
//  console.log( res );
//});

//lal.getStarred( function( err, lists ) {
//  console.log( lists );
//});

//lal.search('css', function( err, clips ) {
//  console.log( clips );
//});

// lal.update('221337', { is_starred: true, url: 'http://google.it/', list:'221337' }, function( err, res ) {
//   console.log( res );
// });