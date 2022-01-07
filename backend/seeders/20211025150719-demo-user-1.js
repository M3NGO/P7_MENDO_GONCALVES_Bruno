let bcrypt = require('bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let hash =  await bcrypt.hash('12345678', 14 )
    return queryInterface.bulkInsert('user', [{
      uuid: '2p919fee-f4b4-458c-8da9-042d8eb020c',
      firstName: '',
      lastName: '',
      email: 'rh@groupomania.com',
      password: hash,
      role:2,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  }
};