import { open } from "node:fs/promises";

const NEW_LINE = Buffer.from("\n");
const LIL_A = 97;
const CAP_A = 65 - 26;

async function run() {
  const fd = await open("./src/input/03_input.txt");

  const stream = fd.createReadStream({
    highWaterMark: 1,
  });

  let P = 0;
  let bag: Buffer = Buffer.alloc(0);
  for await (let byte of stream) {
    if (byte instanceof Buffer) {
      if (NEW_LINE.equals(byte)) {
        find();
        continue;
      }
      bag = Buffer.concat([bag, byte], bag.length + 1);
    }
  }
  console.log(P);
  fd.close();

  function find() {
    const mid = bag.length / 2;
    const first = bag.subarray(0, mid);
    const second = bag.subarray(mid, bag.length);

    const both = first.findIndex((f) => second.includes(f)) ?? "";
    const item = first[both];
    const prio = (item >= LIL_A ? item - LIL_A : item - CAP_A) + 1;
    P += prio;
    bag = Buffer.alloc(0);
  }
}

run();
