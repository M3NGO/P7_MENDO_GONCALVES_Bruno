# P7_MENDO_GONCALVES_Bruno

GROUPOMANIA

- Install NPM
cd backend
npm install

- initialize project :
cd backend
npm init (entry point server.js)

- install dependancies:
into backend folder install:

    - express: npm install --save express
    - bodyParser : npm install --save body-parser
    - bcrypt : npm install --save bcrypt
    - jsonWebToken : npm install --save jsonwebtoken
    - multer : npm install --save multer
    - file-system : npm install --save file-system
    - mysql2 : npm install --save mysql2
    - sequelize : npm install --save sequelize
    - sequelize-cli : npm install --save sequelize-cli

- launch frontend: 
<!--  to be determined -->

- launch backend:
    cd backend

During dev :

    managing seeders: 
        add all seeders into db : sequelize-cli db:seed:all
        remove all seeders from dvb : sequelize-cli db:seed:undo:all

    managing db:
        relaunch migrations db : sequelize-cli db:migrate:undo:all
        remove all tables from db : sequelize-cli db:migrate:undo:all
    to create associations in db through sequelize go to server.js, comment lines 64 to 68 and uncomment from line 57 to 61

    then go to terminal and type: node app, hit enter
    
    once done and associations done in phpmyadmin, then comment again lines 57 to 61 and uncomment 64 to 68

        check migrations status : sequelize-cli db:migrate:status

    
