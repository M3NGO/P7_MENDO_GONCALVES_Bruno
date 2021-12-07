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
    },
    actions: {
       async getAllUsersAct ({commit}){
        
            await axios
                .get('http://localhost:3000/api/v1/allusers')
                
                .then(response => {
                    // console.log(response.data.comment)
                    commit('GET_USERS', response.data)
                    
                })
                .catch(error => {console.log(error)})
        },
        async getAllInactiveUsersAct ({commit}){
        
            await axios
                .get('http://localhost:3000/api/v1/moderation/get/users/deleted')
                
                .then(response => {
                    // if(response.data.email)
                    console.log(response.data)
                    commit('GET_INACTIVE_USERS', response.data)
                    
                })
                .catch(error => {console.log(error)})
        },
    },

}

export default getAllUsers