import axios from 'axios'

const likesDislikes = {
    namespaced: true,
    state: {
        postLikesDislikes: [],
        commentLikesDislikes: [],
    },//FIN states
    mutations: {
        GET_POST_LIKESDISLIKES(state, data){
            state.postLikesDislikes = data
        },
        CREATE_POST_LIKESDISLIKES(state, data){
            state.postLikesDislikes = [data, ...state.postLikesDislikes]
        },
        GET_COMMENT_LIKESDISLIKES(state, data){
            state.commentLikesDislikes = data
        },
        CREATE_COMMENT_LIKESDISLIKES(state, data){
            state.commentLikesDislikes = [data, ...state.postLikesDislikes]
        },
    },//FIN mutations

    actions: {
        async getAllPostLikesDislikes ({commit}){
            await axios.get('http://localhost:3000/api/v1/get/post/likesdislikes',
                //headers axios avec token auth 
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                    'Content-Type': 'application/json'
                    }
                }//FIN - headers
            )//FIN axios get
                .then(response => {
                    commit('GET_POST_LIKESDISLIKES', response.data) 
                })//FIN THEN
                .catch(error => {console.log(error)})
        },//FIN - ACTIONS - getAllPostLikesDislikes

        async postLikesDislikes ({commit},payload){
            let postId= payload.postId
            // console.log("je like ou pas? "+ payload.likes)
            await axios.post('http://localhost:3000/api/v1/post/'+postId+'/like',
                //body axios
                {
                "likes": payload.likes,
                "uuid": localStorage.getItem('uuid')
                },//FIN body axios
                //header axios
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                   'Content-Type': 'application/json'
                    }
                }//FIN headers
            )//FIN axios post
                .then(response => {
                    commit('CREATE_POST_LIKESDISLIKES', response.data) 
                })//FIN THEN
                .catch(error => {console.log(error)})
        },//FIN - ACTIONS - postLikesDislikes

        async getAllCommentLikesDislikes ({commit}){
            await axios.get('http://localhost:3000/api/v1/get/comment/likesdislikes',
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                    'Content-Type': 'application/json'
                    }
                }//FIN headers axios
            )//FIN axios get
                .then(response => {
                    commit('GET_COMMENT_LIKESDISLIKES', response.data)  
                })//FIN THEN
                .catch(error => {console.log(error)})
        },//FIN - ACTIONS - getAllCommentLikesDislikes
                
        async commentLikesDislikes ({commit},payload){
            let commentId= payload.commentId
            // console.log("je like le commentaire ou pas? "+ payload.likes)
            await axios.post('http://localhost:3000/api/v1/comment/'+commentId+'/like',
                //body axios
                {
                "likes": payload.likes,
                "uuid": localStorage.getItem('uuid'),
                "post_id": payload.postid
                },//FIN body axios
                //header axios
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                    'Content-Type': 'application/json'
                    }
                }//FIN headers      
            )//FIN axios post
                .then(response => {
                    commit('CREATE_COMMENT_LIKESDISLIKES', response.data)
                })//FIN THEN
                .catch(error => {console.log(error)})
        },//FIN - ACTIONS - commentLikesDislikes

    }//FIN ACTIONS
}//FIN CONSTANTE likesDislikes

export default likesDislikes