import React from 'react';
import { Form, Button } from 'semantic-ui-react';

import { BasicModal, BaseModalProps, BaseModalState } from "./BasicModal.component";
import { Autobind } from '../../Helpers/Autobind.decorator';
import { Group } from '../../Models';

interface FormState {
    groupName: string;
    type: string;
    course: string;
}

interface State extends BaseModalState {
    formState: FormState;
    isFormValid: boolean;
}

interface Props extends BaseModalProps {
    onAddGroup: (group: Group) => void;
}

const initialState: State = {
    formState: {
        groupName: "",
        type: "",
        course: "",
    },
    isFormValid: false,
}

export class AddGroupModal extends BasicModal<Props, State> {
    public state: State = initialState;

    public modalBody() {
        const options = [
            {key: 1, text: "очная", value: "очная"},
            {key: 2, text: "заочная", value: "заочная"}
        ]
        return (
           <div>
                <Form>
                    <Form.Field required>
                        <label>Название группы</label>
                        <input 
                            className="error"
                            type='text' 
                            value={this.state.formState.groupName}
                            onChange={(value: any) => this.onChangeValues('groupName', value)}
                        />
                    </Form.Field>
                    <Form.Select
                        required
                        fluid
                        label='Форма обучения'
                        options={options}
                        value={this.state.formState.type}
                        onChange={(value, data) => this.onChngeDdl(data)}
                    />
                    <Form.Field required>
                        <label>Курс</label>
                        <input
                            type='number'
                            value={this.state.formState.course}
                            onChange={(value: any) => this.onChangeValues('course', value)}
                        />
                    </Form.Field>
                </Form>
           </div>
        )
    }

    public modalActions() {
        return (
            <div>
                <Button
                    color='green'
                    onClick={this.onAddGroup}
                    disabled={!this.state.isFormValid}>
                    Добавить
                </Button>
                <Button color='red' onClick={this.props.handleClose}>Закрыть</Button>
            </div>
        )
    }

    @Autobind
    private onChangeValues(field: keyof FormState, event: any) {
        const data = { ...this.state.formState };
        data[field] = event.target.value;

        this.setState({
            formState: data,
            isFormValid: !!data.groupName && !!data.course && !!data.type,
        });
    }

    @Autobind
    private onChngeDdl(data: any) {
        const formData = { ...this.state.formState};
        formData["type"] = data.value;

        this.setState({
            formState: formData,
            isFormValid: !!formData.groupName && !!formData.course && !!formData.type,
        });
    }

    @Autobind
    private onAddGroup() {
        const group: Group = {
            groupName: this.state.formState.groupName,
            groupId: 5,
            type: this.state.formState.type,
            course: +this.state.formState.course
        }
        this.state = initialState;
        this.props.onAddGroup(group);
    }
}