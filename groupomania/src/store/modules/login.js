import axios from 'axios'

const login = {
    namespaced: true,
    state: {
        login: [],
        
    },
    mutations: {
        POST_LOGIN(state, data) {
            console.log(state)
            console.log(data)
            state.login = data
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
                    
                })
                .catch(error => {console.log(error)})
        },


    },

}

export default login