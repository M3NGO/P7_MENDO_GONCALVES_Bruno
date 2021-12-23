import axios from 'axios'

const moderationFunction = {
    namespaced: true,
    state: {
        moderation: [],
        allPostsModeration: [],
        allCommentsModeration: [],
        allUsersModeration: [],
    },
    mutations: {
        DELETE_USER(state, data) {
            // console.log(data)
            state.moderation = data
        },
        BLOCK_USER(state, data){
            // console.log(data)
            state.moderation = data
        },
        MODERATE_USERS(state, data){
            // console.log(data)
            state.allUsersModeration = data
        },
        MODERATE_POST(state, data){
            state.allPostsModeration = data
        },
        MODERATE_COMMENT(state, data){
            state.allCommentsModeration = data
        },

    },
    actions: {
       async deleteUser ({commit},payload){
        let uuid= payload.user
            
        await axios

            .delete('http://localhost:3000/api/v1/moderation/edit/user/delete/'+uuid, 
            //body axios

               //header axios
               {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
               'Content-Type': 'application/json'
             //   'Content-Type': 'multipart/form-data'
                   }
               }
            
              )//fin post HTTP
              
    
              .then(response => {
                  // console.log(response.data.comment)
                  commit('DELETE_USER', response.data)
                  alert("L'utilisateur "+uuid+" ainsi que tous ses posts/commentaires et contenu multimedia a été éffacé définitivement de Groupomania")
                  
              })
    
            .catch(error => {console.log(error)})
            },

        async blockUser ({commit},payload){
            await axios
        
                .put('http://localhost:3000/api/v1/moderation/edit/user',
                //body axios
                {
                    "moderator": payload.moderator,
                    "uuid": payload.uuid,
                    "active": "false"

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
                        commit('BLOCK_USER', response.data)
                        alert("L'utilisateur "+payload.email+" est mantenant bloqué, vous pouvez le débloquer dans votre section Modération / UTILISATEURS")
                          
                    })
            
                .catch(error => {console.log(error)})
        },

        async unblockUser ({commit},payload){
            await axios
                
                .put('http://localhost:3000/api/v1/moderation/edit/user',
                //body axios
                    {
                        "moderator": payload.moderator,
                        "uuid": payload.uuid,
                        "active": "true"
        
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
                        commit('BLOCK_USER', response.data)
                        alert("L'utilisateur "+payload.email+" n'est plus bloqué, il peut désormais accéder de nouveau a Groupomania")
                                  
                    })
                    
                    .catch(error => {console.log(error)})
        },

        async getModeratedUsers ({commit}){
            await axios
                        
                .get('http://localhost:3000/api/v1/moderation/get/users',
                //body axios

                //header axios
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                'Content-Type': 'application/json'
              //   'Content-Type': 'multipart/form-data'
                    }
                }
                                    
                )//fin post HTTP
                                      
                            
                .then(response => {
                // console.log(response.data.comment)
                    commit('MODERATE_USERS', response.data)
                                          
                })
                            
                .catch(error => {console.log(error)})
        },


        async moderationPost ({commit},payload){
            await axios
                        
                .put('http://localhost:3000/api/v1/moderation/edit/post',
                //body axios
                {
                    "uuid": payload.uuid,
                    "post_id":payload.post_id,
                    "active": "false"
                
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
                    commit('MODERATE_POST', response.data)
                
                                          
                })
                            
                .catch(error => {console.log(error)})
        },

        async unModeratePost ({commit},payload){
            await axios
                        
                .put('http://localhost:3000/api/v1/moderation/edit/post',
                //body axios
                {
                    "uuid": payload.uuid,
                    "post_id":payload.post_id,
                    "active": true
                
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
                    commit('MODERATE_POST', response.data)
                                          
                })
                            
                .catch(error => {console.log(error)})
        },

        async getModeratedPosts ({commit}){
            await axios
                        
                .get('http://localhost:3000/api/v1/moderation/get/posts',
                //body axios

                //header axios
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                'Content-Type': 'application/json'
              //   'Content-Type': 'multipart/form-data'
                    }
                }
                                    
                )//fin post HTTP
                                      
                            
                .then(response => {
                // console.log(response.data.comment)
                    commit('MODERATE_POST', response.data)
                                          
                })
                            
                .catch(error => {console.log(error)})
        },

        async moderationComment ({commit},payload){
            await axios
                .put('http://localhost:3000/api/v1/moderation/edit/comment',
                //body axios
                {
                    "uuid": payload.uuid,
                    "comment_id":payload.comment_id,
                    "active": false
                
                },
                //header axios
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                'Content-Type': 'application/json'
              //   'Content-Type': 'multipart/form-data'
                    }
                }
                                    
                )//fin post HTTP            
                            
                .then(response => {
                console.log(response.data)
                // if(response.data == null) {
                //     alert('Veuillez dabord valider le post')
                // }
                    commit('MODERATE_COMMENT', response.data)
                                          
                })
                            
                .catch(error => {console.log(error)})
        },

        async unModerateComment ({commit},payload){
            await axios
                .put('http://localhost:3000/api/v1/moderation/edit/comment',
                //body axios
                {
                    "uuid": payload.uuid,
                    "comment_id":payload.comment_id,
                    "active": true
                
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
                    commit('MODERATE_COMMENT', response.data)
                                          
                })
                            
                .catch(error => {console.log(error)})
        },

        async getModeratedComments ({commit}){
            await axios
                        
                .get('http://localhost:3000/api/v1/moderation/get/comments',
                //body axios

                //header axios
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                'Content-Type': 'application/json'
              //   'Content-Type': 'multipart/form-data'
                    }
                }
                                    
                )//fin post HTTP                  
                            
                .then(response => {
                // console.log(response.data.comment)
                    commit('MODERATE_COMMENT', response.data)
                                          
                })
                            
                .catch(error => {console.log(error)})
        },


    }//FIN - actions

}

export default moderationFunction