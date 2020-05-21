import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { Keyword } from "./keyword.entity";
import { KeywordService } from "./keyword.service";
import { AddKeywordArgs } from "./args/addKeyword.args";
import { FindKeywordByIdArgs } from "./args/findKeywordById.args";

@Resolver((of) => Keyword)
export class KeywordResolver {
  constructor(private readonly keywordService: KeywordService) {}

  @Mutation((returns) => Keyword)
  async addKeyword(@Args() addKeywordArgs: AddKeywordArgs): Promise<Keyword> {
    return await this.keywordService.addKeyword(addKeywordArgs);
  }

  @Query((returns) => [Keyword], { nullable: true })
  async getKeywords(): Promise<Keyword[]> {
    return await this.keywordService.getKeywords();
  }

  @Query((returns) => Keyword, { nullable: true })
  async getKeyWordById(@Args() id: FindKeywordByIdArgs): Promise<Keyword> {
    return await this.keywordService.getKeyWordById(id.record.id);
  }
}
