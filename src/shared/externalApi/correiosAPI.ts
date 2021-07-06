import { ICorreiosResponseDto } from "./dtos/ICorreiosResponseDto";

import { createClientAsync } from "soap";

export class CorreiosApi {

    static async findAddress(cep: string): Promise<ICorreiosResponseDto> {
        const url = "https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl";
        let response: ICorreiosResponseDto;

        await createClientAsync(url).then((client) => {
            return client.consultaCEPAsync({ cep })
        }).then((result) => {
            response = result[0].return;
        })

        return {
            end: response.end,
            bairro: response.bairro,
            cidade: response.cidade,
            uf: response.uf,
        }
    }
}


