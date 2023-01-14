const db = require("../models");
const category = db.category;
const component = db.component;
const readAllDataForCategory = async (req, res) => {
  const { id } = req.params;
  const data = await category.findOne({
    include: [
      {
        model: component,
        where: { category_id: id },
      },
    ],
  });
  return res.status(200).send({ data });
};
const readAll = async (req, res) => {
  const data = await category.findAll();
  return res.status(200).send({ data });
};
const read = async (req, res) => {
  const { id } = req.params;
  const data = await category.findByPk(id);
  return res.status(200).send({ data });
};
const remove = async (req, res) => {
  const { id } = req.params;
  await category.destroy({ where: { id } });
  return res.status(200).send({ message: "Categoria elimianda" });
};
const create = async (req, res) => {
  await category.create({
    category: req.body.category,
  });
  return res.status(200).send({ message: "Categoria creada" });
};
const update = async (req, res) => {
  const { id } = req.params;
  const _category = await category.findByPk(id);
  _category.update(req.body);
  return res.status(200).send({ message: "Categoria actualizada" });
};
module.exports = {
  read,
  remove,
  create,
  update,
  readAllDataForCategory,
  readAll,
};
