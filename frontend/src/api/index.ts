import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers = {
    "Authorization": "Bearer " + localStorage.getItem('token')
}
export const user = async () => await (await axios.get('user')).data;
export const login = async (data: any) => await axios.post('login', data);
export const members = async (page: number) => await (await (axios.get('/members?page=' + page))).data
export const updateMember = async (data: any) => await (axios.put('/members/' + data.id, data))
export const deleteMember = async (id: number) => await (axios.delete('/members/' + id));
export const createMember = async (data:any) => await (axios.post('/members', data));