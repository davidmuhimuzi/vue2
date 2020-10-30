import http from "../http-common";

class StudentDataService {
  getAll(params) {
    return http.get("/students", { params });
  }

  get(id) {
    return http.get(`students/${id}`);
  }

  create(data) {
    return http.post("students/", data);
  }

  update(id, data) {
    return http.put(`students/${id}`, data);
  }

  delete(id) {
    return http.delete(`students/${id}`);
  }
}

export default new StudentDataService();