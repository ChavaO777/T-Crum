import { User_story } from "./user_story.model";
import { User } from "./user.model";

export class Task {
    constructor(
		public duration: number,
		public name: string,
		public completed: boolean,
		public user_story_id?: number,
		public user_story?: User_story,
		public users?: User[],
        public id?: number,
    ) { }
}