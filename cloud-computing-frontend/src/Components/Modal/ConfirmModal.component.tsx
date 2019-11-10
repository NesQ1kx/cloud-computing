import React, { Component } from 'react';
import { Modal, Button } from 'semantic-ui-react';

interface Props {
    title: string;
    question: string;
    isModalOpen: boolean;
    onPositiveAnswer: () => void;
    onNeagtiveAnswer: () => void;
}

export class ConfirmModal extends Component<Props> {
   public render() {
       return (
            <Modal
            size='mini'
            open={this.props.isModalOpen}
            onClose={this.props.onNeagtiveAnswer}
            >
            <Modal.Header>{this.props.title}</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    {this.props.question}
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='green' onClick={this.props.onPositiveAnswer}>Да</Button>
                <Button color='red' onClick={this.props.onNeagtiveAnswer}>Нет</Button>
            </Modal.Actions>
        </Modal>
       )
   }
}