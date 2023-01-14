const db = require("../models");
const component = db.component;

const dateAll = async (req, res) => {
  const data = await component.findAll();
  return res.status(200).send({ data });
};
const readAll = async (req, res) => {
  const { id } = req.params;

  const data = await component.findAll({ whre: { category_id: id } });
  return res.status(200).send({ data });
};
const read = async (req, res) => {
  const { id } = req.params;

  const data = await component.findAll({ where: { category_id: id } });
  return res.status(200).send({ data });
};
const remove = async (req, res) => {
  const { id } = req.params;
  await component.destroy({ where: { id } });
  return res.status(200).send({ message: "Componente eliminado" });
};
const create = async (req, res) => {
  await component.create({
    title: req.body.title,
    specifications: req.body.specifications,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
  });
  return res.status(200).send({ message: "Componente creado" });
};
const update = async (req, res) => {
  const { id } = req.params;
  const _component = await component.findByPk(id);
  _component.update(req.body);
  return res.status(200).send({ message: "Componente actualizado" });
};
module.exports = { read, remove, create, update, readAll,dateAll };
