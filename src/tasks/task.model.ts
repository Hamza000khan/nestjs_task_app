import { ApiProperty } from '@nestjs/swagger'


export class Task {
    id: string;
    @ApiProperty({type: String, description:'Input Title'})
    title: string;
    @ApiProperty({type: String, description:'Input Description'})
    description: string;
    status: TaskStatus;
}

export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}