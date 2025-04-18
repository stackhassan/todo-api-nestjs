import { IsString, IsEnum, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { TaskStatus } from "src/enums/status.enum";
import { TaskPriority } from "src/enums/priority.enum";
export class UpdateTaskDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    enum: TaskPriority,
    example: TaskPriority.Yellow,
    required: false,
  })
  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.InProgress,
    required: false,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
