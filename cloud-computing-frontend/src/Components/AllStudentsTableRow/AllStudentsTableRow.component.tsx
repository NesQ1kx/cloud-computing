import React, { Component } from 'react';
import { Student } from '../../Models';
import { Table, Button } from 'semantic-ui-react';
import { GroupData } from '../../Services';
import { Autobind } from '../../Helpers/Autobind.decorator';

interface Props {
    student: Student
    onDeleteStudent: (studentId: number) => void;
    handleEditClick: (studentId: number) => void;
}

export class AllStudentsTableRow extends Component<Props> {
    public groupDataService: GroupData;

    constructor(props: Props) {
        super(props);
        this.groupDataService = GroupData.getInstance();
    }

    public render() {
        const group = this.groupDataService.getGroupById(this.props.student.groupId);
        return (
            <Table.Row className="row">
                <Table.Cell>{this.props.student.name}</Table.Cell>
                <Table.Cell>{(group && group!.groupName) || "Не определено"}</Table.Cell>
                <Table.Cell>{(group && group!.course) || "Не определено"}</Table.Cell>
                <Table.Cell>{this.props.student.age}</Table.Cell>
                <Table.Cell>{this.props.student.educationType}</Table.Cell>
                <Table.Cell>{this.props.student.avgScore}</Table.Cell>
                <Table.Cell>{this.props.student.debtCount}</Table.Cell>
                <Table.Cell>
                    <Button size="small" color="red" onClick={this.onDeleteStudent}>Удалить</Button>
                    <Button size="small" color="blue" onClick={this.handleEditClick}>Редактировать</Button>
                </Table.Cell>
            </Table.Row>
        )
    }

    @Autobind
    private onDeleteStudent() {
        this.props.onDeleteStudent(this.props.student.studentId);
    }

    @Autobind
    private handleEditClick() {
        this.props.handleEditClick(this.props.student.studentId);
    }
}