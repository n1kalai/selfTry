import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Keyword } from "./keyword.entity";
import { Repository } from "typeorm";
import { AddKeywordArgs } from "./args/addKeyword.args";

@Injectable()
export class KeywordService {
  @InjectRepository(Keyword)
  private keywordRepository: Repository<Keyword>;

  async addKeyword(addKeywordArgs: AddKeywordArgs): Promise<Keyword> {
    const { name, text } = addKeywordArgs.record;
    const newKeyword = new Keyword();
    newKeyword.name = name;
    newKeyword.text = text;
    return await this.keywordRepository.save(newKeyword);
  }

  async getKeywords(): Promise<Keyword[]> {
    return await this.keywordRepository.find();
  }

  async getKeyWordById(id): Promise<Keyword> {
    return await this.keywordRepository.findOne(id);
  }
}
