import axios from 'axios'

const moderationFunction = {
    namespaced: true,
    state: {
        moderation: [],
        allPostsModeration: [],
        allCommentsModeration: [],
        allUsersModeration: [],
    },//FIN state
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
            function delayPost(){
                const index = state.allPostsModeration.map(post => post.id).indexOf(data.id)
                window.setTimeout(state.allPostsModeration.splice(index, 1, data), 10)
            }return delayPost
        },
        GET_MODERATE_POST(state, data){
            state.allPostsModeration = data
        },
        UNMODERATE_POST(state, data){
            function delayPost(){
                const index = state.allPostsModeration.map(post => post.id).indexOf(data.id)
                window.setTimeout(state.allPostsModeration.splice(index, 1, data), 10)
            }return delayPost
        },
        MODERATE_COMMENT(state, data){
            function delayComment(){
                const index = state.allCommentsModeration.map(comment => comment.id).indexOf(data.id)
                window.setTimeout(state.allCommentsModeration.splice(index, 1, data), 10)
            }return delayComment
        },
        GET_MODERATE_COMMENT(state, data){
            state.allCommentsModeration = data  
        },
        UNMODERATE_COMMENT(state, data){
            function delayComment(){
                const index = state.allCommentsModeration.map(comment => comment.id).indexOf(data.id)
                window.setTimeout(state.allCommentsModeration.splice(index, 1, data), 10)
            }return delayComment
        },
    },//FIN MUTATIONS

    actions: {
        async deleteUser ({commit},payload){
            let uuid= payload.user
            await axios.delete('http://localhost:3000/api/v1/moderation/edit/user/delete/'+uuid, 
                //body axios vide car axios n'accepter pas de body pour delete
                //header axios avec token auth
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                'Content-Type': 'application/json'
                    }
                }//FIN - ACTIONS - deleteUser
            
            )//FIN axios delete
                .then(response => {
                    commit('DELETE_USER', response.data)
                    alert("L'utilisateur "+uuid+" ainsi que tous ses posts/commentaires et contenu multimedia a été éffacé définitivement de Groupomania") 
                })//FIN THEN
                .catch(error => {console.log(error)})
        },//FIN - ACTIONS - deleteUser

        async blockUser ({commit},payload){
            //met le user en moderation donc il n'aura plus accès au site tant qu'il n'est pas unblocked
            await axios.put('http://localhost:3000/api/v1/moderation/edit/user',
                //body axios
                {
                "moderator": payload.moderator,
                "uuid": payload.uuid,
                "active": "false"
                },//FIN body axios
                //header axios
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                    'Content-Type': 'application/json'
                    }
                }//FIN headers
            )//FIN axios put
                .then(response => {
                    commit('BLOCK_USER', response.data)
                    alert("L'utilisateur "+payload.email+" est mantenant bloqué, \n\nVous pouvez le débloquer dans votre section Modération / UTILISATEURS")  
                })//FIN THEN
                .catch(error => {console.log(error)})
        },//FIN - ACTIONS - blockUser

        async unblockUser ({commit},payload){
            //débloque user par un moderateur, le user peut après execution se reconnecter au site
            await axios.put('http://localhost:3000/api/v1/moderation/edit/user',
                //body axios
                {
                "moderator": payload.moderator,
                "uuid": payload.uuid,
                "active": "true"
                },//FIN body axios
                //header axios
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                    'Content-Type': 'application/json'
                    }
                }//FIN headers
            )//FIN axios put
                .then(response => {
                    commit('BLOCK_USER', response.data)
                    alert("L'utilisateur "+payload.email+" n'est plus bloqué, \n\nil peut désormais accéder de nouveau à Groupomania")            
                })//FIN THEN
                .catch(error => {console.log(error)})
        },//FIN - ACTIONS - unblockUser

        async getModeratedUsers ({commit}){
            await axios.get('http://localhost:3000/api/v1/moderation/get/users',
                //header axios avec token
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                    'Content-Type': 'application/json'
                    }
                }//FIN headers                 
            )//FIN axios get           
                .then(response => {
                    commit('MODERATE_USERS', response.data)                      
                })//FIN THEN           
                .catch(error => {console.log(error)})
        },//FIN - ACTIONS - getModeratedUsers

        async moderationPost ({commit},payload){
            await axios.put('http://localhost:3000/api/v1/moderation/edit/post',
                //body axios
                {
                "uuid": payload.uuid,
                "post_id":payload.post_id,
                "active": "false"
                },//FIN body axios
                //header axios
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                    'Content-Type': 'application/json'
                    }
                }//FIN headers                
            )//FIN axios put
                .then(response => {
                    commit('MODERATE_POST', response.data)                        
                })//FIN THEN         
                .catch(error => {console.log(error)})
        },//FIN - ACTIONS - moderationPost

        async unModeratePost ({commit},payload){
            await axios.put('http://localhost:3000/api/v1/moderation/edit/post',
                //body axios
                {
                "uuid": payload.uuid,
                "post_id":payload.post_id,
                "active": true
                },//FIN body axios
                //header axios
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                    'Content-Type': 'application/json'
                    }
                }//FIN headers axios                 
            )//FIN axios put
                .then(response => {
                    commit('UNMODERATE_POST', response.data)                        
                })//FIN THEN       
                .catch(error => {console.log(error)})
        },//FIN - ACTIONS - unModeratePost

        async getModeratedPosts ({commit}){
            await axios.get('http://localhost:3000/api/v1/moderation/get/posts',
                //header axios
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                'Content-Type': 'application/json'
                    }
                }//FIN headers
                                    
            )//FIN axios get
                .then(response => {
                    commit('GET_MODERATE_POST', response.data)                       
                })//FIN THEN         
                .catch(error => {console.log(error)})
        },//FIN - ACTIONS - getModeratedPosts

        async moderationComment ({commit},payload){
            await axios.put('http://localhost:3000/api/v1/moderation/edit/comment',
                //body axios
                {
                "uuid": payload.uuid,
                "comment_id":payload.comment_id,
                "active": false
                },//FIN body axios
                //header axios
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                'Content-Type': 'application/json'
                    }
                }//FIN headers               
            )//FIN axios put         
                .then(response => {
                    commit('MODERATE_COMMENT', response.data)                      
                })//FIN THEN       
                .catch(error => {console.log(error)})
        },//FIN - ACTIONS - moderationComment

        async unModerateComment ({commit},payload){
            await axios.put('http://localhost:3000/api/v1/moderation/edit/comment',
                //body axios
                {
                "uuid": payload.uuid,
                "comment_id":payload.comment_id,
                "active": true
                },//FIN body axios
                //header axios
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                    'Content-Type': 'application/json'
                    }
                }//FIN headers                  
            )//FIN axios put            
                .then(response => {
                    commit('UNMODERATE_COMMENT', response.data)                        
                })          
                .catch(error => {console.log(error)})
        },//FIN - ACTIONS - unModerateComment

        async getModeratedComments ({commit}){
            await axios.get('http://localhost:3000/api/v1/moderation/get/comments',
                //header axios
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                    'Content-Type': 'application/json'
                    }
                }//FIN headers                    
            )//FIN axios get                
                .then(response => {
                    commit('GET_MODERATE_COMMENT', response.data)                        
                })      
                .catch(error => {console.log(error)})
        },//FIN - ACTIONS - getModeratedComments


    }//FIN - ACTIONS

}//FIN CONSTANTE moderationFunction

export default moderationFunction