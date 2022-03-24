import fs from "fs";

export default class StundentRepository {
  getStudents = () => {
    return new Promise((resolve, reject) => {
      fs.readFile("./Data/students.json", "utf-8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          const d = JSON.parse(data);
          resolve(d);
        }
      });
    });
  };

  saveNewStudent = (data) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        "./Data/students.json",
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

  newStudentsList = async (obj) => {
    try {
      let students = await this.getStudents();

      let newStudent = { id: this.nextId(students), ...obj };

      students.push(newStudent);

      await this.saveNewStudent(students);
    } catch (error) {
      console.warn(error);
    }
  };

  nextId = (list) => {
    let idList = [];

    list.forEach((element) => {
      idList.push(element.id);
    });

    return idList.pop() + 1;
  };

  deleteStudent = async (id) => {
    try {
      let students = await this.getStudents();
      students = students.filter((e) => e.id != id);
      await this.saveNewStudent(students);
    } catch (error) {
      console.warn(error);
    }
  };

  verifyItem = async (id) => {
    try {
      const students = await this.getStudents();
      let boolean = false;
      students.forEach(e => {
        if(e.id == id){
          boolean = true;
        }
      })
      return boolean;
    } catch (error) {
      console.warn(error);
    }
  }

  updateStudents = async (item) => {
    try {
      let students = await this.getStudents();

      for (let i = 0; i < students.length; i++) {
        if (students[i].id == item.id) {
          students[i] = item;
        }
        await this.saveNewStudent(students);
      }
    } catch (error) {
      console.warn(error);
    }
  };
}
