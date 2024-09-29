import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { PORT_TYPE } from './types/data.types';
import { AllExceptionsFilter } from './all-exception.filter';
import { MyLoggerService } from './my-loggers/my-loggers.service';
// import * as ngrok from '@ngrok/ngrok';

async function bootstrap() {
  const isValidPort = (port: number): port is PORT_TYPE => {
    return [3000, 5000, 5200, 5001].includes(port);
  };
  const portFromEnv = +process.env.PORT;
  const PORT: PORT_TYPE = isValidPort(portFromEnv) ? portFromEnv : 5200;
  const app = await NestFactory.create(AppModule);
  const myLoggerService = app.get(MyLoggerService);
  app.useGlobalFilters(new AllExceptionsFilter(myLoggerService));
  app.enableCors();
  app.use(helmet());
  try {
    // await ngrok
    //   .connect({
    //     addr: PORT,
    //     authtoken_from_env: true,
    //     authtoken: process.env.NGROK_AUTHTOKEN,
    //   })
    //   .then((listener) =>
    //     console.log(`Ingress established at: ${listener.url()}`),
    //   );
    app.listen(PORT);
    // const url = await ngrok.connect({
    //   addr: PORT,
    //   authtoken_from_env: true,
    //   authtoken: process.env.NGROK_AUTHTOKEN, // Ensure this environment variable is set
    // });
    // console.log(`Ngrok is forwarding traffic to ${url}`);
  } catch (error) {
    console.error('Error starting server:', error);
  }
}
bootstrap();
