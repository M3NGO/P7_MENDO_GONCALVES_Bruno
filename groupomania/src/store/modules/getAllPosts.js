import axios from 'axios'

const getAllPosts = {
    namespaced: true,
    state: {
        allPosts: [],
    },//FIN state
    mutations: {
        GET_POSTS(state, data) {
            // console.log(data)
            state.allPosts = data
            // state.allPosts.reverse() // Pour inverser si besoin l'ordre dans lequel on présente les post
        },
        CREATE_POSTS(state, data){ //set timeout sinon probleme d'affichage images nouveaux posts
            function delay(){
                window.setTimeout(state.allPosts = [data, ...state.allPosts], 10)
            }return delay
        },
        UPDATE_POSTS(state, data){
            function delayPost(){
                const index = state.allPosts.map(post => post.id).indexOf(data.id)
                window.setTimeout(state.allPosts.splice(index, 1, data), 10)
            }return delayPost
        },
        CREATE_COMMENTS(state, data){
            state.allPosts = data
        },
        UPDATE_COMMENTS(state, data){
            function delay(){
                const index = state.allPosts.comments.map(comment => comment.id).indexOf(data.id)
                window.setTimeout(state.allPosts.comments.splice(index, 1, data), 10)
            }return delay
        },
    },//FIN MUTATIONS
   
    actions: {
        async getAllPostsAct ({commit}){
            await axios.get('http://localhost:3000/api/v1/',
                //header pour ajouter le token Bearer pour l'authentification user
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                'Content-Type': 'application/json'
                    }
                },//FIN headers
            )//FIN actios GET all posts actifs
                .then(response => {
                    // console.log(response.data)
                    commit('GET_POSTS', response.data)
                })//FIN THEN
                .catch(error => {console.log(error)})
        },//fin getAllPostsAct

        async createPosts ({commit}, payload){
            //formData Axios pour envoyer formdata avec l'upload user
            let formData = new FormData();
                formData.append('file', payload.file);
                formData.append('uuid', localStorage.getItem('uuid'));
                formData.append('email', payload.email);
                formData.append('content', payload.content,);
                formData.append('upload', payload.upload);

            await axios.post('http://localhost:3000/api/v1/post',
                //formdata remplace le body de la requete
                formData, // reprend toutes les append mentionnées dans new FormData() ci-dessus
            
                //header axios ave token pour auth
                {headers:{Authorization: 'Bearer'+' '+ localStorage.getItem('token'), 
                    'Content-Type': 'multipart/form-data'// multipart/form-data; au lieu de => 'Content-Type': 'application/json'
                        }
                }//FIN Headers
                
            )//FIN axios post pour créér post

                .then(response => {
                    // console.log(response.data)
                    commit('CREATE_POSTS', response.data)
                })//FIN THEN
            .catch(error => {console.log(error)})
        },//FIN - ACTIONS - CREATEPOST


        async updatePosts ({commit}, payload){
            let post = payload.postid
            let formData = new FormData();
                formData.append('uuid', localStorage.getItem('uuid'));
                    if(payload.contentUpdate != '' || null){
                    formData.append('content', payload.contentUpdate);
                    }if(payload.uploadUpdate != '' || null){
                    formData.append('upload', payload.uploadUpdate);
                    }if(payload.file != '' || null ){
                    formData.append('file', payload.file);
                    }
                    
                    //check console des infos envoyées par formData
                    //     for (var pair of formData.entries()) {
                    //     console.log(pair[0]+ ', ' + pair[1]); 
                    // }

            await axios.put('http://localhost:3000/api/v1/post/'+post,
                formData,
                //header axios
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                    }
                }//FIN HEADERS
            )//FIN axios put
                .then(response => {
                    commit('UPDATE_POSTS', response.data)
                    // console.log(response.data)
                    })//FIN THEN
                    .catch(error => {console.log(error)})
        },//FIN UPDATEPOSTS

        async deletePosts ({commit}, payload){
            // alert(payload.postid)
            let post = payload.postid
            await axios.delete('http://localhost:3000/api/v1/post/'+post,
                //pas de body axios car axios n'accepte pas de body pour les requetes delete
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                'Content-Type': 'application/json'
                    }
                }//FIN Headers
            )//FIN axios delete
                .then(response => {
                    commit('CREATE_POSTS', response.data)
                })//FIN THEN
            .catch(error => {console.log(error)})
        },//FIN - ACTIONS - deletePost


        async createComments ({commit}, payload){
            //formData Axios
            let formData = new FormData();
                formData.append('file', payload.file);
                formData.append('uuid', localStorage.getItem('uuid'));
                formData.append('post_id', payload.postid);
                formData.append('email', payload.email);
                formData.append('content', payload.contentCom,);
                formData.append('upload', payload.uploadCom);
        
            await axios.post('http://localhost:3000/api/v1/comment/',
                //formdata axios
                formData,
                //header axios avec token auth
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                    'Content-Type': 'multipart/form-data'
                    }
                }//FIN Headers    
            )//FIN axios post
                .then(response => {
                    // console.log(response.data)
                    commit('CREATE_POSTS', response.data)
                    })//FIN THEN
                    .catch(error => {console.log(error)})
        },//FIN ACTIONS CREATECOMMENTS
        
        async updateComments ({commit}, payload){
            let comment = payload.commentId
            //formData Axios
            let formData = new FormData();
        
                formData.append('uuid', localStorage.getItem('uuid'));
                    if(payload.contentUpdate != '' || null){
                        formData.append('content', payload.contentUpdate);
                    }if(payload.postid != '' || null){
                        formData.append('post_id', payload.postid);
                    }if(payload.uploadUpdate != '' || null){
                        formData.append('upload', payload.uploadUpdate);
                    }if(payload.file != '' || null ){
                        formData.append('file', payload.file);
                    }
                    //   console.log(payload.uploadUpdate)
                    //check console des infos envoyées par formData
                    // for (var pair of formData.entries()) {
                    //     console.log(pair[0]+ ', ' + pair[1]); 
                    // }
        
            await axios.put('http://localhost:3000/api/v1/comment/'+comment,
                //formdata axios
                formData,
                //header axios
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                    'Content-Type': 'multipart/form-data'
                    }
                }//FIN Headers
                    
            )//FIN axios put
                .then(response => {
                    commit('UPDATE_COMMENTS', response.data)
                })//FIN THEN
                .catch(error => {console.log(error)})
        },//FIN - ACTIONS - UPDATECOMMENTS
        
        
        async deleteComments ({commit},payload){
            let commentId = payload.commentId
                await axios.delete('http://localhost:3000/api/v1/comment/'+commentId,
                    //pas de body axios pour les requetes delete
                    //header axios
                    {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                        'Content-Type': 'application/json'
                        }
                    }//FIN headers
                )//FIN axios delete
                    .then(response => {
                        commit('UPDATE_POSTS', response.data)
                    })//FIN THEN
                    .catch(error => {console.log(error)})
        }//FIN - ACTIONS - DELETECOMMENTS


    },//FIN ACTIONS

}//FIN CONSTANTE GET ALL POSTS

export default getAllPosts