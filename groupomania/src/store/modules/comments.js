import axios from 'axios'

const comments = {
    namespaced: true,
    state: {
        createComment: [],
        
    },
    mutations: {
        CREATE_COMMENTS(state, data){
            state.createComment = data
        },
        UPDATE_COMMENTS(state, data){
            state.createComment.push(data)
        }



    },
    actions: {

        async createComments ({commit}, payload){
            let uuid= localStorage.getItem('uuid')
            // alert(payload.postid)
            await axios
            .post('http://localhost:3000/api/v1/comment/',
                //body axios
            
                {
                "uuid": uuid,
                "post_id": payload.postid,
                "email": payload.email,
                "content": payload.contentCom,
                "upload": payload.uploadCom,
                },
                //header axios
            //     {'Authorization': 'Bearer '+localStorage.getItem('token'), 
            //     'Content-Type': 'application/json'
            //   },
            
            )
            .then(response => {
                console.log(response.data)
                commit('CREATE_COMMENTS', response.data)
            })
            .catch(error => {console.log(error)})
        },

        async updateComments ({commit}, payload){
            let comment = payload.commentId
            await axios
            .put('http://localhost:3000/api/v1/comment/'+comment,
                //body axios

                {
                "uuid": localStorage.getItem('uuid'),
                "post_id": payload.postid,
                "content": payload.contentUpdate,
                "upload": payload.uploadUpdate,
                },
                //header axios
                {'Authorization': 'Bearer '+ localStorage.getItem('token'), 
                'Content-Type': 'application/json'
              },
            
            )
            .then(response => {
                commit('UPDATE_COMMENTS', response.data)
            })
            .catch(error => {console.log(error)})
        },


        async deleteComments ({commit},payload){
            alert(payload.commentId)
            let commentId = payload.commentId
            await axios
            .delete('http://localhost:3000/api/v1/comment/'+commentId
                //body axios
                
                // {
                // "id": payload.commentId,
                
                // },
                //header axios
            //     {'Authorization': 'Bearer '+ localStorage.getItem('token'), 
            //     'Content-Type': 'application/json'
            //   },
            )
            .then(response => {
                commit('UPDATE_COMMENTS', response.data)
            })
            .catch(error => {console.log(error)})
        }



    },//fin actions

}

export default comments

// formdata pour gestion des fichiers

// export const actions = {
//     async create ({ rootState }, payload) {
//       if (payload.file) {
//         const formData = new FormData();
  
//         formData.append('file', payload.file);
//         formData.append('city_id', rootState.city.id);
//         formData.append('author', payload.author ? payload.author : 'Non renseigné');
//         formData.append('description', payload.description);
//         formData.append('category', payload.category);
  
//         if (payload.latitude || payload.longitude) {
//           formData.append('latitude', payload.latitude);
//           formData.append('longitude', payload.longitude);
//         }
  
//         const res = await this.$axios.post('/incident/create',
//           formData,
//           {
//             headers: {
//               'Content-Type': 'multipart/form-data'
//             }
//           }
//         );
  
//         return res;
//       } else {
//         const res = await this.$axios.post('/incident/create', {
//           city_id: rootState.city.id,
//           author: payload.author ? payload.author : 'Non renseigné',
//           description: payload.description,
//           category: payload.category,
//           latitude: payload.latitude ? payload.latitude : null,
//           longitude: payload.longitude ? payload.longitude : null
//         });
  
//         return res;
//       }
//     }
//   };