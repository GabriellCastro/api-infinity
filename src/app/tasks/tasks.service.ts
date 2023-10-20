import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';
import { TaskRepository } from '~/repositories/task.abstract';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository<TaskEntity>) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const task = await this.taskRepository.create(createTaskDto);

    if (!task) {
      throw new HttpException('Tarefa não criada!', HttpStatus.BAD_REQUEST);
    }

    return task;
  }

  async findAll(userId: string): Promise<TaskEntity[]> {
    const tasks = await this.taskRepository.findAll(userId);

    if (!tasks) {
      throw new HttpException('Tarefas não encontradas!', HttpStatus.NOT_FOUND);
    }

    return tasks;
  }

  async findOne(id: string): Promise<any> {
    if (!id) {
      throw new HttpException('Id não informado!', HttpStatus.BAD_REQUEST);
    }

    const task = await this.taskRepository.find(id);

    if (!task) {
      throw new HttpException('Tarefa não encontrada!', HttpStatus.NOT_FOUND);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    if (!id) {
      throw new HttpException('Id não informado!', HttpStatus.BAD_REQUEST);
    }

    const task = await this.taskRepository.update(updateTaskDto, id);

    if (!task) {
      throw new HttpException('Tarefa não atualizada!', HttpStatus.BAD_REQUEST);
    }

    return task;
  }

  async remove(id: string, creatorId: string) {
    if (!id) {
      throw new HttpException('Id não informado!', HttpStatus.BAD_REQUEST);
    }
    if (!creatorId) {
      throw new HttpException(
        'Id do criador não informado!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const task = await this.taskRepository.find(id);

    if (!task) {
      throw new HttpException('Tarefa não encontrada!', HttpStatus.NOT_FOUND);
    }

    if (task.creatorId !== creatorId) {
      throw new HttpException(
        'Usuário não autorizado!',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return await this.taskRepository.delete(id);
  }
}
