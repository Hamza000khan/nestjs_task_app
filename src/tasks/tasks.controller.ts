import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { GetClassFilterDto } from './dto/get-tasks-filter.dto';
import { ApiBody, ApiCreatedResponse, ApiParam } from '@nestjs/swagger'
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';



@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TasksController');
    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(
        @Query(ValidationPipe) filterDto: GetClassFilterDto,
        @GetUser() user:User,
        ): Promise<Task[]> {
        this.logger.verbose(`User ${user.username} retireving all tasks. Filters: ${JSON.stringify(filterDto)}`)
        return this.taskService.getTasks(filterDto, user)
    }

    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user:User): Promise<Task> {
        return this.taskService.getTaskById(id,user)

    }

    @Delete('/:id')
    deleteTask(
        @Param('id') id: number,
        @GetUser() user: User,
    ): Promise<void> {
        return this.taskService.deleteTask(id, user);
    };

    @Patch('/:id/status')
    @ApiBody({ type: Task })
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe,) status: TaskStatus,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.taskService.updateTaskStatus(id, status, user);
    };


    @Post()
    @UsePipes(ValidationPipe)
    @ApiBody({ type: Task })
    @ApiCreatedResponse({
        description: 'Task Creation'
    })
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
        ): Promise<Task> {
        this.logger.verbose(`User "${user.username}" creating new task. Data: ${JSON.stringify(createTaskDto)}"`)
        return this.taskService.createTask(createTaskDto, user)
    }
}
