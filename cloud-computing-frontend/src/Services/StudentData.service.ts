import { Student } from './../Models/Student.model';
import { mockStudents } from './../Constants/mockStudents';

export class StudentData {
    private static instance: StudentData;
    private constructor () {};
    private students: Student[] = mockStudents;

    static getInstance() {
        if (!StudentData.instance) {
            StudentData.instance = new StudentData();
        }

        return StudentData.instance;
    }

    public getStudents() {
        return this.students;
    }

    public addStudent(student: Student) {
        this.students.push(student);
        // TODO: server request
    }

    public getStudentsByGroupId(id: number) {
        return this.students.filter(x => x.groupId === id);
    }

    public deleteStudent(id: number) {
        this.students = this.students.filter(x => x.studentId !== id);
        // TODO: server request
    }

    public getStudentById(id: number) {
        return this.students.find(x => x.studentId === id);
    }

    public updateStudents(students: Student[]) {
        this.students = students;
    }
}