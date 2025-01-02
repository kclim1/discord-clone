const express = require("express");
const request = require("supertest");
const messageRoutes = require("../routes/messageRoutes.cjs"); // Adjust path
const messageController = require("../controllers/messageController.cjs");
const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;

// Mock Express App
const app = express();
app.use(express.json());
app.use("/", messageRoutes);

describe("Message Routes", () => {
  afterEach(() => {
    sinon.restore(); // Restore all stubs after each test
  });

  it("should call sendFriendRequest on POST /friend-requests/:profileId", async () => {
    const mockHandler = sinon.stub(messageController, "sendFriendRequest").resolves({
      message: "Friend request sent!",
    });

    const response = await request(app)
      .post("/friend-requests/12345")
      .send({ senderId: "67890", receiverId: "12345" });

    expect(response.status).to.equal(200);
    expect(mockHandler.calledOnce).to.be.true;
    expect(mockHandler.args[0][0].params.profileId).to.equal("12345"); // Verify params
    expect(response.body.message).to.equal("Friend request sent!");
  });

  it("should call createNewChat on POST /new-chat", async () => {
    const mockHandler = sinon.stub(messageController, "createNewChat").resolves({
      chatId: "newChat123",
    });

    const response = await request(app)
      .post("/new-chat")
      .send({ participants: ["12345", "67890"] });

    expect(response.status).to.equal(200);
    expect(mockHandler.calledOnce).to.be.true;
    expect(response.body.chatId).to.equal("newChat123");
  });

  it("should call sendMessage on POST /messages", async () => {
    const mockHandler = sinon.stub(messageController, "sendMessage").resolves({
      message: "Message sent!",
    });

    const response = await request(app)
      .post("/messages")
      .send({ chatId: "chat123", senderId: "12345", content: "Hello!" });

    expect(response.status).to.equal(200);
    expect(mockHandler.calledOnce).to.be.true;
    expect(response.body.message).to.equal("Message sent!");
  });

  it("should call getAllMessages on GET /messages/:chatId", async () => {
    const mockHandler = sinon.stub(messageController, "getAllMessages").resolves([
      { chatId: "chat123", content: "Hello!" },
    ]);

    const response = await request(app).get("/messages/chat123");

    expect(response.status).to.equal(200);
    expect(mockHandler.calledOnce).to.be.true;
    expect(mockHandler.args[0][0].params.chatId).to.equal("chat123");
    expect(response.body).to.be.an("array");
  });

  it("should call getAllChat on GET /chats/:profileId", async () => {
    const mockHandler = sinon.stub(messageController, "getAllChat").resolves([
      { chatId: "chat123", participants: ["12345", "67890"] },
    ]);

    const response = await request(app).get("/chats/12345");

    expect(response.status).to.equal(200);
    expect(mockHandler.calledOnce).to.be.true;
    expect(mockHandler.args[0][0].params.profileId).to.equal("12345");
    expect(response.body).to.be.an("array");
  });

  it("should call acceptFriendRequest on PATCH /friends/:profileId", async () => {
    const mockHandler = sinon.stub(messageController, "acceptFriendRequest").resolves({
      message: "Friend request accepted!",
    });

    const response = await request(app)
      .patch("/friends/12345")
      .send({ friendId: "67890" });

    expect(response.status).to.equal(200);
    expect(mockHandler.calledOnce).to.be.true;
    expect(response.body.message).to.equal("Friend request accepted!");
  });

  it("should call rejectFriendRequest on DELETE /friends/:profileId", async () => {
    const mockHandler = sinon.stub(messageController, "rejectFriendRequest").resolves({
      message: "Friend request rejected!",
    });

    const response = await request(app)
      .delete("/friends/12345")
      .send({ friendId: "67890" });

    expect(response.status).to.equal(200);
    expect(mockHandler.calledOnce).to.be.true;
    expect(response.body.message).to.equal("Friend request rejected!");
  });
});
