export const getUrlNames = (arr) => {
  return arr.map((obj) => {
    const name = obj.product.name;
    const formatName = name.toLowerCase().split(' ').join('-');
    return formatName;
  });
};

export const getTitleNames = (arr) => {
  return arr.map((obj) => {
    const name = obj.product?.name ?? obj;
    const formatName = name
      .replace(/-/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    return formatName;
  });
};
