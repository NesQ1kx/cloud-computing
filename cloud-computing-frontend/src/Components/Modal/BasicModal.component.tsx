import React, { Component } from "react";

import { Modal } from "semantic-ui-react";

import './BasicModal.component.scss';

export interface BaseModalProps {
    isModalOpen: boolean;
    title: string;
    handleClose: () => void;
}

export interface BaseModalState {}

export abstract class BasicModal<P extends BaseModalProps = BaseModalProps, S extends BaseModalState = BaseModalState> extends Component<P, S> {
    public render() {
        return (
            <Modal
                size='mini'
                open={this.props.isModalOpen}
                onClose={this.props.handleClose}
            >
                <Modal.Header>{this.props.title}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                       {this.modalBody()}
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {this.modalActions()}
                </Modal.Actions>
            </Modal>
        )
    }

    public abstract modalBody(): any;
    public abstract modalActions(): any
}