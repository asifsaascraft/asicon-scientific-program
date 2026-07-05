import swaggerJsdoc from "swagger-jsdoc";
import { schemas } from "./schemas.js";
import { responses } from "./responses.js";

const options = {
  definition: {
    openapi: "3.0.3",

    info: {
      title: "Agenda Backend API",
      version: "1.0.0",
      description:
        "REST API Documentation for Agenda Backend using Express.js, MongoDB and JWT Authentication.",
    },

    servers: [
      {
        url: "http://localhost:5000",
        description: "Local Development Server",
      },
    ],

    tags: [
      {
        name: "Authentication",
        description: "Authentication APIs",
      },
      {
        name: "Faculty",
        description: "Faculty Management APIs",
      },
    ],

    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas,

      responses,
    },
  },

  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;