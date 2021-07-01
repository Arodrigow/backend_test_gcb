import { ICorreiosResponseDto } from "./dtos/ICorreiosResponseDto";

import { createClientAsync } from "soap";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CorreiosApi {
    private readonly url = "https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl";
    async findAddress(cep: string): Promise<ICorreiosResponseDto> {

        let response: ICorreiosResponseDto;

        await createClientAsync(this.url).then((client) => {
            return client.consultaCEPAsync({ cep })
        }).then((result) => {
            response = result[0].return;
        })
        return response;
    }
}

