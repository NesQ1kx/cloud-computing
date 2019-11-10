import React, { Component } from 'react';
import { Card, Icon, Button } from 'semantic-ui-react'

import { Group } from '../../Models';
import { StudentData } from '../../Services';
import { Link } from 'react-router-dom';
import { Autobind } from '../../Helpers/Autobind.decorator';

interface Props {
    group: Group;
    onDeleteGroup: (id: number) => void;
    onEditGroup: (id: number) => void;
}

export class GroupCard extends Component<Props> {
    private studentsDataService: StudentData;

    constructor(props: Props) {
        super(props);
        this.studentsDataService = StudentData.getInstance();
    }

    public render() {
        const students = this.studentsDataService.getStudents();
        let debtCount = 0;
        let summ = 0;
        let studentsCount = 0;
        students.forEach(x => {
            if (x.groupId === this.props.group.groupId) {
                studentsCount++;
                summ += x.avgScore;
                if (x.debtCount) {
                    debtCount++;
                }
            }
        });
        return (
            <Card>
                <Card.Content>
                    <Card.Header>{this.props.group.groupName}</Card.Header>
                    <Card.Meta>
                        <div>Форма обучения: {this.props.group.type}</div>
                        <div>Курс: {this.props.group.course}</div>
                        <div>Средний балл: {studentsCount ? summ / studentsCount : 0}</div>
                        <div>Должников: {debtCount}</div>
                    </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <Link to={`/groups/${this.props.group.groupId}`}>
                        <Icon name='user' />
                        {studentsCount} {this.rightPrefix(studentsCount)}
                    </Link>
                </Card.Content>
                <Card.Content extra>
                    <Button primary onClick={this.onEditGroup}>Редактировать</Button>
                    <Button color='red' onClick={this.onDeleteGroup}>Удалить</Button>    
                </Card.Content>
        </Card>
        )
    }

    private rightPrefix(count: number): string {
        if (count % 10 === 1) return 'Студент';
        if (count % 10 > 1 && count % 10 < 5) return 'Студента';
        return 'Студентов';
    }
    
    @Autobind
    private onDeleteGroup() {
        this.props.onDeleteGroup(this.props.group.groupId);
    }

    @Autobind
    private onEditGroup() {
        this.props.onEditGroup(this.props.group.groupId);
    }
}