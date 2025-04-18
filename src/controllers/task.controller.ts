import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { TaskService } from "../services/task.service";
import { Task } from "../models/task.entity";
import { ApiResponse, ApiBody } from "@nestjs/swagger";
import { CreateTaskDto } from "src/dto/create-task.dto";
import { UpdateTaskDto } from "src/dto/update-task.dto";

@Controller("tasks")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: "Task created" })
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      return await this.taskService.createTask(createTaskDto);
    } catch (error: any) {
      throw new BadRequestException("Error creating task: " + error.message);
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: "List of tasks" })
  async getTasks(): Promise<Task[]> {
    try {
      return await this.taskService.getTasks();
    } catch (error: any) {
      throw new BadRequestException("Error fetching tasks: " + error.message);
    }
  }

  @Get(":id")
  @ApiResponse({ status: 200, description: "Task details" })
  async getTaskById(@Param("id") id: number): Promise<Task | null> {
    const task = await this.taskService.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  @Put(":id")
  @ApiResponse({ status: 200, description: "Task updated" })
  async updateTask(
    @Param("id") id: number,
    @Body() body: UpdateTaskDto
  ): Promise<Task | null> {
    const task = await this.taskService.updateTask(id, body);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  @Delete(":id")
  @ApiResponse({ status: 200, description: "Task deleted" })
  async deleteTask(@Param("id") id: number): Promise<boolean> {
    const result = await this.taskService.deleteTask(id);
    if (!result) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return result;
  }
}
