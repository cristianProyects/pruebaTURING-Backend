const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const JWT_SECRETO = process.env.JWT_KEY_USERS;
const db = require("./models");
const user = db.user;

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRETO,
    },
    async (payload, done) => {
      try {
        const _user = await user.findByPk(payload.user_id);
        if (!_user || !_user.activo) {
          return done(null, false); //en caso de que el user no exista o este inactivo dispara el acceso denegado
        }

        done(null, _user); //permite el acceso y da permiso a las rutas designadas
      } catch (error) {
        done(error, false); // en caso de no encontrar el encabezado arroja un error y deniega el acceso
      }
    }
  )
);
