/**
 * Module dependencies.
 */
var util = require('util')
  , OAuth2Strategy = require('passport-oauth').OAuth2Strategy
  , InternalOAuthError = require('passport-oauth').InternalOAuthError;


/**
 * `Strategy` constructor.
 *
 * The ONYX Auth authentication strategy authenticates requests by delegating to
 * ONYX Auth using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your ONYX Auth application's client id
 *   - `clientSecret`  your ONYX Auth application's client secret
 *   - `callbackURL`   URL to which ONYX Auth will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new OnyxAuthStrategy({
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/onyxauth/callback'
 *       },
 *       function(accessToken, refreshToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://onyxauth.com/oauth2/authorize';
  options.tokenURL = options.tokenURL || 'https://onyxauth.com/oauth2/token';
  
  OAuth2Strategy.call(this, options, verify);
  this.name = 'onyxauth';
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);


/**
 * Retrieve user profile from ONYX Auth.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `OnyxAuth`
 *   - `id`
 *   - `username`
 *   - `displayName`
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(accessToken, done) {
  this._oauth2.get('https://onyxauth.com/oauth2/users/profile', accessToken, function (err, body, res) {
    if (err) { return done(new InternalOAuthError('failed to fetch user profile', err)); }
    
    try {
      var json = JSON.parse(body);
      
      var profile = { provider: 'OnyxAuth' };
      profile.id = json.profile.id;
      profile.displayName = json.profile.displayName;
      profile.name = { familyName: json.profile.familyName,
                       givenName: json.profile.givenName };
      profile.emails = [{ value: json.profile.email }];
      
      profile._raw = body;
      profile._json = json;
      
      done(null, profile);
    } catch(e) {
      done(e);
    }
  });
}

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
