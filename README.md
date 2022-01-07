# P7_MENDO_GONCALVES_Bruno

GROUPOMANIA

COMMANDS to launch the application:
- launch frontend: 
    cd groupomania
    npm run serve

- launch backend:
    cd backend
    nodemon serve

To install the backend:
- Install NPM
cd backend
npm install

- initialize project :
cd backend
npm init (entry point server.js)

- BACKEND DEPENDENCIES:
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

- FRONTEND DEPENDENCIES:
into groupomania folder install:

    - vue-cli: npm install -g @vue/cli
    - axios: npm install --save axios vue-axios
    - moment: npm install --save vue-moment
    - vue router: npm install --save vue-router
    - vuetify: npm install --save vuetify
    - vuex: npm install --save vuex


During dev backend management:
    create models :
    example table comments likes in our project :
    sequelize model:generate --name Comment_likes_dislikes --attributes comment_id:integer,user_id:integer,likes:integer,dislikes:integer
    amend migrations sheet and models as per examples.

    managing seeders: 
        - add all seeders into db : sequelize-cli db:seed:all
        + create folders manually into uploads folder for each user :
            UUID's are in seeders files
            backend/uploads/UUID/avatar
            backend/uploads/UUID/images
            backend/uploads/UUID/images/comments
            backend/uploads/UUID/images/posts
            backend/uploads/UUID/videos
            backend/uploads/UUID/videos/comments
            backend/uploads/UUID/videos/posts

            ps: on registration from the front these folders are created automatically

        - remove all seeders from DB : sequelize-cli db:seed:undo:all

    managing db:
        the username et password for mysql is in backend/config/config.json:
            development
            
        relaunch migrations db : sequelize-cli db:migrate:undo:all
        remove all tables from db : sequelize-cli db:migrate:undo:all
    to create associations in db through sequelize go to server.js, comment lines 64 to 68 and uncomment from line 57 to 61

    then go to terminal and type: node app, hit enter
    
    once done and associations done in phpmyadmin, then comment again lines 57 to 61 and uncomment 64 to 68

    check migrations status : sequelize-cli db:migrate:status

    
