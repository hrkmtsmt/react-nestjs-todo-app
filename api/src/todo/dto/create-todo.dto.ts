import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;
}

export class UpdateTodoDto {
  @IsString()
  title?: string;

  @IsString()
  body?: string;

  @IsNotEmpty()
  @IsBoolean()
  isCompleted: boolean;
}
