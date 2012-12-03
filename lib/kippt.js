var request = require('request');

var Kippt = function( config ) {

  this._config = config;
  this._prefix = 'https://kippt.com/api';

  ( this._config.api_token )
    ? this._auth = { 'X-Kippt-Username': this._config.username, 'X-Kippt-API-Token': this._config.api_token }
    : this._auth = { 'Authorization': 'Basic ' + new Buffer( this._config.username + ':' + this._config.password ).toString('base64') };
};

Kippt.prototype._serialize = function( object ) {
  var str = '';
  Object.keys( object ).forEach( function( i ) {
    str += ( i + '='+ object[i] + '&' );
  });
  return str.slice(0,-1);
};

Kippt.prototype.account = function( cb ) {
  request({
      method: 'GET'
    , uri: this._prefix + '/account/'
    , headers: this._auth
  }, function( err, res, body ) {
    ( err )
      ? cb( err, null )
      : cb( null, JSON.parse( body )  );
  });
};

Kippt.prototype.add = function( config, data, cb ) {
  var type = config.type || 'clips';

  request({
      method: 'POST'
    , uri: this._prefix + '/' + type + '/'
    , body: JSON.stringify( data )
    , headers: this._auth
  }, function( err, res, body ) {
    ( err )
      ? cb( err, null )
      : cb( null, JSON.parse( body )  );
  });
};

Kippt.prototype.update = function( config, data, cb ) {
  if(!(config.id))
    throw new Error('Missing id parameters in update');

  var type = config.type || 'clips';
  var id   = config.id;

   request({
      method: 'PUT'
    , uri: this._prefix + '/' + type + '/' + id + '/'
    , body: JSON.stringify( data )
    , headers: this._auth
  }, function( err, res, body ) {
    ( err )
      ? cb( err, null )
      : cb( null, JSON.parse( body ) );
  });
};

Kippt.prototype.delete = function( config, cb ) {
  if(!(config.id))
    throw new Error('Midding id parameters in delete');

  var type = config.type || 'clips';
  var id   = config.id;

  request({
      method: 'DELETE'
    , uri: this._prefix + '/' + type + '/' + id + '/'
    , headers: this._auth
  }, function( err, res, body ) {
    ( err )
      ? cb( err, null )
      : cb( null, JSON.parse( body ) );
  });
};

Kippt.prototype.search = function( pattern, cb ) {
  request({
      method: 'GET'
    , uri: this._prefix + '/search/clips/?q=' + pattern
    , headers: this._auth
  }, function( err, res, body ) {
    ( err )
      ? cb( err, null )
      : cb( null, JSON.parse( body ).objects  );
  });
};

Kippt.prototype.starred = function( cb ) {
  var result = [];

  request({
      method: 'GET'
    , uri: this._prefix + '/clips/'
    , headers: this._auth
  }, function( err, res, body ) {
    Object( JSON.parse( body ).objects ).forEach( function( index ) {
      if( index.is_starred )
        result.push({ 
          title: index.title, 
          id: index.id, 
          url: index.url 
        });
    });

    ( err )
      ? cb( err, null )
      : cb( null, result );
  });
};

Kippt.prototype.clips = function() {
    var len = arguments.length;

    switch( len ) {
      case 1:
        var cb = arguments[0];

        request({
            method: 'GET'
          , uri: this._prefix + '/clips/'
          , headers: this._auth
        }, function( err, res, body ) {
          ( err )
            ? cb( err, null )
            : cb( null, JSON.parse( body ).objects );
        });
        break;
      case 2:
        if( typeof arguments[0] === 'string' ) {
          var lid = arguments[0];
          var cb  = arguments[1];

          request({
              method: 'GET'
            , uri: this._prefix + '/clips/' + lid + '/'
            , headers : this._auth
          }, function( err, res, body ) {
            ( err )
              ? cb( err, null )
              : cb( null, JSON.parse( body ) );
          });
        } else {
          var opt = arguments[0];
          var cb  = arguments[1];

          request({
              method: 'GET'
            , uri: this._prefix + '/clips/?' + this._serialize( opt )
            , headers: this._auth
          }, function( err, res, body ) {
            ( err )
              ? cb( err, null )
              : cb( null, JSON.parse( body ).objects );
          });     
        }
        break;
      default:
        throw new Error('Wrong numbers of arguments passed');
        break;
    }
};

Kippt.prototype.lists = function() {
  var len = arguments.length;

  switch( len ) {
    case 1:
      var cb = arguments[0];

      request({
          method: 'GET'
        , uri: this._prefix + '/lists/'
        , headers: this._auth
      }, function( err, res, body ) {
        ( err )
          ? cb( err, null )
          : cb( null, JSON.parse( body ).objects );
      });

      break;
    case 2:
      if( typeof arguments[0] === 'string' ) {
        var lid = arguments[0];
        var cb  = arguments[1];

        request({
            method: 'GET'
          , uri: this._prefix + '/lists/' + lid + '/'
          , headers: this._auth
        }, function( err, res, body ) {
          ( err )
            ? cb( err, null )
            : cb( null, JSON.parse( body ) );
        });
      } else {
        var opt = arguments[0];
        var cb  = arguments[1];

        request({
            method: 'GET'
          , uri: this._prefix + '/lists/?' + this._serialize( opt )
          , headers : this._auth
        }, function( err, res, body ) {
          ( err )
            ? cb( err, null )
            : cb( null, JSON.parse( body ).objects );
        });   
      }
      break;
    default:
      throw new Error('Wrong numbers of arguments passed');
      break;
  }
};

module.exports = Kippt;