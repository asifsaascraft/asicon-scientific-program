export const examples = {
  RegisterRequest: {
    value: {
      name: "Asif Jamal",
      email: "asif@gmail.com",
      password: "123456",
    },
  },

  LoginRequest: {
    value: {
      email: "asif@gmail.com",
      password: "123456",
    },
  },

  ForgotPasswordRequest: {
    value: {
      email: "asif@gmail.com",
    },
  },

  ResetPasswordRequest: {
    value: {
      password: "123456",
    },
  },

  FacultyRequest: {
    value: {
      name: "Dr John",
      email: "john@gmail.com",
      mobile: "9876543210",

      details: [
        {
          date: "12 Aug 2026",
          time: "10:00 AM",
          hallName: "Hall A",
          role: "Speaker",
          session: "NodeJS",
          topic: "Swagger API",
        },
      ],
    },
  },
};