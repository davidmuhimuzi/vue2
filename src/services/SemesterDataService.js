import http from "../http-common";

class SemesterDataService {
  getAll(params) {
    return http.get("/semesters", { params });
  }

  get(id) {
    return http.get(`semesters/${id}`);
  }

  create(data) {
    return http.post("semesters/", data);
  }

  update(id, data) {
    return http.put(`semesters/${id}`, data);
  }

  delete(id) {
    return http.delete(`semesters/${id}`);
  }

  getBySemesterName(semester_name) {
    return http.get(`semesters?semester_name=${semester_name}`);
  }
}

export default new SemesterDataService();