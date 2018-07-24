export function setData(oldarr, onearr, goodsId) {
  let len = oldarr.length;
  for (let j = 0; j < len; j++) {
    if (oldarr[j][goodsId] == onearr[goodsId]) {
      return {
        b: true,
        index: j
      };
    }
  }
}

