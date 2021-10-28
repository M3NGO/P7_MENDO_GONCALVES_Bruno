let express = require('express'); //librairie de Javascript
let app = express();
let bodyParser = require('body-parser') // import de body-parser après l'avoir installé dans package.json on s'en sert ensuite dans app.post
// bodyparser sert rendre le body de la requete exploitable par l'app
let path = require('path');

let loginRoutes = require('./routes/login')
let userRoutes = require('./routes/user')
let allUsersRoutes = require('./routes/allusers')
let postRoutes = require('./routes/post')
let commentRoutes = require('./routes/comment')
let likesDislikesRoutes = require('./routes/likes_dislikes')

//ce Middleware permet a rendre accessible notre middleware à l'application, met des headers aux réponses
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // '*' permet de donner accès a tout le monde à cet API on peut le remplacer par des URL/adressse IP pour restraindre l'accès
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next(); // ne pas oublier de le mettre pour renvoyer vers le middleware suivant
  });

app.use(express.json()) //middleware json pour body express
app.use(bodyParser.json()); //

app.use ('/', loginRoutes);
app.use ('/profil', userRoutes);
app.use ('/allusers', allUsersRoutes);

app.use ('/', postRoutes);

app.use ('/',commentRoutes );
app.use ('/', likesDislikesRoutes);
// app.use ('/comment', commentRoutes);
app.use('./uploads/avatars', express.static(path.join(__dirname,'avatars')));
app.use('./uploads/images', express.static(path.join(__dirname,'images')));
app.use('./uploads/videos', express.static(path.join(__dirname,'videos')));


module.exports = app;