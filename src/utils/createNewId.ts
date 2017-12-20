/* tslint:disable:no-bitwise */

export const createNewId = (): string => {
  let id = '';
  let random;

  for (let i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i === 8 || i === 12 || i === 16 || i === 20) {
      id += '-';
    }

    if (i === 12) {
      id += 4;
    } else {
      id += (i === 16 ? (random & 3 | 8) : random).toString(16);
    }
  }
  return id;
};

/* tslint:enable:no-bitwise */
