import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardType } from './boards.model';
import { BoardsService } from './boards.service';
import { CreateBoard } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardService: BoardsService) {}
  @Get()
  getBoardAll(): BoardType[] {
    const result = this.boardService.getAllBoard();
    return result;
  }

  @Get(':id')
  getBoardById(@Param('id') id: string) {
    const result = this.boardService.getBoardById(id);
    return result;
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() board: CreateBoard): BoardType[] {
    const result = this.boardService.createBoard(board);
    return result;
  }

  @Delete(':id')
  deleteBoardById(@Param('id') id: string) {
    const result = this.boardService.deleteBoardById(id);
  }
}

/**
 * 의문 1.
 * Controller 및 Service 의 함수에서 ReturnType 을 명시해줘야하는가?
 *
 * - 명시하는 경우
 * 명시된 ReturnType 을 ctrl + clickEvent 를 통해 넘어가서 어떤 값이 넘어오는지 간편하게 확인 할 수 있다.
 * 다만, 이경우 Typescript 가 자동으로 추론해주는데 이것이 필수요구적인 것이냐? 라는 반박이 생길 수 있다.
 *
 * - 명시하지 않는 경우
 * 문제가 되냐? 문제는 되지 않는다.
 * Typescript 가 ReturnType 을 자동으로 추론해줄것이기 때문입니다.
 * 하지만, 이경우에 ReturnType 을 확인하기 위해서는 별도의 접근 방법이 요구됩니다. ( ReturnType 이름 검색, Type.ts 파일 찾기)
 */
