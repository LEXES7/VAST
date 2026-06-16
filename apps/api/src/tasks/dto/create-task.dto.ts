import { IsDateString, IsEnum, IsOptional, MaxLength, MinLength } from "class-validator";
import { TaskStatus } from "@vast/db";

export class CreateTaskDto {
  @MinLength(1)
  @MaxLength(200)
  title!: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
