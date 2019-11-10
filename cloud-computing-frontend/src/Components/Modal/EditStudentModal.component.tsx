import React from 'react';

import { BasicModal, BaseModalProps, BaseModalState } from "./BasicModal.component";
import { Student } from "../../Models";
import { Form, Button } from 'semantic-ui-react';
import { Autobind } from '../../Helpers/Autobind.decorator';
import { GroupData } from '../../Services';

interface FormState {
    name: string;
    avgScore: string;
    educationType: string;
    age: string;
    debtCount: string;
    groupId: string;
}

interface Props extends BaseModalProps {
    onEditStudent: (student: Student) => void;
    student?: Student;
}

interface State extends BaseModalState {
    formState: FormState;
}

export class EditStudentModal extends BasicModal<Props, State> {
    public state: State = {
        formState: {
            name: this.props.student!.name,
            avgScore: this.props.student!.avgScore + "",
            educationType: this.props.student!.educationType,
            age: this.props.student!.age + "",
            debtCount: this.props.student!.debtCount + "",
            groupId: this.props.student!.groupId + ""
        }
    };
    public groupDataService: GroupData;

    constructor(props: Props) {
        super(props);
        this.groupDataService = GroupData.getInstance();
    }

    public modalBody() {
        let options: any[] = [];
        const educationType = [
            { key: 1, text: "Комерция", value: "Коммерция"},
            { key: 2, text: "Бюджет", value: "Бюджет"}
        ];
        this.groupDataService.getGroups().forEach(x => options.push({ key: x.groupId, text: `${x.groupName} ${x.course} курс`, value: x.groupId }));
        return (
            <div>
                <Form>
                    <Form.Field>
                        <label>Ф.И.О</label>
                        <input 
                            type='text' 
                            value={this.state.formState.name}
                            onChange={(value: any) => this.onChangeValues('name', value)}
                        />
                    </Form.Field>
                    <Form.Select
                        fluid
                        label='Группа'
                        options={options}
                        value={this.state.formState.groupId}
                        onChange={(value, data) => this.onChngeDdl("groupId", data)}
                    />
                    <Form.Field>
                        <label>Средний балл</label>
                        <input 
                            type='number' 
                            value={this.state.formState.avgScore}
                            onChange={(value: any) => this.onChangeValues('avgScore', value)}
                        />
                    </Form.Field>
                    <Form.Select
                        fluid
                        label='Тип обучения'
                        options={educationType}
                        value={this.state.formState.educationType}
                        onChange={(value, data) => this.onChngeDdl("educationType", data)}
                    />
                    <Form.Field>
                        <label>Возраст</label>
                        <input 
                            type='number' 
                            value={this.state.formState.age}
                            onChange={(value: any) => this.onChangeValues('age', value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Кол-во задолженностей</label>
                        <input 
                            type='number' 
                            value={this.state.formState.debtCount}
                            onChange={(value: any) => this.onChangeValues('debtCount', value)}
                        />
                    </Form.Field>
                </Form>
            </div>
        )
    }

    public modalActions() {
        return (
            <div>
                <Button color='green' onClick={this.onEditStudent}>Сохранить</Button>
                <Button color='red' onClick={this.props.handleClose}>Закрыть</Button>
            </div>
        )
    }

    @Autobind
    private onChangeValues(field: keyof FormState, event: any) {
        const data = { ...this.state.formState };
        data[field] = event.target.value;

        this.setState({
            formState: data
        });
    }

    @Autobind
    private onChngeDdl(field: keyof FormState, data: any) {
        const formData = { ...this.state.formState };
        formData[field] = data.value

        this.setState({
            formState: formData
        });
    }

    @Autobind
    private onEditStudent() {
        let student: Student = {
            studentId: this.props.student!.studentId,
            name: this.state.formState.name,
            avgScore: +this.state.formState.avgScore,
            educationType: this.state.formState.educationType,
            age: +this.state.formState.age,
            groupId: +this.state.formState.groupId,
            debtCount: +this.state.formState.debtCount
        }

        this.props.onEditStudent(student);
    }

}