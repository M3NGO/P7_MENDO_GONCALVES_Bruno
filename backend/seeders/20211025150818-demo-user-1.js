let bcrypt = require('bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let hash =  await bcrypt.hash('ziozn', 14 )
    return queryInterface.bulkInsert('user', [{
      uuid: '2e919fee-f4b4-458c-6da9-042d8eb020c',
      firstName: 'Niko',
      lastName: 'Loko',
      email: 'Niko@example.com',
      password: hash,
      role:1,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  }
};