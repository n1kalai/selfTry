import { Resolver, Args, Mutation, Query } from "@nestjs/graphql";
import { Note } from "./note.entity";
import { NoteService } from "./note.service";
import { AddNoteArgs } from "./args/addNote.args";
import { EditNoteArgs } from "./args/editNote.args";
import { FindNoteByIdArgs } from "./args/findNoteById.args";

@Resolver((of) => Note)
export class NoteResolver {
  constructor(private readonly noteService: NoteService) {}

  @Query((returns) => [Note])
  async getAllNotes(): Promise<Note[]> {
    return await this.noteService.getAllNotes();
  }

  @Mutation((returns) => Note, { nullable: true })
  async addNote(@Args() addNoteArgs: AddNoteArgs): Promise<Note> {
    return await this.noteService.addNote(addNoteArgs);
  }

  @Mutation((returns) => Note, { nullable: true })
  async editNote(@Args() editNoteArgs: EditNoteArgs): Promise<Note> {
    return await this.noteService.editNote(editNoteArgs);
  }

  @Query((returns) => Note, { nullable: true })
  async findNoteById(
    @Args() findNoteByIdArgs: FindNoteByIdArgs
  ): Promise<Note> {
    return await this.noteService.findNoteById(findNoteByIdArgs.record.id);
  }
}
