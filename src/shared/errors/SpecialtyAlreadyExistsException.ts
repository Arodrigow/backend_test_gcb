import { HttpException, HttpStatus } from "@nestjs/common";


export class SpecialtyAlreadyExistsException extends HttpException {
    constructor() {
        super("Specialty already exists in the database", HttpStatus.BAD_REQUEST);
    }
}