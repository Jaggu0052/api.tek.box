import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import CreateTaskDTO from 'src/schema-validations/tasks';
import {
  errorResponseObj,
  pagination,
  responseObj,
} from 'src/types/data.types';
import {
  TASK_BY_ID_ERROR,
  TASK_DETAILS_FATCHED_ERROR,
  TASK_DETAILS_FATCHED_SUCSSESS,
  TASK_SAVE_FAILED,
  TASK_SAVED_SUCCESS,
  TASK_UPDATED_ERROR,
  TASK_UPDATED_SUCCESS,
  TASKS_NOT_FOUND,
} from 'src/messages/messages';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  tasksService: TasksService;
  constructor(private readonly _tasksService: TasksService) {
    this.tasksService = _tasksService;
  }

  @Post('save-task')
  async saveTask(@Body() createTaskDTO: CreateTaskDTO, @Res() res) {
    try {
      const data = await this.tasksService.saveTask(createTaskDTO);
      const responseObj: responseObj = {
        statusCode: 201,
        message: TASK_SAVED_SUCCESS,
        data: data,
        success: true,
      };
      return res.status(201).json(responseObj);
    } catch (err) {
      console.log(err);
      if (err?.response?.statusCode == 400) {
        const errorResponseObj: errorResponseObj = {
          statusCode: 400,
          error: 'Bad Request',
          message: err?.response?.statusMessage,
          timestamp: new Date().toISOString(),
          path: '/tasks/save-task',
        };
        throw res.status(400).json(errorResponseObj);
      }
      throw Object.assign(
        new Error(`${TASK_SAVE_FAILED} ${err?.response?.statusMessage}`),
        {
          statusCode: err?.response?.statusCode,
        },
      );
    }
  }
  @Get('task-details')
  async getTaskDetails(@Param() params: pagination, @Res() res) {
    try {
      const data = await this.tasksService.getTasksDetails(params);
      const responseObj: responseObj = {
        statusCode: 204,
        message:
          data?.length == 0 ? TASKS_NOT_FOUND : TASK_DETAILS_FATCHED_SUCSSESS,
        data: data,
        success: data?.length == 0 ? false : true,
      };
      if (data?.length == 0) {
        return res.status(204).json(responseObj);
      }
      return res.status(200).json(responseObj);
    } catch (err) {
      throw Object.assign(
        new Error(
          `${TASK_DETAILS_FATCHED_ERROR} ${err?.response?.statusMessage}`,
        ),
        {
          statusCode: err?.response?.statusCode,
        },
      );
    }
  }

  @Get('getbyid/:id')
  async getTaskById(@Param('id') id: string, @Res() res) {
    try {
      const data = await this.tasksService.getTaskById(id);
      const responseObj: responseObj = {
        statusCode: 204,
        message:
          data?.id == null || data?.id == undefined
            ? TASKS_NOT_FOUND
            : TASK_DETAILS_FATCHED_SUCSSESS,
        data: data,
        success: data?.id == 0 ? false : true,
      };
      if (data?.id == 0) {
        return res.status(204).json(responseObj);
      }
      return res.status(200).json(responseObj);
    } catch (err) {
      throw Object.assign(
        new Error(`${TASK_BY_ID_ERROR} ${err?.response?.statusMessage}`),
        {
          statusCode: err?.response?.statusCode,
        },
      );
    }
  }

  @Put('update-task')
  async updateTask(@Body() createTaskDTO: CreateTaskDTO, @Res() res) {
    try {
      if (!createTaskDTO?.id || createTaskDTO?.uuid) {
        throw Object.assign({
          message: 'TaskId is Required!',
          statusCode: 400,
          error: 'Bad Request',
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const data = await this.tasksService.updateTask(createTaskDTO);
      const responseObj: responseObj = {
        statusCode: 204,
        message: TASK_UPDATED_SUCCESS,
        data: createTaskDTO,
        success: true,
      };
      return res.status(200).json(responseObj);
    } catch (err) {
      if (err?.response?.statusCode == 400) {
        const errorResponseObj: errorResponseObj = {
          statusCode: 500,
          error: 'Internal Server Error',
          message: err?.response?.statusMessage,
          timestamp: new Date().toISOString(),
          path: '/tasks/update-task',
        };
        throw res.status(400).json(errorResponseObj);
      }
      throw Object.assign(
        new Error(`${TASK_UPDATED_ERROR} ${err?.response?.statusMessage}`),
        {
          statusCode: err?.response?.statusCode,
        },
      );
    }
  }
}
