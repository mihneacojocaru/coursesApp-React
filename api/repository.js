import { rejects } from "assert";
import fs from "fs";
import { resolve } from "path";

//--- Students
export const getStudents = () => {
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

export const saveNewStudent = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile("./Data/students.json", JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Succeded");
      }
    });
  });
};

export const newStudentsList = async (obj) => {
  try {
    let students = await getStudents();

    let newStudent = { id: nextId(studens), ...obj };

    students.push(newStudent);

    await saveNewStudent(students);
  } catch (error) {
    console.warn(error);
  }
};

const nextId = (list) => {
  let idList = [];

  list.forEach((element) => {
    idList.push(element.id);
  });

  return idList.pop() + 1;
};

export const deleteStudent = async (id) => {
  try {
    let students = await getStudents();
    students = students.filter((e) => e.id != id);
    await saveNewStudent(students);
  } catch (error) {
    console.warn(error);
  }
};

export const updateStudents = async (item) => {
  try {
    let students = await getMaterials();

    for (let i = 0; i < students.length; i++) {
      if (students[i].id == item.id) {
        students[i] = item;
      }

      await saveNewStudent(students);
    }
  } catch (error) {
    console.warn(error);
  }
};

//--- Enrolment

export const getEnrolment = () => {
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

export const saveNewEnrolment = (data) => {
    return new Promise((resolve, reject) => {
      fs.writeFile("./Data/enrolment.json", JSON.stringify(data, null, 2), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Succeded");
        }
      });
    });
  };
  
  export const newEnrolmentsList = async (obj) => {
    try {
      let enrolment = await getEnrolment();
      enrolment.push(obj);
      await saveNewEnrolment(enrolment);
    } catch (error) {
      console.warn(error);
    }
  };

  export const deleteEnrolment = async (studentId,courseId)=>{
    try {
      let enrolments = await getEnrolment();
      enrolments = enrolments.filter(e => e.student_id !== studentId && e.course_id !== courseId)

      await saveNewEnrolment(enrolments);
    } catch (error) {
      console.warn(error);
    }

  }

//--- Courses

export const getCourses = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("./Data/courses.json", "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const d = JSON.parse(data);
        resolve(d);
      }
    });
  });
};

export const saveNewCourse = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile("./Data/courses.json", JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Succeded");
      }
    });
  });
};

export const deleteCourse = async (courseId) => {

  try {
    let courses = await getCourses();
    courses = courses.filter( e => e.course_id !== courseId);

    console.log(courses);
    //await saveNewCourse(courses);

  } catch (error) {
    console.warn(error);
  }

}
