if(!process.env.IS_TS_NODE){
  require('module-alias/register')

}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api/')
  app.enableCors({
      origin: '*',
      optionsSuccessStatus: 200,
      credentials: true,
      methods: 'GET, POST, DELETE, PUT'
    })
  
  await app.listen(3000);
}
bootstrap();
