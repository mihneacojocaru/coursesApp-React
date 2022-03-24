import fs from "fs";

export default class EnrolmentRepository {
  getEnrolment = () => {
    return new Promise((resolve, reject) => {
      fs.readFile("./Data/enrolment.json", "utf-8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          const d = JSON.parse(data);
          resolve(d);
        }
      });
    });
  };

  saveNewEnrolment = (data) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        "./Data/enrolment.json",
        JSON.stringify(data, null, 2),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve("Succeded");
          }
        }
      );
    });
  };

  newEnrolmentsList = async (obj) => {
    try {
      let enrolment = await this.getEnrolment();
      obj.created_at = this.timeStamp();
      enrolment.push(obj);
      await this.saveNewEnrolment(enrolment);
    } catch (error) {
      console.warn(error);
    }
  };

  timeStamp(){
    let date = new Date();
    
    let info = date.toISOString();
    
    let x = info.split('T');
    let d = x[0];
    let t = x[1].split('.');

    return d + ' ' + t[0];
  }

  deleteEnrolment = async (studentId, courseId) => {
    try {
      let enrolments = await this.getEnrolment();
      
      let list = [];
      enrolments.forEach( e=>{
        let reqBody = [e.student_id,e.course_id];
        let data = [parseInt(studentId),courseId];
        let test = this.arrayEquals(reqBody,data);
        
        if(test == false){
          list.push(e);
        }
      });
     
      await this.saveNewEnrolment(list);
    } catch (error) {
      console.warn(error);
    }
  };

  arrayEquals = (a, b) => {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }

  verifyItem = async (stId,cId) => {
    try {
      let enrolments = await this.getEnrolment();
      let boolean = false;
      enrolments.forEach(e => {
        if(e.student_id == stId && e.course_id == cId){
          boolean = true;
        }
      });
      return boolean;
    } catch (error) {
      console.warn(error);
    }
  }

  updateEnrolmentsList = async (item,studentId,courseId) => {
    try {
      let enrolments = await this.getEnrolment();

      for (let i = 0; i < enrolments.length; i++) {
        if(enrolments[i].student_id == studentId){
          if(enrolments[i].course_id == courseId){
            enrolments[i].student_id = item.student_id;
            enrolments[i].course_id = item.course_id;
            enrolments[i].created_at = this.timeStamp();
          }
        }
      }
      
      await this.saveNewEnrolment(enrolments);
    } catch (error) {
      console.warn(error);
    }
  };
}
