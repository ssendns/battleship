function Ship(length) {
  const hits = Array(length).fill(false);

  function hit(pos) {
    if (pos >= 0 && pos < length) {
      hits[pos] = true;
    }
  }

  function isSunk() {
    return hits.every(Boolean);
  }

  return {
    length,
    hit,
    hits,
    isSunk,
  };
}

export default Ship;
