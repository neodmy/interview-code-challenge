/* eslint-disable no-underscore-dangle */
module.exports = (phonesStore) => {
  /**
   * Finds all documents in the collection
   * @returns an array of objects or an empty array
   */
  const findAll = async () => {
    const result = await phonesStore.findAll();
    return result;
  };

  /**
   * Finds one document by the given id
   * @param {number} id - The id to match
   * @returns The object found or null
   */
  const findOneById = async (id) => {
    const result = await phonesStore.findOneById(id);
    return result;
  };

  /**
   * Inserts the given object
   * @param {Object} inputData - The object to insert
   * @returns The object inserted
   */
  const insertOne = async (inputData) => {
    const { ops } = await phonesStore.insertOne(inputData);
    return ops[0];
  };

  /**
   * Updates previous values with the new ones from the given object
   * @param {number} id - The object id
   * @param {Object} inputData - The updated object
   * @returns The updated object or null
   */
  const updateOneById = async (id, inputData) => {
    const data = { ...inputData };
    if (data._id) delete data._id;
    const { value } = await phonesStore.updateOneById(id, data);
    return value;
  };

  /**
   * Removes every object
   * @returns The number documents removed
   */
  const deleteAll = async () => {
    const { result } = await phonesStore.deleteAll();
    return result.n;
  };

  /**
   * Removes one document matching given id
   * @param {number} id - The id of the document to be removed
   * @returns The number of documents removed
   */
  const deleteOneById = async (id) => {
    const { result } = await phonesStore.deleteOneById(id);
    return result.n;
  };

  return {
    findAll,
    findOneById,
    insertOne,
    updateOneById,
    deleteOneById,
    deleteAll,
  };
};
