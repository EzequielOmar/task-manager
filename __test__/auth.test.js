const request = require("supertest");
const url = "localhost:80";

const user = {
  firstName: "test firstName",
  lastName: "test lastName",
  email: "fakeEmail@test.com",
  password: "123456",
};
let user_id = null;
let auth_token = null;

describe("/auth/signup ->", () => {
  test("Should fail by missing values", async () => {
    const res = await request(url).post("/auth/signup");
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Error on body params");
  });

  test("Should fail by short password", async () => {
    const res = await request(url).post("/auth/signup").send({
      firstName: "test firstName",
      lastName: "test lastName",
      email: "fakeEmail@test.com",
      password: "12345",
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Error on body params");
  });

  test("Should signup a new user", async () => {
    const res = await request(url).post("/auth/signup").send(user);
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("User created");
    //* Save user_id for further testing
    user_id = res.body.data.id;
  });

  test("Should fail by not unique user email", async () => {
    const res = await request(url).post("/auth/signup").send(user);
    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Internal server error");
    expect(res.body.err.name).toBe("SequelizeUniqueConstraintError");
  });
});

describe("/auth/login ->", () => {
  test("Should fail by non existing user email", async () => {
    const res = await request(url).post("/auth/login").send({
      email: "fake@nonexistent.com",
      password: "fakepassword",
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Incorrect email");
  });

  test("Should log user, and retrieve token", async () => {
    const res = await request(url).post("/auth/login").send({
      email: user.email,
      password: user.password,
    });
    //* Save auth token for further testing
    auth_token = res.body.accessToken;
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User logged");
    expect(res.body).toHaveProperty("accessToken");
  });
});

describe("/auth/delete_user/:id ->", () => {
  test("Delete on /auth/delete_user/:id -> Should delete user", async () => {
    const res = await request(url).delete("/auth/delete_user/" + user_id);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User deleted");
  });
});

describe("Authentication middleware:", () => {
  test("Get on /test-route -> No auth token, it should give an unauthorized error", async () => {
    const res = await request(url).get("/test-route");
    expect(res.status).toBe(401);
    expect(res.text).toBe("Unauthorized");
  });

  test("Get on /test-route -> With auth token, it should retrieve content", async () => {
    const res = await request(url)
      .get("/test-route")
      .set("Authorization", `Bearer ${auth_token}`);
    expect(res.status).toBe(200);
    expect(res.text).toBe("Testing");
  });
});
