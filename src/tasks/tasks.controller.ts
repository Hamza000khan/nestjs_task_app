import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger'
import { GetClassFilterDto } from './dto/get-tasks-filter.dto';



@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){}

    @Get()
    getTasks(@Query() filterDto: GetClassFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.taskService.getTasksWithFilter(filterDto);
        } else  {
            return this.taskService.getAllTasks();

        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string): Task {
        return this.taskService.getTaskById(id)

    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string) {
        this.taskService.deleteTask(id);
    };

    @Patch('/:id/status')
    editTask(@Param('id') id:string, @Body('status') status:TaskStatus) {
        return this.taskService.updateTaskStatus(id,status);
    };


    @Post()
    @ApiBody({type: Task})
    @ApiCreatedResponse({
        description: 'Task Creation'
    })
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(createTaskDto)


    }
}
