const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Should return the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Should stringify and encrypt with SHA3-512 algorythm when no partitionKey is found", () => {
    const event = {
      id: "0",
      firstName: "Maanu",
      lastName: "Vazquez",
    };
    const result = crypto
      .createHash("sha3-512")
      .update(JSON.stringify(event))
      .digest("hex");

    expect(deterministicPartitionKey(event)).toBe(result);
  });

  it("Should return the partitionKey when the given event contains it", () => {
    const key = "my-test-key";
    const event = {
      partitionKey: key,
    };

    expect(deterministicPartitionKey(event)).toBe(key);
  });

  it("Should return the partitionKey stringified when it isn't a string", () => {
    const key = [];
    const event = {
      partitionKey: key,
    };

    expect(deterministicPartitionKey(event)).toBe(JSON.stringify(key));
  });

  it("Should encrypt the partition key using SHA3-512 algorythm if it is longer than 256 characters", () => {
    const key =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkVtbWFudWVsIFZhenF1ZXoiLCJvY2N1cGF0aW9uIjoiRGV2ZWxvcGVyIiwiaG9iYnkiOiJQb2tlbW9uIHRyYWluZXIiLCJlbWFpbCI6Im1hYW51dmF6cXVlekBnbWFpbC5jb20iLCJpYXQiOjE1MTYyMzkwMjIsImlzcyI6Ik1hYW51In0.kR3W6ZYx1wlqXSWhsVEa0i74Tk-97kOVvZwgNi0yh98";
    const event = {
      partitionKey: key,
    };

    expect(deterministicPartitionKey(event)).toBe(
      crypto.createHash("sha3-512").update(key).digest("hex")
    );
  });

  it("Should return the literal `0` when a symbol is used as the event or the partitionKey", () => {
    const firstEvent = {
      partitionKey: Symbol("a"),
    };
    const secondEvent = Symbol("b");
    expect(deterministicPartitionKey(firstEvent)).toBe("0");
    expect(deterministicPartitionKey(secondEvent)).toBe("0");
  });
});
