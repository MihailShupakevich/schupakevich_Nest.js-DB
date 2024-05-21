import { Controller, Get, Post, Header, Param, Body, Delete, Put } from '@nestjs/common';
import { CreateTodoDto } from 'dto/Create-todo';
@Controller('Todo')
export class TodoController {
  @Post()
  @Header('Cache-Control', 'none') //Пользовательский заголок ответа
  async create(@Body() createTodoDto: CreateTodoDto) {
    return 'This action adds a new todo';
  }

  // @Get()
  // findAll(): string {
  //   return 'This action returns all cats';
  // }
  // @Get(':id')
  // findOne(@Param() params: any): string {
  //   console.log(params.id);
  //   return `This action returns a #${params.id} todo`;
  // }
  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} todo`;
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
  @Get()
  async findAll(): Promise<any[]> {
    return [];
  }
}
