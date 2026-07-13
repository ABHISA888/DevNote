const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

const clientID = process.env.GOOGLE_CLIENT_ID || 'dummy_google_client_id';
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || 'dummy_google_client_secret';

if (clientID === 'dummy_google_client_id') {
  console.warn('⚠️ WARNING: Google Client ID is not configured. Google Login will fail at runtime.');
}

passport.use(
  new GoogleStrategy(
    {
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: '/api/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        const avatar = profile.photos && profile.photos[0] ? profile.photos[0].value : null;

        if (!email) {
          return done(new Error('No email address returned from Google profile'), null);
        }

        // Check if user already exists
        let user = await User.findOne({ email });

        if (user) {
          // If user exists with email but has no googleId, link Google profile
          if (!user.googleId) {
            user.googleId = profile.id;
            user.provider = 'google';
            if (avatar && !user.avatar) {
              user.avatar = avatar;
            }
            await user.save();
          }
          return done(null, user);
        }

        // Otherwise create new user
        user = await User.create({
          name: profile.displayName || profile.username || 'Google User',
          email: email,
          googleId: profile.id,
          avatar: avatar,
          provider: 'google',
        });
        console.log('✅ User Created');
        user.isNewRegistration = true;

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
