import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { TaskEntity } from '../entities/task.entity';

export class UpdateTaskDto extends PartialType<TaskEntity>(CreateTaskDto) {}
