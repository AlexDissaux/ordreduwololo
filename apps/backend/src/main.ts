/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables FIRST, before any other imports
// __dirname at runtime = apps/backend/dist — go 3 levels up to reach monorepo root
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
// Local overrides (apps/backend/.env.local) — optional, takes precedence
dotenv.config({ path: path.resolve(__dirname, '../.env.local'), override: true });

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

declare const module: any;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const allowedOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:4200';
    app.enableCors({
      origin: allowedOrigin,
    });
    // const globalPrefix = 'api';
    // app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    Logger.log(
      `🚀 Application is running on: http://localhost:${port}/`,
    );

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
  } catch (error) {
    Logger.error('Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap();
