import * as fs from "node:fs/promises";
import { Buffer } from "node:buffer";
import { constrainedMemory } from "node:process";

async function run() {
  const buffer = await fs.readFile("./src/01/input.txt");

  const T: number[] = [];
  let t: number = 0;
  let b: number[] = [];

  for (const buf of buffer.values()) {
    // Degubbinbg logs
    // console.log("\n\n");
    // console.log("buf: ", buf);
    // console.log("b: ", b);
    // console.log("t ", t);
    // console.log("T: ", T);

    if (buf === 10 && b.length === 0) {
      T.push(t);
      t = 0;
      continue;
    }

    if (buf === 10 && b.length !== 0) {
      const tb = Buffer.from(b);
      t += parseInt(tb.toString("utf8"));
      b = [];

      continue;
    }

    b.push(buf);
  }

  T.push(t);

  T.sort((a, b) => b - a);
  // console.log(T[0]);
  // console.log(T[0] + T[1] + T[2]);
}

run();
