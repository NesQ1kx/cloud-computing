import React, { Component } from 'react';
import { GroupData, StudentData } from '../../Services';
import { Table } from 'semantic-ui-react';
import { GroupStudentsTableRow } from '../GroupStudentsTableRow';

interface Props {
    match: any;
}

export class GroupInfo extends Component<Props> {
    private groupDataService: GroupData;
    private studentDataService: StudentData;

    constructor(props: Props) {
        super(props);
        this.groupDataService = GroupData.getInstance();
        this.studentDataService = StudentData.getInstance();        
    }
    public render() {
        const group = this.groupDataService.getGroupById(+this.props.match.params.id);
        const students = this.studentDataService.getStudentsByGroupId(+this.props.match.params.id);
        return (
            <div>
                <h3>{group!.groupName} {group!.course} курс</h3>
                <Table celled>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Ф.И.О</Table.HeaderCell>
                    <Table.HeaderCell>Возраст</Table.HeaderCell>
                    <Table.HeaderCell>Тип обучения</Table.HeaderCell>
                    <Table.HeaderCell>Средний балл</Table.HeaderCell>
                    <Table.HeaderCell>Задолженностей</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {students.map((student, i) => <GroupStudentsTableRow student={student} key={i}/>)}
                </Table.Body>
                </Table>
            </div>
        )
    }
}