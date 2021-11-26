import axios from 'axios'

const getOnePost = {
    namespaced: true,
    state: {
        Onepost: []
        
    },
    mutations: {
        GET_ONE_POST(state, data) {
            state.Onepost = data
        }
    },
    actions: {
        getOnePost ({commit}){
            axios
                .get('http://localhost:3000/api/v1/post/6')
                .then(response => {
                    commit('GET_ONE_POST', response.data)
                })
                .catch(error => {console.log(error)})
        }
    },

}

export default getOnePost