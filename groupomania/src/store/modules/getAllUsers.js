import axios from 'axios'

const getAllUsers = {
    namespaced: true,
    state: {
        allActiveUsers: [],
        allInactiveUsers: [],
        
    },
    mutations: {
        GET_USERS(state, data) {
            // console.log(data)
            state.allActiveUsers = data
        },
        GET_INACTIVE_USERS(state, data) {
            // console.log(data)
            state.allInactiveUsers = data
        },
    },//FIN MUTATIONS
    actions: {
        async getAllUsersAct ({commit}){
            await axios.get('http://localhost:3000/api/v1/allusers',
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                'Content-Type': 'application/json'
                    }
                }//FIN HEADERS
            )//FIN axios get
                .then(response => {
                    // console.log(response.data.comment)
                    commit('GET_USERS', response.data) 
                })//FIN THEN
                .catch(error => {console.log(error)})
        },//FIN - ACTIONS - GETALLUSERSACTifs

        async getAllInactiveUsers ({commit}){
            await axios.get('http://localhost:3000/api/v1/moderation/get/users/deleted',
                //headers avec token pour l'auth
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                'Content-Type': 'application/json'
                    }
                }//FIN HEADERS
            )//FIN axios get
                .then(response => {
                    // console.log(response.data)
                    commit('GET_INACTIVE_USERS', response.data)
                })//FIN THEN
                .catch(error => {console.log(error)})
        },//FIN - ACTIONS - GETALLINACTIVEUSERS
    },//FIN - ACTIONS

}//FIN CONSTANTE getAllUsers

export default getAllUsers