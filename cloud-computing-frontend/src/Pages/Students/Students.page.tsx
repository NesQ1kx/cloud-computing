import React, { Component }from 'react';
import { Table, Button } from 'semantic-ui-react';

import { StudentData } from '../../Services';
import { Student } from '../../Models';

import './Students.page.scss';
import { AllStudentsTableRow, ConfirmModal, EditStudentModal } from '../../Components';
import { AddStudentModal } from '../../Components/Modal/AddStudentModal.component';
import { Autobind } from '../../Helpers/Autobind.decorator';

interface State {
  students: Student[];
  isAddStudentModalOpen: boolean;
  isConfirmModalOpen: boolean;
  isEditStudentModalOpen: boolean;
  studentIdForDelete?: number;
  studentIdForEdit?: number;
  studentForEdit?: Student;
}

export class Students extends Component<State> {
  private studentDataService: StudentData;
  private readonly deleteStudentModalTitle = "Удаление студента"
  private readonly deleteStudentModalQuestion = "Вы действительно хотите удалить выбранного студента?";
  public state: State = {
    students: [],
    isAddStudentModalOpen: false,
    isConfirmModalOpen: false,
    isEditStudentModalOpen: false,
  }

  constructor(props: any) {
    super(props);
    this.studentDataService = StudentData.getInstance();
  }
  
  public componentDidMount() {
    this.setState({ students: this.studentDataService.getStudents() });
  }

  public render() {
    return (
      <div className="students">
        <Button primary onClick={() => this.setState({ isAddStudentModalOpen: true })}>Добавить студента</Button>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Ф.И.О</Table.HeaderCell>
              <Table.HeaderCell>Группа</Table.HeaderCell>
              <Table.HeaderCell>Курс</Table.HeaderCell>
              <Table.HeaderCell>Возраст</Table.HeaderCell>
              <Table.HeaderCell>Тип обучения</Table.HeaderCell>
              <Table.HeaderCell>Средний балл</Table.HeaderCell>
              <Table.HeaderCell>Задолженностей</Table.HeaderCell>
              <Table.HeaderCell>Действия</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.students.map((student, i) => 
              <AllStudentsTableRow
                student={student}
                key={i}
                onDeleteStudent={this.onDeleteStudent}
                handleEditClick={this.handleEditClick}
              />)}
          </Table.Body>
        </Table>
        <AddStudentModal
            isModalOpen={this.state.isAddStudentModalOpen}
            title="Добавить студента"
            onAddStudent={this.onAddStudent}
            handleClose={this.handleModalClose}
        />
        {this.state.studentForEdit && (
          <EditStudentModal
          isModalOpen={this.state.isEditStudentModalOpen}
          title="Редактировать студента"
          handleClose={this.handleModalClose}
          onEditStudent={this.onEditStudent}
          student={this.state.studentForEdit}
        />
        )}
        <ConfirmModal
          isModalOpen={this.state.isConfirmModalOpen}
          onNeagtiveAnswer={this.onNegativeConfirm}
          onPositiveAnswer={this.onPositiveConfirm}
          title={this.deleteStudentModalTitle}
          question={this.deleteStudentModalQuestion}
          />
      </div>
    );
  }

  @Autobind
  public onAddStudent(student: Student) {
      const students = [...this.state.students, student]
      this.setState({ students: students });
      this.studentDataService.addStudent(student);
      this.handleModalClose();
  }

  @Autobind
  private handleModalClose() {
      this.setState({
        isAddStudentModalOpen: false,
        isEditStudentModalOpen: false
      })
  }

  @Autobind
  public onNegativeConfirm() {
    this.setState({ isConfirmModalOpen: false });
  }

  @Autobind
  public onDeleteStudent(studentId: number) {
      this.setState({
          isConfirmModalOpen: true,
          studentIdForDelete: studentId,
      });
  }

  @Autobind
  public onPositiveConfirm() {
      const students = this.state.students.filter(x => x.studentId !== this.state.studentIdForDelete);
      this.studentDataService.deleteStudent(this.state.studentIdForDelete!);
      this.setState({
          students: students,
          isConfirmModalOpen: false,
      });
  }

  @Autobind
  public handleEditClick(id: number) {
    const student = this.studentDataService.getStudentById(id);
    this.setState({
      isEditStudentModalOpen: true,
      studentIdForEdit: id,
      studentForEdit: student
    });
  }

  @Autobind
  public onEditStudent(student: Student) {
    const students = this.state.students.map(x => {
      if (student.studentId === x.studentId) {
        return {
          ...student
        }
      }

      return x;
    })

    this.setState({ students, isEditStudentModalOpen: false }, () => this.studentDataService.updateStudents(students));
  }
}
