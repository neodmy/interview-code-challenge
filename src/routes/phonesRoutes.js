const { Router } = require('express');

const createError = require('../utils/errors');
const data = require('../../examples');

const router = Router();

module.exports = (phonesController) => {
  router.get('/', (req, res, next) => {
    phonesController.findAll()
      .then((phones) => res.send(phones))
      .catch((error) => next(error));
  });

  router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    phonesController.findOneById(id)
      .then((phone) => (phone !== null
        ? res.send(phone)
        : next(createError('Phone is not available', 404))))
      .catch((error) => {
        next(error);
      });
  });

  router.post('/', (req, res, next) => {
    const phone = req.body;
    phonesController.insertOne(phone)
      .then((newPhone) => {
        res.status(201);
        res.send(newPhone);
      })
      .catch((error) => next(error));
  });

  router.post('/populate', (req, res, next) => {
    phonesController.insertMany(data)
      .then((phones) => res.send(phones))
      .catch((error) => next(error));
  });

  router.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const phone = req.body;
    phonesController.updateOneById(id, phone)
      .then((modifiedPhone) => (modifiedPhone
        ? res.send(modifiedPhone)
        : next(createError('No such phone'), 400)))
      .catch((error) => next(error));
  });

  router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    phonesController.deleteOneById(id)
      .then((modified) => {
        if (modified) {
          res.status(204);
          res.send();
        } else {
          next(createError('No such phone', 400));
        }
      })
      .catch((error) => next(error));
  });

  router.delete('/', (req, res, next) => {
    phonesController.deleteAll()
      .then(() => {
        res.status(204);
        res.send();
      })
      .catch((error) => next(error));
  });

  return router;
};
