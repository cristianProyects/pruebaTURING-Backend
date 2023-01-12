const db = require("../models");
const user = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = (req, res) => {
  user
    .findOne({
      where: { email: req.body.email, activo: true },
    })
    .then((data) => {
      if (!data) {
        return res.status(401).send({ message: "Acceso denegado" });
      }
      bcrypt.compare(req.body.password, data.password).then((result) => {
        if (!result) {
          return res.status(401).send({ message: "Acceso denegado" });
        }
        const token = jwt.sign(
          {
            user_id: data.id,
          },
          process.env.JWT_KEY_USERS
        );
        return res.status(200).send({
          message: "Iniciando sesión",
          data: { user: data.id, token: token },
        });
      });
    });
};
module.exports = login;
