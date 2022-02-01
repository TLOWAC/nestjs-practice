import { IsNotEmpty, IsOptional } from 'class-validator';
import { BoardStatusEnumType } from '../boards.model';

export class CreateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  status: BoardStatusEnumType;
}

/**
 * isNotEmpty, IsNotEmpty 함수는 둘다 `class-validator` 모듈에 정의되어 있다.
 * 하지만, 차이점이 있다면 isNotEmpty() 함수는 1개의 인자를 요구하고
 * IsNotEmpty() 함수는 인자를 요구하지 않는다는점이다.
 * 더불어 parameter 의 타입과 return data 의 타입이 서로 상이하다.
 */
