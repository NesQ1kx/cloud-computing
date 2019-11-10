import React, { Component }from 'react';
import { Button } from 'semantic-ui-react';

import { GroupCard, EditGroupModal } from '../../Components';

import { GroupData } from '../../Services';
import { Group } from '../../Models';
import { AddGroupModal, ConfirmModal } from '../../Components';
import { Autobind } from '../../Helpers/Autobind.decorator';
import './Groups.page.scss';

interface State {
    groups: Group[];
    isModalOpen: boolean;
    isConfirmModalOpen: boolean;
    isEditModalOpen: boolean;
    groupIdForDelete?: number;
    groupIdForEdit?: number;
    groupForEdit?: Group;
}

export class Groups extends Component<State> {
    private groupDataService: GroupData;
    private readonly deleteGroupModalTitle = "Удаление группы";
    private readonly deleteGroupModalQuestion = "Вы действительно хотите удалить выбранную группу?";
    public state: State = {
        groups: [],
        isModalOpen: false,
        isConfirmModalOpen: false,
        isEditModalOpen: false
    };
    
    constructor(props: any) {
        super(props);
        this.groupDataService = GroupData.getInstance();
    }

    public componentDidMount() {
        this.setState( { groups: this.groupDataService.getGroups() });
    }

    public render() {
        return (
            <div>
                <div>
                <Button primary onClick={() => this.setState({ isModalOpen: true })}>Добавить группу</Button>
                </div>
                <div className="groups">
                    {this.state.groups.map((group, i) => 
                        <GroupCard
                            group={group}
                            key={i}
                            onDeleteGroup={this.onDeleteGroup}
                            onEditGroup={this.onEditGroup}
                        />
                    )}
                </div>
                <AddGroupModal
                    isModalOpen={this.state.isModalOpen}
                    title={"Добавить группу"}
                    handleClose={this.handleModalClose}
                    onAddGroup={this.onAddGroup}
                />
                {this.state.groupForEdit &&
                    (<EditGroupModal 
                    isModalOpen={this.state.isEditModalOpen}
                    title={"Редактировать группу"}
                    handleClose={this.handleModalClose}
                    onEditGroup={this.handleEdit}
                    group={this.state.groupForEdit}
                    />)}
                <ConfirmModal
                    isModalOpen={this.state.isConfirmModalOpen}
                    onNeagtiveAnswer={this.onNegativeConfirm}
                    onPositiveAnswer={this.onPositiveConfirm}
                    title={this.deleteGroupModalTitle}
                    question={this.deleteGroupModalQuestion}
                />
            </div>
        );
    }

    @Autobind
    private handleModalClose() {
        this.setState({
            isModalOpen: false,
            isEditModalOpen: false
        })
    }

    @Autobind
    public onAddGroup(group: Group) {
        const groups = [...this.state.groups, group]
        this.setState({ groups: groups }, () => this.groupDataService.addGroup(group));
        this.handleModalClose();
    }

    @Autobind
    public onDeleteGroup(groupId: number) {
        this.setState({
            isConfirmModalOpen: true,
            groupIdForDelete: groupId,
        });
    }
    
    @Autobind
    public onPositiveConfirm() {
        const groups = this.state.groups.filter(x => x.groupId !== this.state.groupIdForDelete);
        this.groupDataService.deleteGroup(this.state.groupIdForDelete!);
        this.setState({
            groups: groups,
            isConfirmModalOpen: false,
        });
    }

    @Autobind
    public onNegativeConfirm() {
        this.setState({ isConfirmModalOpen: false });
    }

    @Autobind
    public onEditGroup(id: number) {
        const group = this.groupDataService.getGroupById(id);
        this.setState({
            isEditModalOpen: true,
            groupIdForEdit: id,
            groupForEdit: group
        });
    }
    
    @Autobind
    public handleEdit(group: Group) {
        const groups = this.state.groups.map(x => {
            if (group.groupId === x.groupId) {
                return {
                    ...group
                };
            }
            
            return x;
        })
        this.setState({ groups, isEditModalOpen: false }, () => this.groupDataService.updateGroups(groups));
    }
}
