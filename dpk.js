const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

function shaEncrypt(str) {
  return crypto.createHash("sha3-512").update(str).digest("hex");
}

function encodeEvent(event) {
  const stringified = JSON.stringify(event);
  return shaEncrypt(stringified)
}

exports.deterministicPartitionKey = (event) => {
  // Symbols cannot be stringified so we cannot encrypt them, we just return the trivial
  // partition key
  if (
    !event ||
    typeof event === "symbol" ||
    typeof event?.partitionKey === "symbol"
  ) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (!event.partitionKey) {
    return encodeEvent(event);
  }

  const candidate =
    typeof event.partitionKey === "string"
      ? event.partitionKey
      : JSON.stringify(event.partitionKey);

  if (candidate.length <= MAX_PARTITION_KEY_LENGTH) {
    return candidate;
  }

  return shaEncrypt(candidate)
};
