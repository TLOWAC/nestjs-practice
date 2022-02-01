import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

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

  createBoard(createBoard: CreateBoardDto) {
    const result = this.boardRepository.createBoard(createBoard);
    return result;
  }

  async getBoardById(id: number): Promise<Board> {
    const data = await this.boardRepository.findOne(id);
    if (!data) {
      throw new NotFoundException('');
    }
    return data;
  }

  getAllBoard() {
    const data = this.boardRepository.requestBoard();
    return data;
  }

  async updateBoard(id: number, status: BoardStatusEnumType) {
    const board = await this.getBoardById(id);
    board.status = status;

    const result = this.boardRepository.save(board);
    return result;
  }

  deleteBoard(id: number) {
    const result = this.boardRepository.deleteBoard(id);
    return result;
  }
}
