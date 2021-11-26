import axios from 'axios'

const getAllPosts = {
    namespaced: true,
    state: {
        allPosts: [],
        
    },
    mutations: {
        GET_POSTS(state, data) {
            console.log(data)
            state.allPosts = data
        },



    },
    actions: {
       async getAllPostsAct ({commit}){
        
            await axios
                .get('http://localhost:3000/api/v1/')
                
                .then(response => {
                    // console.log(response.data.comment)
                    commit('GET_POSTS', response.data)
                    
                })
                .catch(error => {console.log(error)})
        },

        // async getComment ({commit}){
        //     await axios
        //     .get(state.allPosts)
        //     .then(response => {
        //         console.log(response.data)
        //     })
        // }
    },

}

export default getAllPosts