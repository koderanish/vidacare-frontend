function ok(res, data, message = "Success", statusCode = 200) {
  return res.status(statusCode).json({ success: true, message, data });
}

function created(res, data, message = "Created successfully") {
  return ok(res, data, message, 201);
}

function paginated(res, items, pagination, message = "Retrieved successfully") {
  return ok(res, { items, pagination }, message);
}

module.exports = { ok, created, paginated };
