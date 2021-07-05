import { Injectable } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { ValidationException } from "../errors/ValidationException";


@Injectable()
export class ValidationYup {
    validObject = yup.object().shape(
        {
            name: yup.string().max(120),
            crm: yup.string().max(7).matches(/^[0-9]*$/),
            landline_phone: yup.number(),
            mobile_phone: yup.number(),
            cep: yup.number(),
            specialties: yup.array().min(2)
        }
    );
    use(request: Request, response: Response, next: NextFunction) {
        const data = request.body;

        this.validObject.validate(data).catch(function (err) {
            next(new ValidationException(err.errors[0]));
        }).then(function (resp) {
            next();
        })

    }
}