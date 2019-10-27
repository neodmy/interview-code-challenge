/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const assert = require('assert');

const { phonesController } = require('../controllers')();
const phones = require('../../examples');

describe('PhonesController test', () => {
  describe('Happy paths', () => {
    afterEach(async () => {
      await phonesController.deleteAll();
    });
    it('should insert one', async () => {
      const result = await phonesController.insertOne(phones[0]);
      assert.notEqual(result._id, undefined);
    });
    it('should delete all (there were 2)', async () => {
      await phonesController.insertOne(phones[0]);
      await phonesController.insertOne(phones[1]);
      const result = await phonesController.deleteAll();
      assert.equal(result, 2);
    });
    it('should insert 8 at once', async () => {
      const result = await phonesController.insertOne(phones);
      await phonesController.deleteAll();
      assert.notEqual(result.length, phones.length);
    });
    it('should get all (there were 2)', async () => {
      await phonesController.insertOne(phones[0]);
      await phonesController.insertOne(phones[1]);
      const result = await phonesController.findAll();
      assert.equal(result.length, 2);
    });
    it('should get one by id', async () => {
      const inserted = await phonesController.insertOne(phones[0]);
      const result = await phonesController.findOneById(inserted._id);
      assert.deepStrictEqual(result, inserted);
    });
    it('should delete one by id', async () => {
      const inserted = await phonesController.insertOne(phones[0]);
      const result = await phonesController.deleteOneById(inserted._id);
      assert.equal(result, 1);
    });
    it('should update name', async () => {
      const inserted = await phonesController.insertOne(phones[0]);
      inserted.name = 'iPhone XS';
      const result = await phonesController.updateOneById(inserted._id, inserted);
      assert.deepStrictEqual(result, inserted);
    });
  });

  describe('Unhappy paths', () => {
    it('should get no results (db empty)', async () => {
      const result = await phonesController.findAll();
      assert.equal(result.length, 0);
    });
    it('should delete none (db empty)', async () => {
      const result = await phonesController.deleteAll();
      assert.equal(result, 0);
    });
    it('should not get one (bad id)', async () => {
      const inserted = await phonesController.insertOne(phones[0]);
      await phonesController.deleteAll();
      const result = await phonesController.findOneById(inserted._id);
      assert.equal(result, null);
    });
    it('should insert nothing', async () => {
      const result = await phonesController.insertOne([]);
      await phonesController.deleteAll();
      assert.notEqual(result.length, 0);
    });
    it('should not update (bad id)', async () => {
      const inserted = await phonesController.insertOne(phones[0]);
      await phonesController.deleteAll();
      const result = await phonesController.updateOneById(inserted._id, inserted);
      assert.equal(result, null);
    });
    it('should not delete (bad id)', async () => {
      const inserted = await phonesController.insertOne(phones[0]);
      await phonesController.deleteAll();
      const result = await phonesController.deleteOneById(inserted._id);
      assert.equal(result, 0);
    });
  });
});
