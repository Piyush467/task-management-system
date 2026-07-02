import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      contact: {
        name: "Piyush",
        email: "piyush@gmail.com",
      },

      license: {
        name: "MIT",
      },
      version: "1.0.0",
      description:
        "Backend Intern Assignment - Task Management API",
    },

    servers: [
      {
        url: "http://localhost:5001/api/v1",
      },
    ],

    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "accessToken",
        },
      },

      schemas: {
        ApiResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Operation completed successfully",
            },
            data: {
              type: "object",
            },
          },
        },

        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Validation failed",
            },
          },
        },

        User: {
          type: "object",

          required: [
            "name",
            "email",
            "role",
          ],

          properties: {
            _id: {
              type: "string",
              example: "6865c87ab32d4e67"
            },

            name: {
              type: "string",
              example: "Piyush"
            },

            email: {
              type: "string",
              example: "piyush@gmail.com"
            },

            role: {
              type: "string",
              enum: [
                "user",
                "admin",
              ],
              example: "user",
            },
          },
        },

        Task: {
          type: "object",

          required: [
            "title",
            "status",
          ],

          properties: {

            _id: {
              type: "string",
              example: "6865c87ab32d4e67"
            },

            title: {
              type: "string",
              example: "Finish Assignment"
            },

            description: {
              type: "string",
              example: "Complete backend task"
            },

            status: {
              type: "string",
              enum: [
                "todo",
                "in_progress",
                "done",
              ],
              example: "todo",
            },

            owner: {
              type: "string",
              example: "6865c87ab32d4e67"
            },

            createdAt: {
              type: "string",
              format: "date-time",
            },

            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },
    },

    security: [
      {
        cookieAuth: [],
      },
    ],
  },

  apis: ["./src/routes/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);