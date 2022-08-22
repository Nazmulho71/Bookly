const moment = require("moment");
const request = require("supertest");
const mongoose = require("mongoose");
const { User } = require("../../../models/user");
const { Rental } = require("../../../models/rental");
const { Book } = require("../../../models/book");

describe("/api/returns", () => {
  let server;
  let token;
  let rental;
  let customerId;
  let bookId;
  let book;

  beforeEach(async () => {
    server = require("../../../index");
    token = new User().generateAuthToken();
    customerId = mongoose.Types.ObjectId();
    bookId = mongoose.Types.ObjectId();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: "customer1",
        phone: "0123456789",
      },
      book: {
        _id: bookId,
        title: "book1",
        dailyRentalRate: 2,
      },
    });
    await rental.save();

    book = new Book({
      _id: bookId,
      title: "title1",
      image: "image1",
      category: { name: "category1" },
      price: 10,
      author: "author1",
      numberInStock: 1,
      dailyRentalRate: 2,
    });
    await book.save();
  });

  afterEach(async () => {
    await server.close();
    await Rental.deleteMany({});
    await Book.deleteMany({});
  });

  const exec = () => {
    return request(server)
      .post("/api/returns")
      .set("X-Auth-Token", token)
      .send({ customerId, bookId });
  };

  it("should return 401 if the user is not logged in", async () => {
    token = "";

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it("should return 400 if customerId is not provided", async () => {
    customerId = "";

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 400 if bookId is not provided", async () => {
    bookId = "";

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 404 if no rental found with the customerId and bookId", async () => {
    await Rental.deleteMany({});

    const res = await exec();

    expect(res.status).toBe(404);
  });

  it("should return 400 if return already processed", async () => {
    rental.dateReturned = new Date();
    await rental.save();

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 200 if it is valid", async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });

  it("should set dateReturned value if it is valid", async () => {
    await exec();

    const rentalInDb = await Rental.findById(rental._id);
    const diff = rentalInDb.dateReturned - new Date();

    expect(diff).toBeLessThan(10000);
  });

  it("should set the rental fee if it is valid", async () => {
    rental.dateOut = moment().add(-7, "days");
    await rental.save();

    await exec();

    const rentalInDb = await Rental.findById(rental._id);

    expect(rentalInDb.rentalFee).toBe(14);
  });

  it("should increase the book stock if it is valid", async () => {
    await exec();

    const bookInDb = await Book.findById(bookId);

    expect(bookInDb.numberInStock).toBe(book.numberInStock + 1);
  });

  it("should the rental if it is valid", async () => {
    const res = await exec();

    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining([
        "customer",
        "book",
        "dateOut",
        "dateReturned",
        "rentalFee",
      ])
    );
  });
});
