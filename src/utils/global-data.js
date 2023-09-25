//gets global data from the environment variables using Node.js
//and if not then it will set the default values

export const getGlobalData = () => {
  const name = process.env.BLOG_NAME
    ? decodeURI(process.env.BLOG_NAME)
    : 'CuteAsset';
  const blogTitle = process.env.BLOG_TITLE
    ? decodeURI(process.env.BLOG_TITLE)
    : 'CuteAsset Store - Buy and Sell Cute Assets such as Overlays, Emotes, Alerts, Panels, and more! Get the best deals for your stream!';
  const footerText = process.env.BLOG_FOOTER_TEXT
    ? decodeURI(process.env.BLOG_FOOTER_TEXT)
    : 'All rights reserved.';

  return {
    name,
    blogTitle,
    footerText,
  };
};
