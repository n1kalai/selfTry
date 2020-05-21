import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Note } from "./note.entity";
import { Repository } from "typeorm";
import { AddNoteArgs } from "./args/addNote.args";
import { EditNoteArgs } from "./args/editNote.args";

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>
  ) {}
  async getAllNotes(): Promise<Note[]> {
    return await this.noteRepository.find({ relations: ["keywords"] });
  }
  async addNote(addNoteArgs: AddNoteArgs): Promise<Note> {
    const { name, text } = addNoteArgs.record;
    const newNote = new Note();
    newNote.name = name;
    newNote.text = text;
    return await this.noteRepository.save(newNote);
  }

  async editNote(editNoteArgs: EditNoteArgs): Promise<Note> {
    const { id, name, text } = editNoteArgs.record;
    const currentNote = await this.noteRepository.findOne(id);
    return await {
      ...currentNote,
      name,
      text,
    };
  }

  async findNoteById(id: string): Promise<Note> {
    return await this.noteRepository.findOne(id, {
      relations: ["keywords"],
    });
  }
}
