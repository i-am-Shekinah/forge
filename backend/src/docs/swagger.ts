import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Forge API",
      version: "1.0.0",
      description: "AI-powered multi-tenant SaaS backend API",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        RegisterDto: {
          type: "object",
          required: ["firstname", "lastname", "email", "password"],
          properties: {
            firstname: { type: "string", example: "Shekinah" },
            lastname: { type: "string", example: "Dev" },
            email: { type: "string", example: "shekinah@example.com" },
            password: { type: "string", example: "password123" },
          },
        },

        LoginDto: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "shekinah@example.com" },
            password: { type: "string", example: "password123" },
          },
        },
      },
    },
  },

  apis: ["./src/modules/**/*.ts"],
});
