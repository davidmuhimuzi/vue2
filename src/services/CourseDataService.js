import http from "../http-common";

class CourseDataService {
  getAll() {
    return http.get("courses");
  }

  get(id) {
    return http.get(`courses/${id}`);
  }

  create(data) {
    return http.post("courses/", data);
  }

  update(id, data) {
    return http.put(`courses/${id}`, data);
  }

  delete(id) {
    return http.delete(`courses/${id}`);
  }

  //deleteAll() {
  //  return http.delete(`courses`);
  //}

  getByDept(dept) {
    return http.get(`courses?dept=${dept}`);
  }
}

export default new CourseDataService();