import { Injectable } from '@nestjs/common';
import db from 'src/db/drizzle.connection';
import CreateTaskDTO from 'src/schema-validations/tasks';
import tasksSchema from 'src/db/schemas/tasks';
import { pagination } from 'src/types/data.types';

@Injectable()
export class TasksService {
  db: any;
  constructor() {
    this.db = db;
  }
  async saveTask(createTaskDTO: CreateTaskDTO): Promise<CreateTaskDTO> {
    return await this.db.insert(tasksSchema).values(createTaskDTO).returning();
  }

  async getTasksDetails(params: pagination): Promise<CreateTaskDTO[]> {
    const { skip, limit, search_string } = params;
    return await this.db
      .select()
      .from(tasksSchema)
      .limit(limit)
      .offset(skip)
      .where('name', 'ilike', `%${search_string}%`);
  }

  async getTaskById(id: string): Promise<CreateTaskDTO> {
    return await this.db.select().from(tasksSchema).where('id', id);
  }

  async updateTask(createTaskDTO: CreateTaskDTO) {
    return await this.db
      .update(tasksSchema)
      .set(createTaskDTO)
      .where('id', createTaskDTO.id)
      .returning();
  }
}
