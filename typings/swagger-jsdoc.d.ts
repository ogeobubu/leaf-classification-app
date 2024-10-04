declare module "swagger-jsdoc" {
  interface SwaggerDefinition {
    openapi: string;
    info: {
      title: string;
      version: string;
      description: string;
    };
    servers: Array<{
      url: string;
      description: string;
    }>;
  }

  interface Options {
    swaggerDefinition: SwaggerDefinition;
    apis: string[];
  }

  export default function swaggerJSDoc(options: Options): any;
}
