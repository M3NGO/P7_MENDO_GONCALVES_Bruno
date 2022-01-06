import axios from 'axios'

const login = {
    namespaced: true,
    state: {
        login: [],
        registration: [],
    },//FIN - state
      
    mutations: {
        POST_LOGIN(state, data) {
            // console.log(state)
            // console.log(data)
            state.login = data
        },
        POST_REGISTRATION(state, data) {
            // console.log(state)
            // console.log(data)
            state.registration = data
        },
    },//FIN - mutations

    actions: {
        async postLogin ({commit}, payload){
            // console.log(payload)
            await axios.post('http://localhost:3000/api/v1/auth/login', 
                    //body axios
                   {
                    "email": payload.email,
                    "password": payload.password
                    },//FIN body axios

                   //header axios
                    {headers:{
                        'Content-Type': 'application/json'
                        }//FIN contenu Headers
                    },// FIN header axios
            )//fin post HTTP
                .then(response => {
                    // console.log(response.data.comment)
                    commit('POST_LOGIN', response.data), // on commit la data de la réponse a la mutation POST_LOGIN
                    localStorage.setItem('uuid', response.data.uuid)
                    localStorage.setItem('token', response.data.token)
                    window.location.href ="/wall" // redirect vers wall si rep backend ok + localstorage uuid + token
                })//FIN THEN
                .catch(error => {console.clear(error)//console clear pour ne pas montrer en log l'adresse du backend
                    alert('Email ou mot de passe non valide, Connexion refusée!!')
                    window.location.reload()//si email ou mot de passe non valide on reload la page
                })//FIN CATCH
        },//FIN - ACTION - POSTLOGIN

        async logout () {
            localStorage.removeItem('uuid');
            localStorage.removeItem('token');
            window.location.href ="/"
        },//FIN - ACTION - LOGOUT

        async register({commit},payload){
            await axios.post('http://localhost:3000/api/v1/auth/signup',
                {
                "email": payload.email,
                "password": payload.password
                },
                //header axios
                {headers:{
                    'Content-Type': 'application/json'
                    }//FIN contenu Headers
                },// FIN header axios
            )//FIN axios post
              .then(response => {
                    commit('POST_REGISTRATION', response.data),
                    alert('Vous êtes maintenant inscrit sur Groupomania, vous pouvez vous y connecter')// alert informant le user qu'il est inscrit et peut se logguer
                })//FIN then
            .catch(error => {console.log(error)})

        }//FIN - ACTION - REGISTER


    },//FIN ACTIONS

}//FIN CONSTANTE LOGIN

export default login