export {};
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const fs = require("fs");
const path = require("path");
const User = require("mongoose").model("User");
const AnonymousStrategy = require('passport-anonymous').Strategy;

const pathToKey = path.join(__dirname, "..", "..", "keys", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

module.exports = async (passport) => {
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      await User.findOne({ _id: jwt_payload.sub }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          if (user.status === "verified" || user.status === "pending") {
            return done(null, user);
          } else {
            return done(null, false, {
              message: "Your account is inactive now, Please contact admin",
            });
          }
        } else {
          return done(null, false);
        }
      });
    })
  );

  passport.use(new AnonymousStrategy());

};
