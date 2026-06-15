import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import helmet from "helmet";
import { json, urlencoded } from "express";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security headers + a strict Content-Security-Policy.
  // The API serves JSON only, so it doesn't need to load any external resources.
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'none'"],
          frameAncestors: ["'none'"],
          baseUri: ["'none'"],
        },
      },
      crossOriginResourcePolicy: { policy: "same-site" },
      referrerPolicy: { policy: "no-referrer" },
    }),
  );

  // CORS: explicit allowlist only. Never reflect arbitrary origins with credentials.
  const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS ?? "http://localhost:3000")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  // Cap request body size to blunt memory-exhaustion abuse.
  app.use(json({ limit: "100kb" }));
  app.use(urlencoded({ extended: true, limit: "100kb" }));

  // Validate and strip unknown fields on every request.
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
