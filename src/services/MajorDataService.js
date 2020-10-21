import http from "../http-common";

class MajorDataService {
  getAll(params) {
    return http.get("/majors", { params });
  }

  get(id) {
    return http.get(`majors/${id}`);
  }

  create(data) {
    return http.post("majors/", data);
  }

  update(id, data) {
    return http.put(`majors/${id}`, data);
  }

  delete(id) {
    return http.delete(`majors/${id}`);
  }
}

export default new MajorDataService();