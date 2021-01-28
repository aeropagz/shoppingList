let enviroment = {
  prodURL: "https://simplelist.de",
  devURL: "http://192.168.50.47:4200",
  production: process.env.EXPRESSPROD || null,
};
enviroment.frontUrl = enviroment.production
  ? enviroment.prodURL
  : enviroment.devURL;

export { enviroment };
