import { Project } from "./project.model";
import { User_story } from "./user_story.model";

export class Sprint {
    constructor(
        public days: number,
        public comment: string,
        public updatedAt: Date,
        public createdAt: Date,
        public project_id: Number,
        public user_stories?: User_story[],
        public project?: Project,
        public id?: number,
    ) { }
}
