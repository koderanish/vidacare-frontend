const { z } = require("zod");

const chatSchema = z.object({
  message: z.string().trim().min(1).max(2000),
});

module.exports = { chatSchema };
