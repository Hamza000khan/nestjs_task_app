import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetClassFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository) 
        private taskRepository: TaskRepository,
        ) {};
    // getAllTasks() {
    //     return this.tasks;
    // };

    // getTasksWithFilter(filterDto: GetClassFilterDto): Task[] {
    //     const { status, search } = filterDto;

    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }

    //     if (search) {
    //         tasks = tasks.filter(task => 
    //         task.title.includes(search) || task.description.includes(search),
    //         ); 
    //     }
    //     return tasks
    // };

    async getTaskById(id:number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
    if (!found) {
        throw new NotFoundException(`Task with "${id}" not found`);
    }
    return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }


    // updateTaskStatus(id:string, status:TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task 
        
    // };


    // deleteTask(id:string):void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== found.id);
    // };


}
