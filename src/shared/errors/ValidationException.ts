import { HttpException, HttpStatus } from "@nestjs/common";


export class ValidationException extends HttpException {
    constructor(message = "Validation Error") {
        super(message, HttpStatus.BAD_REQUEST);
    }
}