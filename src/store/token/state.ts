export interface TokenStateInterface {
  userInfo: any,
  title: string,
  back: boolean,
  color: string
}

const state: TokenStateInterface = {
  userInfo: null,
  title: 'AgileFlow',
  back: false,
  color: 'linear-gradient(90deg,#595f69,#2173dc,#696969);'
};

export default state;

