import e from 'express';
import fs from 'fs';

export default class CoursesRepository{

    getCourses = () => {
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

      saveNewCourse = (data) => {
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

      deleteCourse = async (courseId) => {
        try {
          let courses = await this.getCourses();
          courses = courses.filter( e => e.course_id !== courseId);
          await this.saveNewCourse(courses);
        } catch (error) {
          console.warn(error);
        }
      }

      verifyItem = async (courseId) => {
        try {
          let courses = await this.getCourses();
          let boolean = false;
          courses.forEach(e => {
            if(e.course_id == courseId){
              boolean = true;
            }
          });
          return boolean;
        } catch (error) {
          console.warn(error);
        }
      }

      newCourseList = async (item) => {
        try {
          let courses = await this.getCourses();
          courses.push(item);
          await this.saveNewCourse(courses);
        } catch (error) {
          console.log(error)
        }
      }

      updateCourses = async (item) => {
        try {
          let courses = await this.getCourses();

          for(let i=0; i<courses.length; i++){
            if(courses[i].course_id == item.course_id){
              courses[i] = item;
            }
            await this.saveNewCourse(courses);
          }
        } catch (error) {
          console.warn(error);
        }
      }
}