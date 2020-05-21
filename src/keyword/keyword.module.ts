import { Module } from "@nestjs/common";
import { KeywordService } from "./keyword.service";
import { KeywordResolver } from "./keyword.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Keyword } from "./keyword.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Keyword])],
  providers: [KeywordService, KeywordResolver],
  exports: [KeywordService],
})
export class KeywordModule {}
