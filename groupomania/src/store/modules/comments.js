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
            // let uuid= localStorage.getItem('uuid')
            // alert(payload.postid)
                        //formData Axios
                        let formData = new FormData();
                        formData.append('file', payload.file);
                        formData.append('uuid', localStorage.getItem('uuid'));
                        formData.append('post_id', payload.postid);
                        formData.append('email', payload.email);
                        formData.append('content', payload.contentCom,);
                        formData.append('upload', payload.uploadCom);

            await axios
            .post('http://localhost:3000/api/v1/comment/',
                //body axios
            formData,
                // {
                // "uuid": uuid,
                // "post_id": payload.postid,
                // "email": payload.email,
                // "content": payload.contentCom,
                // "upload": payload.uploadCom,
                // },
                //header axios
                {'Authorization': 'Bearer '+localStorage.getItem('token'), 
                'Content-Type': 'multipart/form-data'
              },
            
            )
            .then(response => {
                console.log(response.data)
                commit('CREATE_COMMENTS', response.data)
            })
            .catch(error => {console.log(error)})
        },

        async updateComments ({commit}, payload){
            let comment = payload.commentId
                      //formData Axios
                      let formData = new FormData();
                    //   formData.append('file', payload.file);
                    //   formData.append('uuid', localStorage.getItem('uuid'));
                      
                    //   formData.append('content', payload.content,);
                    //   formData.append('upload', payload.upload);

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
                      
                      console.log(payload.uploadUpdate)
                      //check console des infos envoyées par formData
                      for (var pair of formData.entries()) {
                        console.log(pair[0]+ ', ' + pair[1]); 
                    }


            await axios
            .put('http://localhost:3000/api/v1/comment/'+comment,
                //body axios
                    formData,
                // {
                // "uuid": localStorage.getItem('uuid'),
                // "post_id": payload.postid,
                // "content": payload.contentUpdate,
                // "upload": payload.uploadUpdate,
                // },
                //header axios
                {'Authorization': 'Bearer '+ localStorage.getItem('token'), 
                'Content-Type': 'multipart/form-data'
              },
            
            )
            .then(response => {
                commit('UPDATE_COMMENTS', response.data)
            })
            .catch(error => {console.log(error)})
        },


        async deleteComments ({commit},payload){
            // alert(payload.commentId)
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