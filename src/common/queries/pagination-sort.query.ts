import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQuery } from './pagination.query';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PaginationSortQuery extends PaginationQuery {
  @IsOptional()
  @IsEnum(SortOrder)
  sort?: SortOrder;
}
