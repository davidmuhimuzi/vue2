import http from "../http-common";

class StudentDataService {
  getAll() {
    return http.get("/students");
  }

  get(student_id) {
    return http.get(`students/${student_id}`);
  }

  create(data) {
    return http.post("students/", data);
  }

  update(student_id, data) {
    return http.put(`students/${student_id}`, data);
  }

  delete(student_id) {
    return http.delete(`students/${student_id}`);
  }
}

export default new StudentDataService();