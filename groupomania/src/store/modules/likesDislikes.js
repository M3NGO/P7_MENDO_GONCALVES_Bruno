import axios from 'axios'

const likesDislikes = {
    namespaced: true,
    state: {
        postLikesDislikes: [],
        commentLikesDislikes: [],
        
    },
    mutations: {
        GET_POST_LIKESDISLIKES(state, data){
            state.postLikesDislikes = data
        },
        CREATE_POST_LIKESDISLIKES(state, data){
            state.postLikesDislikes = [data, ...state.postLikesDislikes]
        //     const index = state.allPosts.map(post => post.id).indexOf(data.id);
        // state.allPosts.splice(index, 1, data);
        },
        // UPDATE_POST_LIKESDISLIKES(state, data){

        //     const index = state.postLikesDislikes.map(post => post.id).indexOf(data.id);
        //     state.postLikesDislikes.splice(index, 1, data);
        //     },
        GET_COMMENT_LIKESDISLIKES(state, data){
            state.commentLikesDislikes = data
        },
        CREATE_COMMENT_LIKESDISLIKES(state, data){
            state.commentLikesDislikes = [data, ...state.postLikesDislikes]
        },



    },
    actions: {
        async getAllPostLikesDislikes ({commit}){
        
            await axios
                .get('http://localhost:3000/api/v1/get/post/likesdislikes',
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                'Content-Type': 'application/json'
              //   'Content-Type': 'multipart/form-data'
                    }
                }
                )
                
                .then(response => {
                    // console.log(response.data.comment)
                    commit('GET_POST_LIKESDISLIKES', response.data)
                    
                })
                .catch(error => {console.log(error)})
        },//fin getAllPostsAct

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
                   {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                   'Content-Type': 'application/json'
                 //   'Content-Type': 'multipart/form-data'
                       }
                   }
                
                  )//fin post HTTP
                  
        
                  .then(response => {
                      // console.log(response.data.comment)
                      commit('CREATE_POST_LIKESDISLIKES', response.data)
                      
                      
                  })
        
                .catch(error => {console.log(error)})
                },

                async getAllCommentLikesDislikes ({commit}){
        
                    await axios
                        .get('http://localhost:3000/api/v1/get/comment/likesdislikes',
                        {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                        'Content-Type': 'application/json'
                      //   'Content-Type': 'multipart/form-data'
                            }
                        })
                        
                        .then(response => {
                            // console.log(response.data.comment)
                            commit('GET_COMMENT_LIKESDISLIKES', response.data)
                            
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
                            "uuid": localStorage.getItem('uuid'),
                            "post_id": payload.postid

                        },
                           //header axios
                           {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                           'Content-Type': 'application/json'
                         //   'Content-Type': 'multipart/form-data'
                               }
                           }
                        
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