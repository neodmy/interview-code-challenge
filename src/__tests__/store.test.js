/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
const assert = require('assert');

const { phonesStore } = require('../stores')();
const phones = require('./examples');

describe('PhonesStore tests', () => {
  describe('Happy paths', () => {
    afterEach(async () => {
      await phonesStore.deleteAll();
    });
    it('should insert one', async () => {
      const { result } = await phonesStore.insertOne(phones[0]);
      assert.equal(result.n, 1);
    });

    it('should delete all (there were 2)', async () => {
      await phonesStore.insertOne(phones[0]);
      await phonesStore.insertOne(phones[1]);
      const { result } = await phonesStore.deleteAll();
      assert.equal(result.n, 2);
    });

    it('should get all (there were 2)', async () => {
      await phonesStore.insertOne(phones[0]);
      await phonesStore.insertOne(phones[1]);
      const result = await phonesStore.findAll();
      assert.equal(result.length, 2);
    });

    it('should get one by id', async () => {
      const { ops } = await phonesStore.insertOne(phones[0]);
      const result = await phonesStore.findOneById(ops[0]._id);
      assert.notStrictEqual(result, {});
    });

    it('should delete one by id', async () => {
      const { ops } = await phonesStore.insertOne(phones[0]);
      const { result } = await phonesStore.deleteOneById(ops[0]._id);
      assert.equal(result.n, 1);
    });

    it('should update name', async () => {
      const { ops } = await phonesStore.insertOne(phones[0]);
      const newPhone = ops[0];
      newPhone.name = 'iPhone XS';
      const { value } = await phonesStore.updateOneById(newPhone._id, newPhone);
      assert.equal(value.name, newPhone.name);
    });
  });

  describe('Unhappy paths', () => {
    it('should get no results (db empty)', async () => {
      const result = await phonesStore.findAll();
      assert.equal(result.length, 0);
    });
    it('should delete none (db empty)', async () => {
      const { result } = await phonesStore.deleteAll();
      assert.equal(result.n, 0);
    });
    it('should not get one (bad id)', async () => {
      const { ops } = await phonesStore.insertOne(phones[0]);
      await phonesStore.deleteAll();
      const result = await phonesStore.findOneById(ops[0]._id);
      assert.equal(result, null);
    });
    it('should not update (bad id)', async () => {
      const { ops } = await phonesStore.insertOne(phones[0]);
      await phonesStore.deleteAll();
      const { value } = await phonesStore.updateOneById(ops[0]._id, ops[0]);
      assert.equal(value, null);
    });
    it('should not delete (bad id)', async () => {
      const { ops } = await phonesStore.insertOne(phones[0]);
      await phonesStore.deleteAll();
      const { result } = await phonesStore.deleteOneById(ops[0]._id);
      assert.equal(result.n, 0);
    });
  });
});
