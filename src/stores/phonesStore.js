/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
const { ObjectId } = require('mongodb');

const phonesDbConfig = {
  db: 'phones_database',
  col: 'phones_collection',
};

module.exports = (connectMongo) => {
  const querys = (query) => async (id = 0, inputData = {}) => {
    const { client, collection } = await connectMongo(phonesDbConfig);
    const options = {
      findAll: () => collection.find().toArray(),
      findOneById: () => collection.findOne({ _id: new ObjectId(id) }),
      insertOne: () => {
        const data = {
          ...inputData,
          _id: new ObjectId(),
        };
        return collection.insertOne(data);
      },
      insertMany: () => collection.insertMany(inputData),
      updateOneById: () => collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: inputData }, { returnOriginal: false }),
      deleteOneById: () => collection.deleteOne({ _id: new ObjectId(id) }),
      deleteAll: () => collection.deleteMany({}),
    };
    const result = await options[query]();
    client.close();
    return result;
  };

  return {
    findAll: () => querys('findAll')(),
    findOneById: (id) => querys('findOneById')(id),
    insertOne: (inputData) => querys('insertOne')(null, inputData),
    insertMany: (inputData) => querys('insertMany')(null, inputData),
    updateOneById: (id, inputData) => querys('updateOneById')(id, inputData),
    deleteOneById: (id) => querys('deleteOneById')(id),
    deleteAll: () => querys('deleteAll')(),
  };
};
