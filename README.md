# P7_MENDO_GONCALVES_Bruno

GROUPOMANIA

INSTALLATION:

I) BACKEND:

	cd backend
	npm install

BACKEND DEPENDENCIES:
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

BACKEND SQL TABLES AND ASSOCIATIONS CREATION:
    
Into backend folder :

		1)open a terminal and type: nodemon serve (to launch nodemon on backend server)

		2)open another terminal and type : sequelize-cli db:migrate (this will migrate tables to mysql)

		3)to create associations in db through sequelize go to server.js, comment lines 64 to 68 and uncomment from line 57 to 61.

    Once you do this with nodemon activated in another terminal the associations will be created automatically in phpMyAdmin, you can check in phpMyAdmin

    Once associations are created then go back to server.js and comment again lines 57 to 61 and uncomment 64 to 68.

    You should get the following message in nodemon terminal :
        Listening on port 3000
        Executing (default): SELECT 1+1 AS result
        Connexion Mysql authentifiée!!! / serveur prod

If needed to use seeders :
	- to add all seeders into db : 
		cd backend
		sequelize-cli db:seed:all
		
		IF SEEDERS have been integrated then to test frontend you need to create uploads folders manually :

       create folders manually into uploads folder for each user :
            UUID's are in seeders files
			these are the folders to be created if you import seeders in backend:
            
				backend/uploads/UUID/avatar
            		backend/uploads/UUID/images
            		backend/uploads/UUID/images/comments
            		backend/uploads/UUID/images/posts
            		backend/uploads/UUID/videos
            		backend/uploads/UUID/videos/comments
            		backend/uploads/UUID/videos/posts

            ps: on registration from the front these folders are created automatically (no need to create them manually)

	- to remove all seeders from DB : sequelize-cli db:seed:undo:all


 For information:
     Connexion to database: the username, password, and database name for mysql are in backend/config/config.json: development

	Useful sequelize commands to keep in mind:

		1)	to create new sequelize models (new tables): generate --name Comment_likes_dislikes --attributes comment_id:integer,user_id:integer,likes:integer,dislikes:integer
		2)	remove all tables from db : sequelize-cli db:migrate:undo:all
		3)	check migrations status : sequelize-cli db:migrate:status


II) FRONTEND:

	cd groupomania
	npm install

FRONTEND DEPENDENCIES:
into groupomania folder install:

    - vue-cli: npm install -g @vue/cli
    - axios: npm install --save axios vue-axios
    - moment: npm install --save vue-moment
    - vue router: npm install --save vue-router
    - vuetify: npm install --save vuetify
    - vuex: npm install --save vuex



START APPLICATION:

BACKEND:
	cd backend
	nodemon serve

FRONTEND:
	cd groupomania
	npm run serve

ps: if you need to create a moderator from front-end then create the user as any other and then fo to mysql change role number from 1 to 2