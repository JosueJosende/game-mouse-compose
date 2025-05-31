export const letterFrequencies: { [key: string]: { [letter: string]: number } } = {
  easy: {
    a: 6,
    b: 2,
    c: 3,
    d: 4,
    e: 6,
    f: 2,
    g: 2,
    h: 6,
    i: 6,
    j: 1,
    k: 1,
    l: 4,
    m: 2,
    n: 6,
    o: 6,
    p: 2,
    q: 1,
    r: 6,
    s: 4,
    t: 6,
    u: 3,
    v: 2,
    w: 0,
    x: 0.1,
    y: 0.2,
    z: 0.1
  },
  medium: {
    a: 6,
    b: 2,
    c: 3,
    d: 3,
    e: 6,
    f: 2,
    g: 2,
    h: 5,
    i: 6,
    j: 1,
    k: 1,
    l: 4,
    m: 2,
    n: 5,
    o: 6,
    p: 2,
    q: 1,
    r: 5,
    s: 5,
    t: 5,
    u: 3,
    v: 2,
    w: 0,
    x: 0.1,
    y: 0.2,
    z: 0.1
  },
  hard: {
    a: 6,
    b: 2,
    c: 3,
    d: 3,
    e: 6,
    f: 2,
    g: 2,
    h: 5,
    i: 6,
    j: 1,
    k: 1,
    l: 4,
    m: 2,
    n: 5,
    o: 6,
    p: 2,
    q: 1,
    r: 5,
    s: 5,
    t: 5,
    u: 3,
    v: 2,
    w: 0,
    x: 0.1,
    y: 0.2,
    z: 0.1
  }
}

export const timeMap: { [key: string]: number } = {
  easy: 60, // 3 minutes
  medium: 120, // 2 minutes
  hard: 180 // 1 minute
}

export const lengthPannel: { [key: string]: number[] } = {
  easy: [6, 5],
  medium: [7, 6],
  hard: [8, 7]
}