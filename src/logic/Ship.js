function Ship(length) {
  const hits = Array(length).fill(false);

  function getLength() {
    return length;
  }

  function hit(pos) {
    if (pos >= 0 && pos < length) {
      hits[pos] = true;
    }
  }

  function isSunk() {
    return hits.every(Boolean);
  }

  function getHits() {
    return hits;
  }

  return {
    getLength,
    hit,
    getHits,
    isSunk,
  };
}

export default Ship;
