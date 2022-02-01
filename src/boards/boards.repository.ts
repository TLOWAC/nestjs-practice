import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { Board } from './boards.entity';
import { BoardStatusEnumType } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createDto: CreateBoardDto) {
    const { title, description, status } = createDto;

    const board = {
      title: title,
      description: description,
      status: status || BoardStatusEnumType.PUBLIC,
    };

    const result = await this.create(board).save();
    return result;
  }

  async deleteBoard(id: number) {
    const result = await this.delete({ id: id });
    if (result.affected === 0)
      throw new NotFoundException(`Can't find Board by id ${id}`);
    return result;
  }

  async requestBoard() {
    const data = await this.find();
    if (!data) {
      throw new NotFoundException('');
    }
    return data;
  }
}

/**
 * repository 함수명 제작 원칙
 * 행동/갯수?/목적,객체
 */
