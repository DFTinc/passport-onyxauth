# Passport-OnyxAuth

[Passport](http://passportjs.org/) strategies for authenticating with [ONYX Auth](http://www.onyxauth.com/)
using OAuth 2.0.

This module lets you authenticate using ONYX Auth in your Node.js applications.
By plugging into Passport, ONYX Auth authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-onyxauth

## Usage of OAuth 2.0

#### Configure Strategy

The ONYX Auth OAuth 2.0 authentication strategy authenticates users using an ONYX Auth
account and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which
accepts these credentials and calls `done` providing a user, as well as
`options` specifying a client ID, client secret, and callback URL.

    passport.use(new GoogleStrategy({
        clientID: ONYXAUTH_CLIENT_ID,
        clientSecret: ONYXAUTH_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/onyxauth/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ onyxAuthId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'onyxauth'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/oauth2/onyxauth',
      passport.authenticate('onyxauth'));

    app.get('/oauth2/onyxauth/callback',
      passport.authenticate('onyxauth', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Examples

For a complete, working example, refer to the [OAuth 1.0 example](https://github.com/jaredhanson/passport-google-oauth/tree/master/examples/oauth)
and the [OAuth 2.0 example](https://github.com/jaredhanson/passport-google-oauth/tree/master/examples/oauth2).

## Credits

  - [Diamond Fortress Technologies, Inc.](https://github.com/DFTinc/passport-onyxauth)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2015 <a href="http://www.diamondfortress.com">Diamond Fortress Technologies, Inc.</a>
