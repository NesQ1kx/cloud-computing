import React, { Component } from 'react';
import { Student } from '../../Models';
import { Table } from 'semantic-ui-react';

interface Props {
    student: Student;
}

export class GroupStudentsTableRow extends Component<Props> {
    public render() {
        return (
            <Table.Row className="row">
                <Table.Cell>{this.props.student.name}</Table.Cell>
                <Table.Cell>{this.props.student.age}</Table.Cell>
                <Table.Cell>{this.props.student.educationType}</Table.Cell>
                <Table.Cell>{this.props.student.avgScore}</Table.Cell>
                <Table.Cell>{this.props.student.debtCount}</Table.Cell>
            </Table.Row>
        )
    }
}