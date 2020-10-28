import http from "../http-common";

class AdvisorDataService {
    getAll(params) {
      return http.get("/advisors", { params });
    }
  
    get(id) {
      return http.get(`advisors/${id}`);
    }
  
    create(data) {
      return http.post("advisors/", data);
    }
  
    update(id, data) {
      return http.put(`advisors/${id}`, data);
    }
  
    delete(id) {
      return http.delete(`advisors/${id}`);
    }

  }
  
  export default new AdvisorDataService();


