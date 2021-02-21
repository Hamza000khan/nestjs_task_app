import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { resourceLimits } from 'worker_threads';
import { GetClassFilterDto } from './dto/get-tasks-filter.dto'
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) { };


    // Get Task with filters and Get all tasks
    async getTasks(filterDto: GetClassFilterDto): Promise<Task[]> {
        return this.taskRepository.getTask(filterDto);

    }


    // Get task by Id
    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with "${id}" not found`);
        }
        return found;
    }

    // Create task service
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    // Update task service
    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task

    };

    // Delete task service
    async deleteTask(id: number): Promise<void> {
        const found = await this.taskRepository.delete(id);
        if (found.affected === 0) {
            throw new NotFoundException(`Task with "${id}" not found`);
        }
    };

}
