import axios from 'axios';
import {AxiosInstance} from 'axios';
import { StorageService } from "./StorageService";

export class HttpService{
    storageService:StorageService;
    connectionApi: AxiosInstance;
    constructor(){
        this.storageService = new StorageService();
        this.connectionApi = axios.create({
        baseURL: 'http://localhost:8442',
        headers: {
          'Authorization':this.storageService.getItem("jwt")?this.storageService.getItem("jwt"):"",
          'Content-Type': 'application/json',
          'Access-Control-Allow_Methods': 'GET, POST, PUT, DELETE, PATCH'
        }
      });

    }


   doPost(url:string, 
    body:object,
    successCallback: (param: any) => void,
     errorCallback:(param: any) => void){
        this.connectionApi.post(url,body).
        then(response=>{successCallback(response.data);})
        .catch(error=>{errorCallback(error);});
     }
    }