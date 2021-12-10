import axios from 'axios'

const likesDislikes = {
    namespaced: true,
    state: {
        postLikesDislikes: [],
        commentLikesDislikes: [],
        
    },
    mutations: {
        CREATE_POST_LIKESDISLIKES(state, data){
            state.postLikesDislikes = data
        },
        CREATE_COMMENT_LIKESDISLIKES(state, data){
            state.commentLikesDislikes = data
        },



    },
    actions: {

        async postLikesDislikes ({commit},payload){
            let postId= payload.postId
                console.log("je like ou pas? "+ payload.likes)
            await axios
    
                .post('http://localhost:3000/api/v1/post/'+postId+'/like',
                //body axios
                {
                    "likes": payload.likes,
                    "uuid": localStorage.getItem('uuid')
                },
                   //header axios
                {'Authorization': 'Bearer'+' '+ localStorage.getItem('token'), 
                'Content-Type': 'application/json'
                },
                
                  )//fin post HTTP
                  
        
                  .then(response => {
                      // console.log(response.data.comment)
                      commit('CREATE_POST_LIKESDISLIKES', response.data)
                      
                      
                  })
        
                .catch(error => {console.log(error)})
                },
                
                async commentLikesDislikes ({commit},payload){
                    let commentId= payload.commentId
                        console.log("je like le commentaire ou pas? "+ payload.likes)
                    await axios
            
                        .post('http://localhost:3000/api/v1/comment/'+commentId+'/like',
                        //body axios
                        {
                            "likes": payload.likes,
                            "uuid": localStorage.getItem('uuid')
                        },
                           //header axios
                        {'Authorization': 'Bearer'+' '+ localStorage.getItem('token'), 
                        'Content-Type': 'application/json'
                        },
                        
                          )//fin post HTTP
                          
                
                          .then(response => {
                              // console.log(response.data.comment)
                              commit('CREATE_COMMENT_LIKESDISLIKES', response.data)
                              
                              
                          })
                
                        .catch(error => {console.log(error)})
                        },
    

    }//FIN ACTIONS
}

export default likesDislikes