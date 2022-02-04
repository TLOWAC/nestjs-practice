import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUserOnRequest } from 'src/decorators/getUserOnRequest.decorator';

import { Board } from './boards.entity';
import { BoardStatusEnumType } from './boards.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipe/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {}
  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    const result = this.boardService.getOneBoardById(id);
    return result;
  }
  @Get()
  getAllBoard(@Req() req) {
    const { id } = req.user;
    const data = this.boardService.getAllBoardById(id);
    return data;
  }

  @Post()
  @UsePipes(ValidationPipe) // => CreateBoardDto 에서 class-validator 를 사용한 검증 과정을 handler 단에서 검증한다.
  createBoard(
    @Body() createBoard: CreateBoardDto,
    @GetUserOnRequest() user: User,
  ) {
    const result = this.boardService.createBoard(createBoard, user);
    return result;
  }

  @Put('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatusEnumType,
  ) {
    const result = this.boardService.updateBoard(id, status);
    return result;
  }

  @Delete('/:id')
  deleteBoard(@Param('id', ParseIntPipe) id: number) {
    const result = this.boardService.deleteBoard(id);
    return result;
  }
}

/**
 * 고려사항 1.
 * Controller 및 Service 의 함수에서 ReturnType 을 명시해줘야하는가?
 *
 * - 명시하는 경우
 * 명시된 ReturnType 을 ctrl + clickEvent 를 통해 넘어가서 어떤 값이 넘어오는지 간편하게 확인 할 수 있다.
 * 다만, 이경우 Typescript 가 자동으로 추론해주는데 이것이 필수요구적인 것이냐? 라는 반박이 생길 수 있다.
 *
 * - 명시하지 않는 경우
 * 문제가 되냐? 문제는 되지 않는다.
 * Typescript 가 ReturnType 을 자동으로 추론해줄것이기 때문입니다.
 * 하지만, 이경우에 ReturnType 을 확인하기 위해서는 별도의 접근 방법이 요구됩니다. ( ReturnType 이름 검색, Type.ts 파일 찾기 )
 */
