import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { CreateTodoDto, UpdateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async getAll(): Promise<Array<Todo>> {
    return await this.todoRepository.find();
  }

  async get(id: string): Promise<Todo> {
    return await this.todoRepository.findOneBy({ id });
  }

  async post(createTodoDto: CreateTodoDto): Promise<InsertResult> {
    return await this.todoRepository.insert(createTodoDto);
  }

  async patch(id: string, updateTodoDto: UpdateTodoDto) {
    return await this.todoRepository.update(id, updateTodoDto);
  }

  async delete(id: string) {
    return await this.todoRepository.delete(id);
  }
}
