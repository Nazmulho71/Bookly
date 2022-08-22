const request = require("supertest");
const mongoose = require("mongoose");
const { Customer } = require("../../../models/customer");
const { User } = require("../../../models/user");

describe("/api/customers", () => {
  let server;

  beforeEach(() => {
    server = require("../../../index");
  });

  afterEach(async () => {
    await server.close();
    await Customer.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all the customers", async () => {
      await Customer.collection.insertMany([
        { name: "customer1", phone: "0123456789" },
        { name: "customer2", phone: "9876543210" },
      ]);

      const res = await request(server).get("/api/customers");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((b) => b.name === "customer1")).toBeTruthy();
      expect(res.body.some((b) => b.name === "customer2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return 404 if the given id is invalid", async () => {
      const res = await request(server).get("/api/customers/1");

      expect(res.status).toBe(404);
    });

    it("should return 404 if customer was not found with the given id", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get(`/api/customers/${id}`);

      expect(res.status).toBe(404);
    });

    it("should return the customer with the given id", async () => {
      const id = mongoose.Types.ObjectId();
      await Customer.collection.insertOne({
        _id: id,
        name: "customer1",
        phone: "0123456789",
      });

      const res = await request(server).get(`/api/customers/${id}`);

      expect(res.status).toBe(200);
    });
  });

  describe("POST /", () => {
    let token;
    let name;

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = "customer1";
      phone = "0123456789";
    });

    const exec = () => {
      return request(server)
        .post("/api/customers")
        .set("X-Auth-Token", token)
        .send({ name, phone });
    };

    it("should return 401 if user is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 400 if customer name is less than 5 characters", async () => {
      name = "1234";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if customer name is greater than 50 characters", async () => {
      name = new Array(52).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if phone number is less than 10 characters", async () => {
      phone = new Array(10).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if phone number is greater than 10 characters", async () => {
      phone = new Array(12).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should save the customer if it is valid", async () => {
      await exec();

      const customer = await Customer.find({
        name: "customer1",
        phone: "0123456789",
      });

      expect(customer).toBeDefined();
    });

    it("should return the customer if it is valid", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body.name).toBe("customer1");
      expect(res.body.phone).toBe("0123456789");
    });
  });

  describe("PUT /:id", () => {
    let customer;
    let id;
    let token;
    let updatedName;
    let updatedPhone;

    beforeEach(async () => {
      customer = new Customer({ name: "customer1", phone: "0123456789" });
      await customer.save();

      id = customer._id;
      token = new User({ admin: true, moderator: true }).generateAuthToken();
      updatedName = "updatedName";
      updatedPhone = "updatedPhone";
    });

    const exec = () => {
      return request(server)
        .put(`/api/customers/${id}`)
        .set("X-Auth-Token", token)
        .send({ name: updatedName, phone: updatedPhone });
    };

    it("should return 401 if user is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 403 if user is not an admin", async () => {
      token = new User({ admin: false }).generateAuthToken();

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it("should return 403 if user is not an moderator", async () => {
      token = new User({ moderator: false }).generateAuthToken();

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it("should return 400 if customer name is less than 5 characters", async () => {
      updatedName = "1234";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if customer name is greater than 50 characters", async () => {
      updatedName = new Array(52).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if phone number is less than 10 characters", async () => {
      updatedPhone = new Array(10).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if phone number is greater than 10 characters", async () => {
      updatedPhone = new Array(12).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 404 if the customer id is invalid", async () => {
      id = "1";

      const res = await exec();

      expect(res.status).toBe(404);
    });

    // it("should return 404 if customer was not found with the given id", async () => {
    //   id = mongoose.Types.ObjectId();

    //   const res = await exec();

    //   expect(res.status).toBe(404);
    // });

    // it("should update the customer if it is valid", async () => {
    //   await exec();

    //   const updatedCustomer = await Customer.findById(id);

    //   expect(updatedCustomer.name).toBe(updatedName);
    //   expect(updatedCustomer.phone).toBe(updatedPhone);
    // });

    // it("should return the updated customer if it is valid", async () => {
    //   const res = await exec();

    //   expect(res.body).toMatchObject({
    //     _id: id,
    //     name: updatedName,
    //     phone: updatedPhone,
    //   });
    // });
  });

  describe("DELETE /:id", () => {
    let customer;
    let id;
    let token;

    beforeEach(async () => {
      customer = new Customer({ name: "customer1", phone: "0123456789" });
      await customer.save();

      id = customer._id;
      token = new User({ admin: true }).generateAuthToken();
    });

    const exec = () => {
      return request(server)
        .delete(`/api/customers/${id}`)
        .set("X-Auth-Token", token)
        .send();
    };

    it("should return 401 if user is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 403 if user is not an admin", async () => {
      token = new User({ admin: false }).generateAuthToken();

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it("should return 403 if user is not an moderator", async () => {
      token = new User({ moderator: false }).generateAuthToken();

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it("should return 404 if the customer id is invalid", async () => {
      id = "1";

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it("should return 404 if customer was not found with the given id", async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it("should update the customer if it is valid", async () => {
      await exec();

      const deletedCustomer = await Customer.findById(id);

      expect(deletedCustomer).toBeNull();
    });

    it("should return the updated customer if it is valid", async () => {
      const res = await exec();

      expect(res.body).toMatchObject({
        _id: id,
        name: customer.name,
        phone: customer.phone,
      });
    });
  });
});
