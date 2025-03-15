import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Response,
  Patch,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthService } from './services/auth/index.service';
import { TaskRepository } from './modules/task/repository/task.repository';
import { UserRepository } from './modules/user/repository/user.repository';

@Controller()
export class AppController {
  constructor(
    private readonly authService: JwtAuthService,
    private readonly taskRepository: TaskRepository,
    private readonly userRepository: UserRepository,
  ) {}

  @Post('login')
  async login(@Request() req, @Response() res): Promise<Response> {
    const { email, password } = req.body;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (password === user.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = await this.authService.generateToken({ userId: user.id });

    return res.status(200).json({ token });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('task')
  async addTask(
    @Body() task: any,
    @Request() req,
    @Response() res,
  ): Promise<Response> {
    const result = await this.taskRepository.create({
      name: task.name,
      scheduled_for: task.scheduled_for ? new Date(task.scheduled_for) : null,
      createdBy: req.user.userId,
    });

    return res.status(200).json(result);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('tasks')
  async getTasks(@Response() res): Promise<Response> {
    const result = await this.taskRepository.get();
    return res.status(200).json(result);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('task/:id')
  async updateTask(
    @Body() task: any,
    @Request() req,
    @Response() res,
    @Param('id') taskId: string,
  ): Promise<Response> {
    const { userId: id } = req.user;

    const taskExists = await this.taskRepository.findById(parseInt(taskId));

    if (!taskExists) {
      return res.status(404).json({ message: 'Tarefa nao encontrada' });
    }

    const result = await this.taskRepository.update(parseInt(id), {
      ...task,
    });

    return res.json(result).status(200);
  }
}
