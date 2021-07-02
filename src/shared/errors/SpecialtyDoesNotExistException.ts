import { HttpException, HttpStatus } from "@nestjs/common";


export class SpecialtyDoesNotExistException extends HttpException {
    constructor() {
        super("Requested specialty does not exist", HttpStatus.NOT_FOUND);
    }
}