import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';

import { BoardStatusEnumType, BoardType } from './boards.model';

@Injectable()
export class BoardsService {
  data: BoardType[] = [];
  getAllBoard() {
    return this.data;
  }
  getBoardById(id: string) {
    const result = this.data.filter((board) => {
      return board.id === id;
    });
    return result;
  }
  createBoard(title: string, description: string) {
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
