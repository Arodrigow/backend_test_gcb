import { HttpException, HttpStatus } from "@nestjs/common";


export class CorreiosAPIException extends HttpException {
    constructor() {
        super("Could not find CEP", HttpStatus.BAD_REQUEST);
    }
}