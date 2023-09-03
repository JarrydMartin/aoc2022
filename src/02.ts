import { open } from "node:fs/promises";

async function run() {
  const fd = await open("./src/input/02_input.txt");

  // Re are foing to read steam frm the file.
  // since we know the input is well know, of 4 bytes
  // A Y \n = 4 bytes,
  const s = fd.createReadStream({
    highWaterMark: 4,
  });

  // We can then then stream each of the 4 (each line)
  let T_1 = 0;
  let T_2 = 0;
  for await (let t of s) {
    // t[0] is my opponent
    // t[2] is /**

    // First Star
    // My oppoent (t[0]) values for A, B and C are 65, 66 and 67 respectively
    // My(t[2]) dec values are 88, 89 and 90 respectively
    //:
    // winning score
    // (my value - op value) add 2 so we can shift the following Mod of 3 so that a lose, draw, win = 0, 1, 2 respectively
    // Then times by 3 to get the needed scale, ie 0 = lose, 3 = draw, and 6 = win.
    //
    // Then the points for the move is simply subscrating my value by 87.
    // You will see that rock = 88 - 87 = 1, paper = 2 and scissors = 3
    //
    // Simply add all together and add to the total (T)
    T_1 += ((t[2] - t[0] + 2) % 3) * 3 + t[2] - 87;

    // Second Star
    // The logic is given a draw, loss or win, I must add 0, 2 or 1 respectively to my opponents hand.
    // eg, if they go Rock (0) and I must draw (+0) then I must throw Rock(0) so 0 + 0 = 0.
    // I add 1 so that rock = 1, paper = 2, and scissors = 3.
    T_2 += ((t[0] + t[2] - 151) % 3) + 1 + (t[2] - 88) * 3;
  }
  console.log(T_1);
  console.log(T_2);
}

run();
