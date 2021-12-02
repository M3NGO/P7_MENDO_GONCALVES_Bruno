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
           await axios
                .get('http://localhost:3000/api/v1/profil/'+uuid)
            
                .then(response => {
                    // console.log(response.data.comment)
                    commit('GET_PROFILE', response.data)
                    
                })
                .catch(error => {console.log(error)})
        },//FIN GET PROFILE

        async updateUser ({commit}, payload){
            let uuid= localStorage.getItem('uuid')
            console.log(payload)
                await axios
    
                    .put('http://localhost:3000/api/v1/profil/'+uuid+'/update', 
                    //body axios
    
                       {
                        "firstname": payload.firstname,
                        "lastname": payload.lastname,
                        "poste": payload.poste,
                        "upload": payload.upload,
                      },
                       //header axios
        {'Authorization': 'Bearer'+' '+ localStorage.getItem('token'), 
        'Content-Type': 'application/json'
      },
                    
                      )//fin post HTTP
                      
            
                      .then(response => {
                          // console.log(response.data.comment)
                          commit('UPDATE_PROFILE', response.data)
                          
                      })
            
                    .catch(error => {console.log(error)})
            },


            async updatePassword ({commit},payload){
                let uuid= localStorage.getItem('uuid')
                console.log(payload)
                    await axios
        
                        .put('http://localhost:3000/api/v1/profil/'+uuid+'/password', 
                        //body axios
        
                           {
                            "password": payload.password,
                          },
                           //header axios
            {'Authorization': 'Bearer'+' '+ localStorage.getItem('token'), 
            'Content-Type': 'application/json'
          },
                        
                          )//fin post HTTP
                          
                
                          .then(response => {
                              // console.log(response.data.comment)
                              commit('UPDATE_PASSWORD', response.data)
                              alert('Vous allez être déconnecté, Veuillez vous reconnecter avec votre nouveau mot de passe.')
                              window.location.href ="/"
                              
                          })
                
                        .catch(error => {console.log(error)})
                },

    },//FIN ACTIONS

}

export default getProfile