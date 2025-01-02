const chai = require("chai");
const sinon = require("sinon");
const { expect } = chai;
const express = require("express");
const request = require("supertest");
const bcryptjs = require("bcryptjs");
const { updateProfile } = require("../controllers/mainController.cjs"); // Adjust path
const User = require("../models/userSchema.cjs"); // Adjust path

// Mock Express App
const app = express();
app.use(express.json());
app.patch("/profile", updateProfile);

describe("updateProfile Controller", () => {
  afterEach(() => {
    sinon.restore(); // Restore the original state of all mocked functions
  });

  it("should successfully update the user profile", async () => {
    const mockUser = {
      profileId: "12345",
      username: "testuser",
      email: "test@example.com",
      profilePic: "testpic.jpg",
    };

    const updatedUser = {
      ...mockUser,
      username: "updateduser",
      profilePic: "updatedpic.jpg",
    };

    // Mock `User.findOneAndUpdate`
    sinon.stub(User, "findOneAndUpdate").resolves(updatedUser);

    const response = await request(app)
      .patch("/profile")
      .send({
        profileId: "12345",
        username: "updateduser",
        profilePic: "updatedpic.jpg",
      });

    expect(response.status).to.equal(200);
    expect(response.body.username).to.equal("updateduser");
    expect(response.body.profilePic).to.equal("updatedpic.jpg");
  });

  it("should hash the password when updating it", async () => {
    const mockUser = {
      profileId: "12345",
      username: "testuser",
      email: "test@example.com",
      profilePic: "testpic.jpg",
    };

    const updatedUser = {
      ...mockUser,
      password: "hashedpassword",
    };

    // Mock bcryptjs and User.findOneAndUpdate
    sinon.stub(bcryptjs, "genSalt").resolves("somesalt");
    sinon.stub(bcryptjs, "hash").resolves("hashedpassword");
    sinon.stub(User, "findOneAndUpdate").resolves(updatedUser);

    const response = await request(app)
      .patch("/profile")
      .send({
        profileId: "12345",
        password: "newpassword",
      });

    expect(response.status).to.equal(200);
    expect(response.body.password).to.equal("hashedpassword");
  });

  it("should return 404 if user is not found", async () => {
    sinon.stub(User, "findOneAndUpdate").resolves(null); // Simulate user not found

    const response = await request(app)
      .patch("/profile")
      .send({
        profileId: "12345",
        username: "nonexistentuser",
      });

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal("User not found");
  });

  it("should handle unexpected errors gracefully", async () => {
    sinon.stub(User, "findOneAndUpdate").throws(new Error("Database error"));

    const response = await request(app)
      .patch("/profile")
      .send({
        profileId: "12345",
        username: "erroruser",
      });

    expect(response.status).to.equal(500);
    expect(response.body.message).to.equal("Failed to update profile");
  });
});
