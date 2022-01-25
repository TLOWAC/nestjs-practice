import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';

import { BoardStatusEnumType, BoardType } from './boards.model';
import { CreateBoard } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  data: BoardType[] = [];

  getAllBoard() {
    return this.data;
  }

  getBoardById(id: string) {
    const result = this.data.filter((board) => board.id === id);
    /**
     * @case1
     * 일치하는 데이터가 없을 경우 데이터 반환 X
     * const result = this.data.filter((board) => board.id === id);
     *
     * @case2
     * 일치하는 데이터가 없을 경우 [] 빈배열을 반환
     * const result = this.data.filter((board) => {
     * return board.id === id;
     * });
     */
    if (result) {
      throw new NotFoundException(`There is ${id}}`);
    }
    return result;
  }

  createBoard(board: CreateBoard) {
    const { title, description } = board;
    const inputData: BoardType = {
      id: uuid(),
      title,
      description,
      status: BoardStatusEnumType.PUBLIC,
      createdAt: new Date(),
    };
    this.data.push(inputData);
    return this.data;
  }

  deleteBoardById(id: string) {
    this.data = this.data.filter((board) => {
      return board.id !== id;
    });
  }
}
