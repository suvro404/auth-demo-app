import axios from 'axios';
import _ from 'lodash';

class ApiService {
  constructor(initConfig) {
    if(_.has(initConfig, 'host') === false) {
      throw new Error("service host is undefined.");
    }
    this.apiLoc = initConfig.host;
  }

  query(queryName, onResponse, onError) {
    var reqLoc = this.apiLoc + "/api/" + queryName;
    axios.get(reqLoc).then((resp)=>{
      onResponse(resp.data);
    }).catch((err) => {
      onError(err);
    });
  }

  command(actionName, reqData, onResponse, onError) {
    var reqLoc = this.apiLoc + "/api/"+ actionName;
    axios.post(reqLoc, reqData).then((resp)=>{
      onResponse(resp.data);
    }).catch((err) => {
      onError(err);
    });
  }
}

export default ApiService;
