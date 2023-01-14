const db = require("../models");
const shop = db.shop;
const user = db.user;

const read = async (req, res) => {
  const { id } = req.params; //ID_USER
  const data = await user.findAll({
    where: { id },
    include: [
      {
        model: shop,
      },
    ],
  });

  return res.status(200).send({ data });
};
const remove = async (req, res) => {
  const { id } = req.params;
  await shop.destroy({ where: { id } });
  return res.status(200).send({ message: "Producto eliminado" });
};
const create = async (req, res) => {
  await shop.create({
    user_id: req.body.user_id,
    component_id: req.body.component_id,
  });
  return res.status(200).send({ message: "Producto creado" });
};
// const update = async (req, res) => {
//   const { id } = req.params;
//   const _shop = await shop.findByPk(id);
//   _shop.update(req.body);
//   return res.status(200).send({ message: "Producto actualizado" });
// };
module.exports = { read, remove, create };
