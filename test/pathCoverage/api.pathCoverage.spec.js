const { expect } = require("chai");
const request = require("supertest");

describe("API Path Coverage", function () {
  const api = request("http://localhost:3000");
  let token;

  it("covers POST /register", async function () {
    const response = await api.post("/register").send({
      name: "Dave",
      email: "dave@example.com",
      password: "dave123"
    });

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("user");
    expect(response.body.user).to.include({
      name: "Dave",
      email: "dave@example.com"
    });
  });

  it("covers POST /login", async function () {
    const response = await api.post("/login").send({
      email: "alice@example.com",
      password: "alice123"
    });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("token");
    expect(response.body.token).to.be.a("string").and.not.empty;
    token = response.body.token;
  });

  it("covers POST /checkout", async function () {
    const response = await api
      .post("/checkout")
      .set("Authorization", `Bearer ${token}`)
      .send({
        paymentMethod: "cash",
        items: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 2 }
        ]
      });

    expect(response.status).to.equal(200);
    expect(response.body).to.include({
      paymentMethod: "cash",
      subtotal: 1500,
      discount: 150,
      total: 1350
    });
    expect(response.body.items).to.be.an("array").with.lengthOf(2);
  });

  it("covers GET /healthcheck", async function () {
    const response = await api.get("/healthcheck");

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ status: "ok" });
  });
});
