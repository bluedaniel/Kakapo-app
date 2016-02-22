// [1, [2, [3, [4]], 5]] → [1, 2, 3, 4, 5]
export default obj => {
  const encodedObj = Object.keys(obj).reduce((a, k) => {
    a.push(`${k}=${encodeURIComponent(obj[k])}`);
    return a;
  }, []);
  return `?${encodedObj.join('&')}`;
};
