import { HttpException, HttpStatus } from "@nestjs/common";


export class InvalidQueryException extends HttpException {
    constructor() {
        super("Specified query is invalid!", HttpStatus.BAD_REQUEST);
    }
}