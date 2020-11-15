import http from "../http-common";

class StuCourseDataService {
  getAll() {
    return http.get("/studentcourses");
  }
  
    getAllPerStudent(student_id) {
        return http.get(`studentcourses?student_id=${student_id}`);
      }
  
    get(id) {
      return http.get(`studentcourses/${id}`);
    }
  
    create(data) {
      return http.post("studentcourses/", data);
    }
  
    update(id, data) {
      return http.put(`studentcourses/${id}`, data);
    }
  
    delete(id) {
      return http.delete(`studentcourses/${id}`);
    }

  }
  
  export default new StuCourseDataService();
