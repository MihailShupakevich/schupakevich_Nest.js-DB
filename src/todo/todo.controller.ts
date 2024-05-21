import { Controller, Get, Post, Header, Param } from '@nestjs/common';

@Controller('Todo')
export class TodoController {
  @Post()
  @Header('Cache-Control', 'none') //Пользовательский заголок ответа
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
  // @Get(':id')
  // findOne(@Param() params: any): string {
  //   console.log(params.id);
  //   return `This action returns a #${params.id} todo`;
  // }
  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} todo`;
  }
}
