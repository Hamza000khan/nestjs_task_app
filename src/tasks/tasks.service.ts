import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { resourceLimits } from 'worker_threads';
import { GetClassFilterDto } from './dto/get-tasks-filter.dto'
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) { };


    // Get Task with filters and Get all tasks
    async getTasks(
        filterDto: GetClassFilterDto,
        user: User,
        ): Promise<Task[]> {
        return this.taskRepository.getTask(filterDto, user);

    }


    // Get task by Id
    async getTaskById(
        id: number,
        user: User,
        ): Promise<Task> {
        const found = await this.taskRepository.findOne({ where: { id, userId: user.id }});
        if (!found) {
            throw new NotFoundException(`Task with "${id}" not found`);
        }
        return found;
    }

    // Create task service
    async createTask(
        createTaskDto: CreateTaskDto,
        user: User,
        ): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    // Update task service
    async updateTaskStatus(
        id: number, 
        status: TaskStatus,
        user: User
        ): Promise<Task> {
        const task = await this.getTaskById(id, user);
        task.status = status;
        await task.save();
        return task

    };

    // Delete task service
    async deleteTask(
        id: number,
        user: User,
        ): Promise<void> {
        const found = await this.taskRepository.delete({id, userId: user.id});
        if (found.affected === 0) {
            throw new NotFoundException(`Task with "${id}" not found`);
        }
    };

}
