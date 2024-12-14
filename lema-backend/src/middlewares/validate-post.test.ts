import { validatePostBody } from "./validate-post";
import { Request, Response, NextFunction } from "express";

describe("Validate Post Body Middleware", () => {
  it("should call next if body is valid", () => {
    const req = {
      body: {
        user_id: "test-user",
        title: "Test Title",
        body: "Test Body",
      },
    } as Request;
    const res = {} as Response;
    const next = jest.fn();

    validatePostBody(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("should return 400 if body is invalid", () => {
    const req = { body: {} } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    validatePostBody(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Missing required fields: user_id, title, body",
    });
  });
});
