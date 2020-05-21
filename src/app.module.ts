import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";
import { UserModule } from "./user/user.module";
import { AppController } from "./app.controller";
import { FolderModule } from "./folder/folder.module";
import { FileModule } from "./file/file.module";
import { NoteModule } from './note/note.module';
import { KeywordModule } from './keyword/keyword.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "141777",
      database: "nikoloza",
      synchronize: true,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
    }),
    GraphQLModule.forRoot({
      subscriptions: {
        onConnect: (connectionParams) => {
          return connectionParams;
        },
      },
      context: ({ req, connection }) => {
        return connection ? { req: { headers: connection.context } } : { req };
      },
      autoSchemaFile: "schema.gql",
    }),
    UserModule,
    FolderModule,
    FileModule,
    NoteModule,
    KeywordModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
