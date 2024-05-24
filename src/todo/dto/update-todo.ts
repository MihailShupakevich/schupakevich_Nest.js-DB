import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @Length(1, 256)
  @IsOptional()
  text?: string;

  @IsBoolean()
  @IsOptional()
  isChecked?: boolean;
}
