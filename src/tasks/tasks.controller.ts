import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiBody, ApiCreatedResponse, ApiParam } from '@nestjs/swagger'
import { GetClassFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';



@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto: GetClassFilterDto): Task[] {
    //     if (Object.keys(filterDto).length) {
    //         return this.taskService.getTasksWithFilter(filterDto);
    //     } else  {
    //         return this.taskService.getAllTasks();

    //     }
    // }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.getTaskById(id)

    }

    @Delete('/:id')
    deleteTask(@Param('id') id: number): Promise<void> {
        return this.taskService.deleteTask(id);
    };

    // @Patch('/:id/status')
    // editTask(@Param('id') id:string, 
    // @Body('status', TaskStatusValidationPipe) status:TaskStatus) {
    //     return this.taskService.updateTaskStatus(id,status);
    // };


    @Post()
    @UsePipes(ValidationPipe)
    @ApiBody({ type: Task })
    @ApiCreatedResponse({
        description: 'Task Creation'
    })
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(createTaskDto)


    }
}
