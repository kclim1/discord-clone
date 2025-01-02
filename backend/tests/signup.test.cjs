const chai = require("chai");
const sinon = require("sinon");
const { expect } = chai;
const express = require("express");
const request = require("supertest");
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const { signup } = require("../controllers/mainController.cjs"); // Adjust path
const User = require("../models/userSchema.cjs"); // Adjust path
const { validationResult } = require("express-validator");

// Mock Express App
const app = express();
app.use(express.json());
app.post("/signup", signup);

describe("Signup Controller", function () {
  // Increase the timeout for all tests in this suite
  this.timeout(5000);

  afterEach(() => {
    sinon.restore(); // Restore all mocked functions
  });

  it("should successfully create a new user", async () => {
    const mockUser = {
      username: "testuser",
      password: "hashedpassword",
      firstName: "John",
      lastName: "Doe",
      profileId: "mockObjectId123",
      friends: [],
      isOnline: false,
      profilePic: "",
    };

    sinon.stub(User, "findOne").resolves(null);
    sinon.stub(bcryptjs, "genSalt").resolves("somesalt");
    sinon.stub(bcryptjs, "hash").resolves("hashedpassword");
    sinon.stub(User, "create").resolves(mockUser);

    const response = await request(app)
      .post("/signup")
      .send({
        username: "testuser",
        password: "password123",
        firstName: "John",
        lastName: "Doe",
      });

    expect(response.status).to.equal(201);
    expect(response.body.user).to.have.property("username", "testuser");
    expect(response.body.user).to.have.property("profileId", "mockObjectId123");
  });

  it("should return 400 if validation errors are present", async function () {
    this.timeout(10000); // Increase timeout for this test

    // Mock `validationResult` to simulate validation errors
    sinon.stub(validationResult, "withDefaults").returns(() => ({
      isEmpty: () => false,
      array: () => [{ msg: "Validation error" }],
    }));

    const response = await request(app).post("/signup").send({});

    expect(response.status).to.equal(400);
    expect(response.body).to.have.property("errors").that.is.an("array");
    expect(response.body.errors[0].msg).to.equal("Validation error");
  });

  it("should return 400 if username already exists", async () => {
    const existingUser = { username: "testuser" };

    sinon.stub(User, "findOne").resolves(existingUser);

    const response = await request(app)
      .post("/signup")
      .send({
        username: "testuser",
        password: "password123",
        firstName: "John",
        lastName: "Doe",
      });

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal("User already exists. Please log in.");
  });

  it("should handle errors during signup", async function () {
    this.timeout(10000); // Increase timeout for this test

    sinon.stub(User, "create").throws(new Error("Database error"));

    const response = await request(app)
      .post("/signup")
      .send({
        username: "testuser",
        password: "password123",
        firstName: "John",
        lastName: "Doe",
      });

    expect(response.status).to.equal(500);
    expect(response.body.message).to.equal("Signup failed. Please try again.");
  });
});
