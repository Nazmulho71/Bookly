const request = require("supertest");
const mongoose = require("mongoose");
const { Category } = require("../../../models/category");
const { User } = require("../../../models/user");

describe("/api/categories", () => {
  let server;

  beforeEach(() => {
    server = require("../../../index");
  });

  afterEach(async () => {
    await server.close();
    await Category.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all the categories", async () => {
      await Category.collection.insertMany([
        { name: "category1" },
        { name: "category2" },
      ]);

      const res = await request(server).get("/api/categories");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((b) => b.name === "category1")).toBeTruthy();
      expect(res.body.some((b) => b.name === "category2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return 404 if the given id is invalid", async () => {
      const res = await request(server).get("/api/categories/1");

      expect(res.status).toBe(404);
    });

    it("should return 404 if the category was not found with the given id", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get(`/api/categories/${id}`);

      expect(res.status).toBe(404);
    });

    it("should return a category with the given id", async () => {
      const category = new Category({ name: "category1" });
      await category.save();

      const res = await request(server).get(`/api/categories/${category._id}`);

      expect(res.status).toBe(200);
      expect(res.body.name).toBe(category.name);
    });
  });

  describe("POST /", () => {
    let token;
    let name;

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = "category1";
    });

    const exec = () => {
      return request(server)
        .post("/api/categories")
        .set("X-Auth-Token", token)
        .send({ name });
    };

    it("should return 401 if the user is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 400 if the category name is less than 5 characters", async () => {
      name = "1234";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the category name is greater than 50 characters", async () => {
      name = new Array(52).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should save the category if it is valid", async () => {
      await exec();

      const category = await Category.find({ name: "category1" });

      expect(category).not.toBeNull();
    });

    it("should return the category if it is valid", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body.name).toBe("category1");
    });
  });

  describe("PUT /:id", () => {
    let category;
    let id;
    let token;
    let updatedName;

    beforeEach(async () => {
      category = new Category({ name: "category1" });
      await category.save();

      id = category._id;
      token = new User({ admin: true }).generateAuthToken();
      updatedName = "updatedName";
    });

    const exec = () => {
      return request(server)
        .put(`/api/categories/${id}`)
        .set("X-Auth-Token", token)
        .send({ name: updatedName });
    };

    it("should return 401 the user is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 403 if the user is not an admin", async () => {
      token = new User({ admin: false }).generateAuthToken();

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it("should return 400 if category name is less than 5 characters", async () => {
      updatedName = "1234";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if category name is greater than 50 characters", async () => {
      updatedName = new Array(52).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 404 if the category id is invalid", async () => {
      id = "1";

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it("should return 404 if category was not found with the given id", async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it("should update the category if it is valid", async () => {
      await exec();

      const updatedCategory = await Category.findById(category._id);

      expect(updatedCategory.name).toBe(updatedName);
    });

    it("should return the updated category if it is valid", async () => {
      const res = await exec();

      expect(res.body).toMatchObject({ _id: category._id, name: updatedName });
    });
  });

  describe("DELETE /:id", () => {
    let id;
    let token;
    let category;

    beforeEach(async () => {
      category = new Category({ name: "category1" });
      await category.save();

      id = category._id;
      token = new User({ admin: true }).generateAuthToken();
    });

    const exec = () => {
      return request(server)
        .delete(`/api/categories/${id}`)
        .set("X-Auth-Token", token)
        .send();
    };

    it("should return 401 if the user is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 403 if the user is not an admin", async () => {
      token = new User({ admin: false }).generateAuthToken();

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it("should return 404 if the given id is invalid", async () => {
      id = "1";

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it("should return 404 if category was not found with the given id", async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it("should delete the category if it is valid", async () => {
      await exec();

      const deletedCategory = await Category.findById(category._id);

      expect(deletedCategory).toBeNull();
    });

    it("should return the deleted category if it is valid", async () => {
      const res = await exec();

      expect(res.body).toMatchObject({
        _id: category._id,
        name: category.name,
      });
    });
  });
});
