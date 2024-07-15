import axios from 'axios'
const API_URL = 'https://jsonplaceholder.typicode.com';
export class UserService{
  async getUsers(){
    return axios.get(`${API_URL}/users`);
  }
  async getUser(id){

  }
  async updateUser(user){

  }
  async deleteUser(id){
    const response = { success: false, message: 'Usuario eliminado' }; 
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        response.success = true;
        resolve(response)
      }, 1000);
    })
  }
}