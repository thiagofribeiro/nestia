import { AesPkcs5 } from "./../../../../__internal/AesPkcs5";
import { Fetcher } from "./../../../../__internal/Fetcher";
import { Primitive } from "./../../../../Primitive";
import type { IConnection } from "./../../../../IConnection";

import type { ISeller } from "./../../../../structures/actors/ISeller";


/**
 * Change password.
 * 
 * @param connection Information of the remote HTTP(s) server with headers (+encryption password)
 * @param input Old and new passwords
 * @return Empty object
 * 
 * @controller SellerAuthenticateController.change()
 * @path PATCH sellers/authenticate/password/change
 */
export function change(connection: IConnection, input: Primitive<change.Input>): Promise<void>
{
    return Fetcher.fetch
    (
        connection,
        {"input_encrypted":true,"output_encrypted":false},
        "PATCH",
        `sellers/authenticate/password/change`,
        input
    );
}
export namespace change
{
    export type Input = Primitive<ISeller.IChangePassword>;
}



//---------------------------------------------------------
// TO PREVENT THE UNUSED VARIABLE ERROR
//---------------------------------------------------------
AesPkcs5;
Fetcher;
Primitive;