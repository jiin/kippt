## 
###

![Kippt](https://d17f28g3dsa4vh.cloudfront.net/img/kippt-logo-r.png)

## Installation

[![Travis](https://api.travis-ci.org/jiin/kippt.png)](https://api.travis-ci.org/jiin/kippt)

Install this version via git:
```bash
npm install git://github.com/jiin/kippt
```

And use in your node source:
```javascript
var Kippt = require('kippt');
```

## Usage

### Authentication

You can use API only if you are authenticated. You can authenticate via API Token or via username/password combination.

### API Token
```javascript
var client = new Kippt({ 
    username: 'your_nickname'
  , api_token: '31e4d0b0d47acaf3ebbeb187d17d67cfddec79c1' 
});
```

### Username/Password
```javascript
var client = new Kippt({ 
    username: 'your_nickname'
  , password: 'your_password'
});
```

### Get account details
```javascript
var client = new Kippt({ 
    username: 'your_nickname'
  , api_token: '31e4d0b0d47acaf3ebbeb187d17d67cfddec79c1' 
});

client.account( function( err, result ) {
  console.log( result );
});
```

Output:
```javascript
{ 
  username: 'your_nickname',
  app_url: '/your_nickname',
  lists: '/api/users/your_nickname/lists/',
  avatar_url: 'your_avatar',
  api_token: '31e4d0b0d47acaf3ebbeb187d17d67cfddec79c1',
  id: 666666,
  resource_uri: '/api/users/666666/' 
}
```

## Resources

### Lists

Return object contains all the lists:
```javascript
client.lists( function( err, lists ) {
  console.log( lists );
});
```

Only returns the list that id is the first argoument.
```javascript
client.lists('123456', function( err, lists ) {
  console.log( lists );
});
```

Limit and offset can be controlled:
```javascript
client.lists({ limit: 5, offeset: 2 }, function( err, lists ) {
  console.log( lists );
});
```

### Clips

Return object contains all the clips:
```javascript
client.clips( function( err, clips ) {
  console.log( clipss );
});
```

Only returns the clips that id is the first argoument.
```javascript
client.clips('654321', function( err, lists ) {
  console.log( clipss );
});
```

Limit and offset can be controlled:
```javascript
client.clips({ limit: 5, offeset: 2 }, function( err, clips ) {
  console.log( clips );
});
```

### Search

Return clips searched:
```javascript
client.search('css', function( err, result ) {
  console.log( result );
});
```

### Starred

You can return the starred clips:
```javascript
client.starred(function( err, starred ) {
  console.log( starred );
});
```

## Modify resource

### Creating

You can create a clip:
```javascript
client.add({ type: 'clips' },{ title: 'new_clip', url: 'your_url' }, function( err, result ) {
  console.log( result );
});
```
You can create a list:
```javascript
client.add({ type: 'lists' },{ title: 'new_clip', url: 'your_url' }, function( err, result ) {
  console.log( result );
});
```

### Updating

You can update a clip:
```javascript
client.update({ type: 'clips', id: '654321' }, { url: 'http://newurl.com/' }, function( err, result ) {
  console.log( result );
});
```

You can update a list:
```javascript
client.update({ type: 'lists', id: '654321' }, { name: 'newname' }, function( err, result ) {
  console.log( result );
});
```

### Deleting

You can deleting a clip:
```javascript
client.delete({ type: 'clips', id: '123456' }, function( err, result ) {
  console.log( result );
});
```
You can deleting a list:
```javascript
client.delete({ type: 'lists', id: '654321' }, function( err, result ) {
  console.log( result );
});
```
