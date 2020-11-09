import http from "../http-common";

class MajorDataService {
  getAll() {
    return http.get("/majorcourses");
  }

  getAllForCourse(id) {
    return http.get("/majorcourses?course=" + id);
  }

  get(id) {
    return http.get(`majorcourses/${id}`);
  }

  create(data) {
    return http.post("majorcourses/", data);
  }

  update(id, data) {
    return http.put(`majorcourses/${id}`, data);
  }

  delete(id) {
    return http.delete(`majorcourses/${id}`);
  }

  deleteAllForCourse(id)  {
    return http.delete(`majorcourses?course=` + id);
  }
}

export default new MajorDataService();