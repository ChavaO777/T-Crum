import { Technology } from "./technology.model";
import { Sprint } from "./sprint.model";
import { User } from "./user.model";

export class Project {
    constructor(
        public vision: string,
        public name: string,
        public begin_date: Date,
        public end_date: Date,
        public background: string,
        public risks: string,
        public reach: string,
        public scrum_master_id: string,
        public scrum_master?: User,
        public updatedAt?: Date,
        public createdAt?: Date,
        public sprints?: Sprint[],
        public users?: User[],
        public technologies?: Technology[],
        public id?: number,
    ) { }
}
