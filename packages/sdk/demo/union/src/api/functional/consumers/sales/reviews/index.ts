/**
 * @packageDocumentation
 * @module api.functional.consumers.sales.reviews
 * @nestia Generated by Nestia - https://github.com/samchon/nestia 
 */
//================================================================
import { Fetcher } from "@nestia/fetcher";
import type { IConnection } from "@nestia/fetcher";

import type { ISaleReview } from "./../../../../structures/ISaleReview";
import type { ISaleInquiry } from "./../../../../structures/ISaleInquiry";
import type { IPage } from "./../../../../structures/IPage";

/**
 * @controller ConsumerSaleQuestionsController.index()
 * @path PATCH /consumers/:section/sales/:saleId/reviews
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function index
    (
        connection: IConnection,
        section: string,
        saleId: number,
        query: ISaleReview.IQuery,
        input: ISaleInquiry.IRequest
    ): Promise<index.Output>
{
    return Fetcher.fetch(
        connection,
        index.ENCRYPTED,
        index.METHOD,
        index.path(section, saleId, query),
        input
    );
}
export namespace index
{
    export type Query = ISaleReview.IQuery;
    export type Input = ISaleInquiry.IRequest;
    export type Output = IPage<ISaleReview.ISummary>;

    export const METHOD = "PATCH" as const;
    export const PATH: string = "/consumers/:section/sales/:saleId/reviews";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export function path(section: string, saleId: number, query: ISaleReview.IQuery): string
    {
        return `/consumers/${encodeURIComponent(section)}/sales/${encodeURIComponent(saleId)}/reviews?${new URLSearchParams(query as any).toString()}`;
    }
}