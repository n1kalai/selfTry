import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as path from "path";

require("dotenv").config({
  path: `${__dirname}/../env/${process.env.NODE_ENV ||
    "development.local"}.env`,
});

import { AppModule } from "./app.module";

const PORT = 3333;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  const publicDir =
    process.env.PUBLIC_FILES_DIR || path.join(__dirname, "/../public");
  app.useStaticAssets(publicDir);

  await app.listen(PORT);
}
bootstrap();
