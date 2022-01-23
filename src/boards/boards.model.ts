export { BoardType, BoardStatusEnumType };

interface BoardType {
  id: string;
  title: string;
  description: string;
  status: BoardStatusEnumType;
  createdAt: Date;
}

enum BoardStatusEnumType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
