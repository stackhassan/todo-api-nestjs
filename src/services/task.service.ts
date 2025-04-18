import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "../models/task.entity";
import { CreateTaskDto } from "src/dto/create-task.dto";
import { UpdateTaskDto } from "src/dto/update-task.dto";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ) {}

  async createTask(dto: CreateTaskDto): Promise<Task> {
    try {
      const task = this.taskRepository.create({
        name: dto.name,
        dueDate: dto.dueDate,
        priority: dto.priority,
        status: dto.status || "Pending",
        dateOfCreation: new Date(),
        isActive: true,
      });
      return await this.taskRepository.save(task);
    } catch (error: any) {
      throw new BadRequestException("Error creating task: " + error.message);
    }
  }

  async getTasks(
    page: number = 1,
    limit: number = 10,
    filters: any = {}
  ): Promise<Task[]> {
    const queryBuilder = this.taskRepository.createQueryBuilder("task");

    if (filters.status) {
      queryBuilder.andWhere("task.status = :status", {
        status: filters.status,
      });
    }
    if (filters.priority) {
      queryBuilder.andWhere("task.priority = :priority", {
        priority: filters.priority,
      });
    }

    queryBuilder.skip((page - 1) * limit).take(limit);

    try {
      return await queryBuilder.getMany();
    } catch (error: any) {
      throw new BadRequestException("Error fetching tasks: " + error.message);
    }
  }

  async getTaskById(id: number): Promise<Task | null> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async updateTask(id: number, updates: UpdateTaskDto): Promise<Task | null> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    await this.taskRepository.update(id, updates);
    return this.getTaskById(id);
  }

  async deleteTask(id: number): Promise<boolean> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return true;
  }
}
