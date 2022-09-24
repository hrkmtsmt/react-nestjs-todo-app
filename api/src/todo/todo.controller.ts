import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './dto/create-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  post(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.post(createTodoDto);
  }

  @Get()
  getAll() {
    return this.todoService.getAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.todoService.get(id);
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.patch(id, updateTodoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}
