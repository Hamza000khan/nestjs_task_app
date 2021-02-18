import { TaskStatus } from "../task.model";

export class GetClassFilterDto {
    status: TaskStatus;
    search: string;

};