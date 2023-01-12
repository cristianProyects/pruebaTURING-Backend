const db = require("../models");
const user = db.user;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const read = async (req, res) => {
  const { id } = req.params;
  const data = await user.findByPk(id);
  return res.status(200).send({ data });
};
const remove = async (req, res) => {
  const { id } = req.params;
  await user.destroy({ where: { id } });
  return res.status(200).send({ message: "Usuario eliminado" });
};
const create = async (req, res) => {
  const rounds = 10;
  const validateEmail = await user.findOne({
    where: { email: req.body.email },
  });
  if (validateEmail != null) {
    return res.status(200).send({ message: "Error" });
  }
  await bcrypt.genSalt(rounds, async (err, salt) => {
    await bcrypt.hash(req.body.password, salt, async (err, hash) => {
      let validateTypeUser =
        req.body.email == "adminPV@gmail.com" ? "admin" : "user";
      const newUser = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        active: 1,
        typeUser: validateTypeUser,
      });
      const token = jwt.sign(
        {
          user_id: newUser.id,
        },
        process.env.JWT_KEY_TOKEN
      ); //creacion del token acorde al id del usuario
      newUser.token = token; //asignamos el token
      newUser.save(); //guardado de la modificacion del usuario
    });
  });
  return res.status(201).send({ message: "Cuenta creada exitosamente" });
};
const update = async (req, res) => {
  const { id } = req.params;
  const _user = await user.findByPk(id);
  _user.update(req.body);
  return res.status(200).send({ message: "Usuario actualizado" });
};
module.exports = { read, remove, create, update };
