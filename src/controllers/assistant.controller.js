const asyncHandler = require("../middleware/asyncHandler");
const { ok } = require("../utils/response");
const assistantService = require("../services/assistant.service");

exports.chat = asyncHandler(async (req, res) => {
  ok(res, await assistantService.chat(req.body), "Assistant response generated");
});
