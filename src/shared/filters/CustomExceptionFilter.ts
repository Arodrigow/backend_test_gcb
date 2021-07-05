import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";


@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();

        const status =
            exception instanceof HttpException ?
                exception.getStatus() :
                HttpStatus.INTERNAL_SERVER_ERROR;
        const message =
            exception instanceof HttpException ?
                exception.message :
                `Internal server error`

        response.status(status).json({
            statusCode: status,
            message: message
        })
    }
}