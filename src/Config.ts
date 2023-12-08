export const clientScope = "openid profile ProductivityTools.Meetings.API";

export type Config = {
  pathBase: string;
};

const dev = {
  //clientId:"ptexpensesprod",
  pathBase: "http://localhost:5232",
  //stsAuthority : 'https://identityserver.productivitytools.top:8010/',
  //clientRoot : 'http://localhost:3000/',
};

const prod = {
  //clientId:"ptexpensesprod",
  pathBase: "https://apitransfers.productivitytools.top:8090",
  //stsAuthority : 'https://identityserver.productivitytools.top:8010/',
  //clientRoot : 'https://meetingsweb.z13.web.core.windows.net/', ddddd
};

export const config: Config = process.env.NODE_ENV === "development" ? dev : prod;
