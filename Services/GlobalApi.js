import axios from "axios";

const BASE_URL='http://192.168.143.69:8000/gemini' //Replace with System PC IP address

const getBardApi=(msg)=>axios.get(BASE_URL+"?ques="+msg);

export default{
    getBardApi
}