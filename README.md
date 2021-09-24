# Nestia
Automatic SDK generator for the NestJS.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/samchon/nestia/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/nestia.svg)](https://www.npmjs.com/package/nestia)
[![Downloads](https://img.shields.io/npm/dm/nestia.svg)](https://www.npmjs.com/package/nestia)
[![Build Status](https://github.com/samchon/nestia/workflows/build/badge.svg)](https://github.com/samchon/nestia/actions?query=workflow%3Abuild)

```bash
npm install --save-dev nestia
npx nestia sdk "src/controller" --out "src/api"
```

Don't write any `swagger` comment. Just deliver the SDK.

When you're developing a backend server using the `NestJS`, you don't need any extra dedication, for delivering the Rest API to the client developers, like writing the `swagger` comments. You just run this **Nestia** up, then **Nestia** would generate the SDK automatically, by analyzing your controller classes in the compliation and runtime level.

With the automatically generated SDK through this **Nestia**, client developer also does not need any extra work, like reading `swagger` and writing the duplicated interaction code. Client developer only needs to import the SDK and calls matched function with the `await` symbol.

```typescript
import api from "@samchon/bbs-api";
import { IBbsArticle } from "@samchon/bbs-api/lib/structures/bbs/IBbsArticle";
import { IPage } from "@samchon/bbs-api/lib/structures/common/IPage";

export async function test_article_read(connection: api.IConnection): Promise<void>
{
    // LIST UP ARTICLE SUMMARIES
    const index: IPage<IBbsArticle.ISummary> = await api.functional.bbs.articles.index
    (
        connection,
        "free",
        { limit: 100, page: 1 }
    );

    // READ AN ARTICLE DETAILY
    const article: IBbsArticle = await api.functional.bbs.articles.at
    (
        connection,
        "free",
        index.data[0].id
    );
    console.log(article.title, aritlce.body, article.files);
}
```




## Usage
### Installation
```bash
npm install --save-dev nestia
```

Installing the **Nestia** is very easy.

Just type the `npm install --save-dev nestia` command in your NestJS backend project.

### SDK generation
```bash
npx nestia sdk <source_controller_directory> --out <output_sdk_directory>

npx nestia sdk "src/controllers" --out "src/api"
npx nestia sdk "src/controllers/consumers" "src/controllers/sellers" --out "src/api
```

To generate a SDK library through the **Nestia** is very easy. 

Just type the `nestia sdk <input> --out <output>` command in the console. If there're multiple source directories containing the NestJS controller classes, type all of them separating by a `space` word.

Also, when generating a SDK using the cli options, `compilerOptions` would follow the `tsconfig.json`, that is configured for the backend server. If no `tsconfig.json` file exists in your project, the configuration would be default option (`ES5` with `strict` mode). If you want to use different `compilerOptions` with the `tsconfig.json`, you should configure the [nestia.config.ts](#nestiaconfigts).

```bash
npx nestia install
```

### Dependencies
SDK library generated by the **Nestia** has some dependencies like below. 

When you type the `nestia install` command in the console, those dependencies would be automatically installed and enrolled to the `dependencies` and `devDependencies` fields in the `package.json`

  - [@types/node](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/node)
  - [node-fetch](https://github.com/node-fetch/node-fetch)




## Advanced
### `nestia.config.ts`
```typescript
export namespace NestiaApplication
{
    export interface IConfiguration
    {
        /**
         * List of directories containing the NestJS controller classes.
         */
        input: string | string[];

        /**
         * Output directory that SDK would be placed in.
         */
        output: string;

        /**
         * Compiler options for the TypeScript.
         * 
         * If omitted, the configuration would follow the `tsconfig.json`.
         */
        compilerOptions?: tsc.CompilerOptions
    }
}
```

Instead of specifying `input` and `output` directories using the cli options, you can specify those directories as an independent configuration file. It's the `nestia.config.ts` and with the `nestia.config.ts` file, you also configure independent TypeScript compiler option from the `tsconfig.json`.

Write below content as the `nestia.config.ts` file and place it onto the root directory of your backend project. After the configuration, you can generate the SDK only with the `npx nestia sdk` command, without any directory specification. 

```typescript
export = {
    input: "src/controllers`",
    output: "src/api"
};
```



### Recommended Structures
When developing a NestJS backend server with this **Nestia**, I recommend you to follow below directory structure. The key princinple of below structure is to gathering all of the DTO interface structures into the `src/api/structures` directory and gather all of the controller classes into the `src/controllers` directory.

If you place the SDK onto the `src/api` directory and gather all of the DTO interface structures into the `src/api/structures` directory, you can publish the SDK library very easily without any special configuration. Also when you're develop the test automation program, you can implement the API testing features very convenienty through the automatically generated SDK through this **Nestia**.

  - src
    - api
      - **functional**: automatically generated SDK functions
      - **structures**: DTO structures
    - controllers
    - providers
    - models
    - **test**: Test automation program using SDK functions
  - package.json
  - tsconfig.json
  - nestia.config.ts

For your deep understanding about this directory structure with this **Nestia**, I've prepared an example backend project. Looking around the example repository and reading the [README.md](https://github.com/samchon/backend#13-directories) of it, you can feel that such directory structure is how convenient for SDK publishing and test automation program implementation.

  - https://github.com/samchon/backend




## Demonstration
To demonstrate which SDK codes would be generated by this **Nestia**:

  - [Controllers of the NestJS](https://github.surf/samchon/nestia/blob/HEAD/test/default/src/controllers/base/SaleCommentsController.ts)
  - [Structures used in the RestAPI](https://github.surf/samchon/nestia/blob/HEAD/test/default/src/api/structures/sales/articles/ISaleArticle.ts)
  - [SDK generated by this **Nestia**](https://github.surf/samchon/nestia/blob/HEAD/test/default/src/api/functional/consumers/sales/reviews/index.ts)

### Controller
If you've decided to adapt this **Nestia** and you want to generate the SDK directly, you don't need any extra work. Just keep you controller class down and do noting. The only one exceptional case that you need an extra dedication is, when you want to explain about the API function to the client developers through the comments.

```typescript
@nest.Controller("consumers/:section/sales/:saleId/questions")
export class ConsumerSaleQuestionsController
{
    /**
     * Store a new question.
     * 
     * @param request Instance of the Express.Request
     * @param section Code of the target section
     * @param saleId ID of the target sale
     * @param input Content to archive
     * 
     * @return Newly archived question
     * @throw 400 bad request error when type of the input data is not valid
     * @throw 401 unauthorized error when you've not logged in yet
     */
    @nest.Post()
    public store
        (
            @nest.Request() request: express.Request,
            @nest.Param("section") section: string, 
            @nest.Param("saleId") saleId: number, 
            @nest.Body() input: ISaleQuestion.IStore
        ): Promise<ISaleQuestion>;
}
```

### SDK
When you run the **Nestia** up using the upper controller class `ConsumerSaleQuestionsController`, the **Nestia** would generate below function for the client developers, by analyzing the `ConsumerSaleQuestionsController` class in the compilation and runtime level.

As you can see, the comments from the `ConsumerSaleQuestionsController.store()` are fully copied to the SDK function. Therefore, if you want to deliver detailed description about the API function, writing the detailed comment would be tne best choice.

```typescript
/**
 * Store a new question.
 * 
 * @param connection connection Information of the remote HTTP(s) server with headers (+encryption password)
 * @param request Instance of the Express.Request
 * @param section Code of the target section
 * @param saleId ID of the target sale
 * @param input Content to archive
 * @return Newly archived question
 * @throw 400 bad request error when type of the input data is not valid
 * @throw 401 unauthorized error when you've not logged in yet
 * 
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 * @controller ConsumerSaleQuestionsController.store()
 * @path POST /consumers/:section/sales/:saleId/questions/
 */
export function store
    (
        connection: IConnection,
        section: string,
        saleId: number,
        input: store.Input
    ): Promise<store.Output>
{
    return Fetcher.fetch
    (
        connection,
        {
            input_encrypted: false,
            output_encrypted: false
        },
        "POST",
        `/consumers/${section}/sales/${saleId}/questions/`,
        input
    );
}
export namespace store
{
    export type Input = Primitive<ISaleInquiry.IStore>;
    export type Output = Primitive<ISaleInquiry<ISaleArticle.IContent>>;
}
```




## Appendix
### Safe-TypeORM
https://github.com/samchon/safe-typeorm

[safe-typeorm](https://github.com/samchon/safe-typeorm) is another library that what I've developed, helping typeorm in the compilation level and optimizes DB performance automatically without any extra dedication.

Therefore, this **Nestia** makes you to be much convenient in the API interaction level and safe-typeorm helps you to be much convenient in the DB interaction level. With those **Nestia** and [safe-typeorm](https://github.com/samchon/safe-typeorm), let's implement the backend server much easily and conveniently.

### Technial Support
samchon.github@gmail.com

I get technical support about this **Nestia** and [safe-typeorm](https://github.com/samchon/safe-typeorm). 

Therefore, if you have any question or need help, feel free to contact me. If you want to adapt this **Nestia** and [safe-typeorm](https://github.com/samchon/safe-typeorm) in your commercial project, I can provide you the best guidance. 

I also can help your backend project in the entire development level. If you're suffering by DB architecture design or API structure design, just contact me and get help. I'll help you with my best effort.

### Archidraw
https://www.archisketch.com/

I have special thanks to the Archidraw, where I'm working for.

The Archidraw is a great IT company developing 3D interior editor and lots of solutions based on the 3D assets. Also, the Archidraw is the first company who had adopted this **Nestia** on their commercial backend project, even this **Nestia** was in the alpha level.

