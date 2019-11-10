import { BasicModal, BaseModalState, BaseModalProps } from "./BasicModal.component";
import { Group } from "../../Models";
import React from "react";
import { Form, Button } from "semantic-ui-react";
import { Autobind } from "../../Helpers/Autobind.decorator";

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
    onEditGroup: (group: Group) => void;
    group?: Group;
}

export class EditGroupModal extends BasicModal<Props, State> {
    public state: State = {
        formState: {
            groupName: this.props.group!.groupName,
            type: this.props.group!.type,
            course: this.props.group!.course + "",
        },
        isFormValid: !!this.props.group!.groupName && !!this.props.group!.type && !!this.props.group!.course
    }

    public modalBody() {
        const options = [
            {key: 1, text: "очная", value: "очная"},
            {key: 2, text: "заочная", value: "заочная"}
        ]
        
        return (
            <div>
                <Form>
                    <Form.Field>
                        <label>Название группы</label>
                        <input
                            type='text' 
                            value={this.state.formState.groupName}
                            onChange={(value: any) => this.onChangeValues('groupName', value)}
                            maxLength={5}
                        />
                    </Form.Field>
                    <Form.Select
                        fluid
                        label='Форма обучения'
                        options={options}
                        value={this.state.formState.type}
                        onChange={(value, data) => this.onChngeDdl(data)}
                    />
                    <Form.Field>
                        <label>Курс</label>
                        <input
                            type='number'
                            value={this.state.formState.course}
                            onChange={(value: any) => this.onChangeValues('course', value)}
                            maxLength={1}
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
                    onClick={this.onEditGroup}
                    disabled={!this.state.isFormValid}>
                    Сохранить
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
            isFormValid: !!data.groupName && !!data.type && !!data.course
        });
    }

    @Autobind
    private onChngeDdl(data: any) {
        const formData = { ...this.state.formState};
        formData["type"] = data.value;

        this.setState({
            formState: formData,
            isFormValid: !!formData.groupName && !!formData.type && !!formData.course
        });
    }

    @Autobind
    private onEditGroup() {
        const group: Group = {
            groupId: this.props.group!.groupId,
            groupName: this.state.formState.groupName,
            type: this.state.formState.type,
            course: +this.state.formState.course
        }
        this.props.onEditGroup(group);
    }
}