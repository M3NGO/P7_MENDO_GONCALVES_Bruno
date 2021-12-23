import axios from 'axios'

const getProfile = {
    namespaced: true,
    state: {
        profile: [],
        
    },
    mutations: {
        GET_PROFILE(state, data) {
            // console.log(data)
            state.profile = data
        },
        UPDATE_PROFILE(state, data) {
            // console.log(data)
            state.profile = data
        },
        UPDATE_PASSWORD(state, data) {
            // console.log(data)
            state.profile = data
        },



    },
    actions: {
       async getProfile ({commit}){
        let uuid= localStorage.getItem('uuid')
        // alert(uuid)
           await axios
                .get('http://localhost:3000/api/v1/profil/'+uuid,
                
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                'Content-Type': 'application/json'
                    }
                }
                )
            
                .then(response => {
                    // console.log(response.data.comment)
                    commit('GET_PROFILE', response.data)
                    
                })
                .catch(error => {console.log(error)})
        },//FIN GET PROFILE

        async updateUser ({commit}, payload){
            let uuid= localStorage.getItem('uuid')

                      //formData Axios
            
                      let formData = new FormData();
                        //décomposition des infos a envoyer au back pour ne pas updater toutes les infos user en même temps
                      if(payload.firstname != '' || null){
                          formData.append('firstname', payload.firstname);
                      }if(payload.lastname != '' || null){
                        formData.append('lastname', payload.lastname);
                      }if(payload.poste != '' || null){
                        formData.append('poste', payload.poste);
                      }if(payload.upload != '' || null){
                        formData.append('file', payload.file);
                        formData.append('upload', payload.upload);
                      }
                      
                      
                    //   //check console des infos envoyées par formData
                    //   for (var pair of formData.entries()) {
                    //     console.log(pair[0]+ ', ' + pair[1]); 
                    // }
            
                await axios
    
                    .put('http://localhost:3000/api/v1/profil/'+uuid+'/update', 
                    //body axios
                    formData,
                    //    {
                    //     "firstname": payload.firstname,
                    //     "lastname": payload.lastname,
                    //     "poste": payload.poste,
                    //     "upload": payload.upload,
                    //   },
                       //header axios
        {headers:{
            Authorization: 'Bearer '+ localStorage.getItem('token'), 
        'Content-Type': 'multipart/form-data'
        }
      },
                    
                      )//fin post HTTP
                      
            
                      .then(response => {
                          console.log(response.data)
                          commit('UPDATE_PROFILE', response.data)
                          
                      })
            
                    .catch(error => {console.log(error)})
            },


            async updatePassword ({commit},payload){
                let uuid= localStorage.getItem('uuid')
                // console.log(payload)
                    await axios
        
                        .put('http://localhost:3000/api/v1/profil/'+uuid+'/password', 
                        //body axios
        
                           {
                            "password": payload.password,
                          },
                           //header axios
                           {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                           'Content-Type': 'application/json'
                               }
                           }
                        
                          )//fin post HTTP
                          
                
                          .then(response => {
                              // console.log(response.data.comment)
                              commit('UPDATE_PASSWORD', response.data)
                              alert('Vous allez être déconnecté, Veuillez vous reconnecter avec votre nouveau mot de passe.')
                              window.location.href ="/"
                              
                          })
                
                        .catch(error => {console.log(error)})
                },

                async deleteAvatar ({commit}, payload) {
                    let uuid= localStorage.getItem('uuid')
            
                        await axios
            
                            .put('http://localhost:3000/api/v1/profil/'+uuid+'/delete_avatar', 
                            //body axios
                            {
                                "upload_url": payload.avatar,
                            },
                               //header axios
                               {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                               'Content-Type': 'application/json'
                                   }
                               }
                            
                              )//fin post HTTP
                              .then(response => {
                                  // console.log(response.data.comment)
                                  commit('GET_PROFILE', response.data)
                              })
                            .catch(error => {console.log(error)})
                    },


                async toNotActiveUser ({commit}){
                    let uuid= localStorage.getItem('uuid')
            
                        await axios
            
                            .delete('http://localhost:3000/api/v1/profil/'+uuid, 
                            //body axios
            
                               //header axios
                               {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                               'Content-Type': 'application/json'
                                   }
                               }
                            
                              )//fin post HTTP
                              
                    
                              .then(response => {
                                  // console.log(response.data.comment)
                                  commit('GET_PROFILE', response.data)
                                  alert("Nous regrettons de vous voir partir de GROUPOMANIA. Votre profil ne sera plus accessible!!")
                                  window.location.href ="/"
                                  
                              })
                    
                            .catch(error => {console.log(error)})
                    },

    },//FIN ACTIONS

}

export default getProfile