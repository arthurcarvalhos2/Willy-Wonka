// import axios, { AxiosResponse } from 'axios';
// import { UserSignUpType } from '../Types/user';

// const BASE_URL = 'http://localhost:3000/Usuario';

// class UserService {

//     constructor() {
//         i
//       }

//   async addUser(user: UserSignUpType): Promise<boolean> {
//     try {
    
    
//     const formData = new FormData();
//     formData.append('nome', user.nome);
//     formData.append('senha', user.senha);

//     formData.append('foto', user?.foto?);

//     const uploadResponse = await axios.post(BASE_URL+'addUser', formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data',
//         },
//     });
    
//       return uploadResponse.status === 201;
    
//     } catch (error) {
//       console.error('Erro ao adicionar usuário:', error);
//       return false; 
//     }
//   }

//   async validateUser(username: string, password: string): Promise<boolean> {
//     try {
//         const response: AxiosResponse<User[]> = await axios.get(`${BASE_URL}?username=${username}&password=${password}`);
       
//         if (response.data.length === 0) {
//           return false;
//         }
  
//         return response.status === 200; 
//     } catch (error) {
//       console.error('Erro ao validar usuário:', error);
//       return false;
//     }
//   }

//   async getUserById(userId: number): Promise<User> {
//     try {
//         const response: AxiosResponse<User> = await axios.get(`${BASE_URL}?id=${userId}`);             
//         return response.data;
//     } catch (error) {
//         console.error('Erro ao buscar usuário pelo ID:', error);
//         return { id: 0, username: '', password: '' } ;
//     }

// }

//   async getAllUsers(): Promise<User[] | null> {
//     try {
//       const response: AxiosResponse<User[]> = await axios.get(`${BASE_URL}`);
//       return response.data;
      
//     } catch (error) {
//         console.error('Erro ao buscar usuário pelo ID:', error);
//         return null;
//     }

//   }

// }

// export default  UserService;