export const schemas = {
  User: {
    type: "object",

    properties: {
      _id: {
        type: "string",
      },

      name: {
        type: "string",
      },

      email: {
        type: "string",
      },

      password: {
        type: "string",
      },
    },
  },

  Faculty: {
    type: "object",

    properties: {
      _id: {
        type: "string",
      },

      name: {
        type: "string",
      },

      email: {
        type: "string",
      },

      mobile: {
        type: "string",
      },
    },
  },
};