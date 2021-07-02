import { HttpException, HttpStatus } from "@nestjs/common";


export class DoctorDoesNotExistException extends HttpException {
    constructor() {
        super("Requested doctor does not exist", HttpStatus.NOT_FOUND);
    }
}