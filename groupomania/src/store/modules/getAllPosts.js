import axios from 'axios'

const getAllPosts = {
    namespaced: true,
    state: {
        allPosts: [],
        // createdPosts:[]
        
    },
    mutations: {
        GET_POSTS(state, data) {
            // console.log(data)
            state.allPosts = data
        },
        CREATE_POSTS(state, data){
            state.allPosts = data
        },
        UPDATE_POSTS(state, data){
            state.allPosts = data
        },




    },
    actions: {
       async getAllPostsAct ({commit}){
        
            await axios
                .get('http://localhost:3000/api/v1/')
                
                .then(response => {
                    // console.log(response.data.comment)
                    commit('GET_POSTS', response.data)
                    
                })
                .catch(error => {console.log(error)})
        },//fin getAllPostsAct

        async createPosts ({commit}, payload){
            //formData Axios
                let formData = new FormData();
                    formData.append('file', payload.file);
                    formData.append('uuid', localStorage.getItem('uuid'));
                    formData.append('email', payload.email);
                    formData.append('content', payload.content,);
                    formData.append('upload', payload.upload);

                await axios
                .post('http://localhost:3000/api/v1/post',
                    
                formData,
                //body axios
                    // {
                    // "uuid": localStorage.getItem('uuid'),
                    // "content": payload.content,
                    // "email": payload.email,
                    // "upload": payload.upload,
                    // },
                    // //header axios
                    {'Authorization': 'Bearer'+' '+ localStorage.getItem('token'), 
                    // 'Content-Type': 'application/json'
                    'Content-Type': 'multipart/form-data'
                  },
                
                )

            
 
            .then(response => {
                console.log(response.data)
                commit('CREATE_POSTS', response.data)
            })
            .catch(error => {console.log(error)})
        },


        async updatePosts ({commit}, payload){
            // alert(payload.contentUpdate)
            let post = payload.postid
// console.log('payload le voici: '+ payload)
            let formData = new FormData();
            // formData.append('file', payload.file);
            // formData.append('uuid', localStorage.getItem('uuid'));
            // formData.append('content', payload.content,);
            // formData.append('upload', payload.upload);
            formData.append('uuid', localStorage.getItem('uuid'));

            if(payload.contentUpdate != '' || null){
              formData.append('content', payload.contentUpdate);
            }else if(payload.uploadUpdate != '' || null){
              formData.append('upload', payload.uploadUpdate);
            }else if(payload.file != '' || null ){
            formData.append('file', payload.file);
            }
            
            
            //check console des infos envoyées par formData
            for (var pair of formData.entries()) {
              console.log(pair[0]+ ', ' + pair[1]); 
          }

            await axios
            .put('http://localhost:3000/api/v1/post/'+post,
                //body axios
                formData,
                // {
                // "uuid": localStorage.getItem('uuid'),
                // "content": payload.contentUpdate,
                // "upload": payload.uploadUpdate,
                // },
                //header axios
                {'Authorization': 'Bearer '+ localStorage.getItem('token'), 
                // 'Content-Type': 'application/json'
                'Content-Type': 'multipart/form-data'
              },
            
            )
            .then(response => {
                commit('UPDATE_POSTS', response.data)
            })
            .catch(error => {console.log(error)})
        },

        async deletePosts ({commit}, payload){
            // alert(payload.postid)
            let post = payload.postid
            await axios
            .delete('http://localhost:3000/api/v1/post/'+post,
                //body axios
                
                // {
                // "uuid": payload.uuid,
                // },
                //header axios
            //     {'Authorization': 'Bearer '+ localStorage.getItem('token'), 
            //     'Content-Type': 'application/json'
            //   },
            )
            .then(response => {
                commit('UPDATE_POSTS', response.data)
            })
            .catch(error => {console.log(error)})
        }


    },//fin actions

}

export default getAllPosts

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