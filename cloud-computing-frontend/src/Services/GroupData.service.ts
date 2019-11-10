import { mockGroups } from './../Constants/mockGroups';
import { Group } from "../Models";

export class GroupData {
    private static instance: GroupData;
    private constructor () {};
    private groups: Group[] = mockGroups;

    static getInstance() {
        if (!GroupData.instance) {
            GroupData.instance = new GroupData();
        }
        
        return GroupData.instance;
    }

    private fetchGroups() {
        this.groups = mockGroups;
    }

    public getGroups() {
        return this.groups;
    }

    public getGroupById(id: number) {
        return this.groups.find(x => x.groupId === id);
    }

    public deleteGroup(id: number) {
        this.groups = this.groups.filter(x => x.groupId !== id);
        // TODO: server request
    }

    public addGroup(group: Group) {
        this.groups.push(group);
    }

    public updateGroups(groups: Group[]) {
        this.groups = groups;
    }
}