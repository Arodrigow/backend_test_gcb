import { HttpException, HttpStatus } from "@nestjs/common";


export class DoctorAlreadyExistsException extends HttpException {
    constructor() {
        super("CRM already in use", HttpStatus.BAD_REQUEST);
    }
}