import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

import { Board } from './boards.entity';
import { BoardStatusEnumType } from './boards.model';
import { BoardRepository } from './boards.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private readonly boardRepository: BoardRepository,
  ) {}

  createBoard(createBoard: CreateBoardDto, user: User) {
    const result = this.boardRepository.createBoard(createBoard, user);
    return result;
  }

  async getOneBoardById(id: number): Promise<Board> {
    const data = await this.boardRepository.findOne(id);
    if (!data) {
      throw new NotFoundException('');
    }
    return data;
  }
  async getAllBoardById(id: number): Promise<Board[]> {
    const data = await this.boardRepository.find({
      where: {
        user: { id },
      },
    });
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  getAllBoard() {
    const data = this.boardRepository.requestBoard();
    return data;
  }

  async updateBoard(id: number, status: BoardStatusEnumType) {
    const board = await this.getOneBoardById(id);
    board.status = status;

    const result = this.boardRepository.save(board);
    return result;
  }

  deleteBoard(id: number) {
    const result = this.boardRepository.deleteBoard(id);
    return result;
  }
}
