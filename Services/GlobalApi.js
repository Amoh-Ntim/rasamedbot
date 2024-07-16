import axios from "axios";

const BASE_URL='http://192.168.193.69:3000/bardapi' //Replace with System PC IP address

const getBardApi=(userMsg)=>axios.get(BASE_URL+"?ques="+userMsg);

export default{
    getBardApi
}