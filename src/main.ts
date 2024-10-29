import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;

  app.enableCors({
    origin: true,
  });

  const config = new DocumentBuilder()
    .setTitle('MUSIC BANDS API')
    .addBearerAuth()
    .setDescription('The MUSIC BANDS API description')
    .setVersion('1.0')
    .addTag('music-bands')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`Application running on port: ${port}`);
}
bootstrap();
