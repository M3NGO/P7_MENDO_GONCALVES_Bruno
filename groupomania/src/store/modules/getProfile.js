import axios from 'axios'

const getProfile = {
    namespaced: true,
    state: {
        profile: [], 
    },//FIN state
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
    },//FIN MUTATIONS
    actions: {
        async getProfile ({commit}){
            let uuid= localStorage.getItem('uuid')
            await axios.get('http://localhost:3000/api/v1/profil/'+uuid, //construction http avec variable uuid du user loggué
                
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                'Content-Type': 'application/json'
                    }
                }//FIN headers
            )//FIN axios get porfile
                .then(response => {
                    commit('GET_PROFILE', response.data)
                })//FIN THEN
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
            await axios.put('http://localhost:3000/api/v1/profil/'+uuid+'/update', 
                //FormData axios
                formData,
                //header axios avec token auth
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                    'Content-Type': 'multipart/form-data'
                    }
                },//FIN headers
                    
            )//FIN axios put
                .then(response => {
                    // console.log(response.data)
                    commit('UPDATE_PROFILE', response.data)    
                })//FIN THEN
                .catch(error => {console.log(error)})
        },//FIN - ACTION - updateUser

        async updatePassword ({commit},payload){
            let uuid= localStorage.getItem('uuid')
            // console.log(payload)
            await axios.put('http://localhost:3000/api/v1/profil/'+uuid+'/password', 
                //body axios
                {
                "password": payload.password,
                },
                //header axios
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                    'Content-Type': 'application/json'
                    }
                }//FIN headers axios
                        
            )//FIN axios put
                .then(response => {
                    commit('UPDATE_PASSWORD', response.data)
                    alert('Votre mot de passe a été modifié. \n\n Vous allez être déconnecté, Veuillez vous reconnecter avec votre nouveau mot de passe.')
                    window.location.href ="/"        
                })//FIN THEN
                .catch(error => {console.log(error)})
        },// FIN - ACTION - updatePassword

        async deleteAvatar ({commit}, payload) {
            let uuid= localStorage.getItem('uuid')
            await axios.put('http://localhost:3000/api/v1/profil/'+uuid+'/delete_avatar', 
                //body axios
                {
                "upload_url": payload.avatar,
                },
                //header axios avec token bearer
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                    'Content-Type': 'application/json'
                    }
                }//FIN headers
            )//FIN axios put
                .then(response => {
                    // console.log(response.data.comment)
                    commit('GET_PROFILE', response.data)
                })//FIN THEN
                    .catch(error => {console.log(error)})
        },//FIN - ACTION - deleteAvatar
        
        async toNotActiveUser ({commit}){
            //le user se delete de lui même mais son contenu reste live sur le site
            let uuid= localStorage.getItem('uuid')
            await axios.delete('http://localhost:3000/api/v1/profil/'+uuid, 
                //body axios vide car axios delete n'accepte pas de body
                //header axios
                {headers:{Authorization: 'Bearer '+ localStorage.getItem('token'), 
                    'Content-Type': 'application/json'
                    }
                }//FIN headers         
            )//FIN axios delete
                .then(response => {
                    commit('GET_PROFILE', response.data)
                    alert("Nous regrettons de vous voir partir de GROUPOMANIA. Votre profil ne sera plus accessible!!")
                    window.location.href ="/"
                })
                .catch(error => {console.log(error)})
        },//FIN - ACTIONS - toNotActiveUser (delete user par lui même - son contenu reste en ligne)

    },//FIN ACTIONS

}//FIN CONSTANTE getProfile

export default getProfile