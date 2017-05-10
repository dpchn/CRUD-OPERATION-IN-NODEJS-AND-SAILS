module.exports = {
  checkvalid: function(storeId) {
    // here you call your models, add object security validation, etc...
    return Store.findOne(storeId);
  }
};