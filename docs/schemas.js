export const schemas = {
  // =============================
  // USER
  // =============================

  User: {
    type: "object",

    properties: {
      _id: {
        type: "string",
        example: "6872bcd90123456789abcd12",
      },

      name: {
        type: "string",
        example: "Asif Jamal",
      },

      email: {
        type: "string",
        example: "asif@gmail.com",
      },

      createdAt: {
        type: "string",
        example: "2026-07-05T10:00:00.000Z",
      },

      updatedAt: {
        type: "string",
        example: "2026-07-05T10:00:00.000Z",
      },
    },
  },

  RegisterRequest: {
    type: "object",

    required: ["name", "email", "password"],

    properties: {
      name: {
        type: "string",
        example: "Asif Jamal",
      },

      email: {
        type: "string",
        example: "asif@gmail.com",
      },

      password: {
        type: "string",
        example: "123456",
      },
    },
  },

  LoginRequest: {
    type: "object",

    required: ["email", "password"],

    properties: {
      email: {
        type: "string",
        example: "asif@gmail.com",
      },

      password: {
        type: "string",
        example: "123456",
      },
    },
  },

  LoginResponse: {
    type: "object",

    properties: {
      message: {
        type: "string",
        example: "Login successful",
      },

      accessToken: {
        type: "string",
      },

      user: {
        $ref: "#/components/schemas/User",
      },
    },
  },

  ForgotPasswordRequest: {
    type: "object",

    properties: {
      email: {
        type: "string",
        example: "asif@gmail.com",
      },
    },
  },

  ResetPasswordRequest: {
    type: "object",

    properties: {
      password: {
        type: "string",
        example: "123456",
      },
    },
  },

  // =============================
  // FACULTY
  // =============================

  FacultyDetail: {
    type: "object",

    properties: {
      date: {
        type: "string",
        example: "12 Aug 2026",
      },

      time: {
        type: "string",
        example: "10:00 AM",
      },

      hallName: {
        type: "string",
        example: "Hall A",
      },

      role: {
        type: "string",
        example: "Speaker",
      },

      session: {
        type: "string",
        example: "NodeJS",
      },

      topic: {
        type: "string",
        example: "Swagger API",
      },
    },
  },

  Faculty: {
    type: "object",

    properties: {
      _id: {
        type: "string",
        example: "6872bcd90123456789abcd12",
      },

      name: {
        type: "string",
        example: "Dr John",
      },

      email: {
        type: "string",
        example: "john@gmail.com",
      },

      mobile: {
        type: "string",
        example: "9876543210",
      },

      details: {
        type: "array",

        items: {
          $ref: "#/components/schemas/FacultyDetail",
        },
      },

      createdAt: {
        type: "string",
      },

      updatedAt: {
        type: "string",
      },
    },
  },

  FacultyRequest: {
    type: "object",

    required: ["name", "email", "mobile"],

    properties: {
      name: {
        type: "string",
        example: "Dr John",
      },

      email: {
        type: "string",
        example: "john@gmail.com",
      },

      mobile: {
        type: "string",
        example: "9876543210",
      },

      details: {
        type: "array",

        items: {
          $ref: "#/components/schemas/FacultyDetail",
        },
      },
    },
  },

  MessageResponse: {
    type: "object",

    properties: {
      success: {
        type: "boolean",
        example: true,
      },

      message: {
        type: "string",
        example: "Operation completed successfully.",
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
        example: "Something went wrong.",
      },
    },
  },
};