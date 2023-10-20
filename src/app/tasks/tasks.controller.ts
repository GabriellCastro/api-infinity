import { Controller, Param, Body, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, CreateTaskResponseData } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Get, Post, Patch } from '~/common/decorators/http-methods';
import { HttpConflictExceptionEntity } from '~/filters/http/entities/http-conflict-exception';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create', { createdType: CreateTaskResponseData })
  @ApiCreatedResponse({ type: CreateTaskResponseData })
  @ApiConflictResponse({
    description: 'Erro ao criar tarefa!',
    type: HttpConflictExceptionEntity,
  })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get('all/:userId', { okType: CreateTaskResponseData })
  @ApiConflictResponse({
    description: 'Erro ao buscar tarefas!',
    type: HttpConflictExceptionEntity,
  })
  findAll(@Param('userId') userId: string) {
    return this.tasksService.findAll(userId);
  }

  @Get(':id', { okType: CreateTaskResponseData })
  @ApiConflictResponse({
    description: 'Erro ao buscar tarefa!',
    type: HttpConflictExceptionEntity,
  })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id', { schema: { patternProperties: UpdateTaskDto } })
  @ApiConflictResponse({
    description: 'Erro ao atualizar tarefa!',
    type: HttpConflictExceptionEntity,
  })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id/:creatorId')
  remove(@Param('id') id: string, @Param('creatorId') creatorId: string) {
    return this.tasksService.remove(id, creatorId);
  }
}
