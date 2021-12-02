import axios from 'axios'

const login = {
    namespaced: true,
    state: {
        login: [],
        registration: [],
        
    },
      
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

    },
    actions: {
       async postLogin ({commit}, payload){
        // var email = document.getElementById("email").value;
        // var password = document.getElementById("password").value;
        // alert(email + password)
        console.log(payload)
            await axios

                .post('http://localhost:3000/api/v1/auth/login', 
                //body axios

                   {
                    "email": payload.email,
                    "password": payload.password
                  },
                   //header axios
//     {'Authorization': 'Bearer'+' '+ localStorage.getItem('token'), 
//     'Content-Type': 'application/json'
//   },
                
                  )//fin post HTTP
                
                .then(response => {
                    // console.log(response.data.comment)
                    commit('POST_LOGIN', response.data),
                    localStorage.setItem('uuid', response.data.uuid)
                    localStorage.setItem('token', response.data.token)
                    // localStorage.setItem('role', response.data.role)
                    window.location.href ="/wall" // redirect vers wall si rep backend ok + localstorage uuid + token
                    
                })
                .catch(error => {console.log(error)})
        },

        async logout () {
            localStorage.removeItem('uuid');
            localStorage.removeItem('token');
            // localStorage.removeItem('role');
            window.location.href ="/"
          },

        async register({commit},payload){
            await axios
            .post('http://localhost:3000/api/v1/auth/signup',
            {
                "email": payload.email,
                "password": payload.password
              },)
              .then(
                response => {
                    // console.log(response.data.comment)
                    commit('POST_REGISTRATION', response.data),
                    localStorage.setItem('uuid', response.data.uuid)
                    alert('Vous êtes maintenant inscrit sur Groupomania, vous pouvez vous y connecter')// alert informant le user qu'il est inscrit et peut se logguer
                })
            .catch(error => {console.log(error)})

        }


    },

}

export default login