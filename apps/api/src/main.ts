import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security baseline
  app.use(helmet());
  app.enableCors({
    origin: process.env.NEXT_PUBLIC_API_URL ? true : "http://localhost:3000",
    credentials: true,
  });

  // Validate and strip unknown fields on every request
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );

  app.setGlobalPrefix("api");

  const port = process.env.API_PORT ?? 4000;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`Vast API running on http://localhost:${port}/api`);
}

bootstrap();
