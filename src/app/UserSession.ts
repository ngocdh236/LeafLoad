const TokenKey: string = "TokenKey";
const UserIdKey: string = "UserIdKey";
const UsernameKey: string = "UserNameKey"

export class UserSession {

  // accessToken
  public static set accessToken(value: string) {
    localStorage.setItem(TokenKey, value);
  }

  public static get accessToken(): string {
    let abcy = localStorage.getItem(TokenKey);
    console.log(`LocalStorage's accessToken: ${abcy}`);
    return localStorage.getItem(TokenKey);
  }

  // username
  public static set username(value: string) {
    localStorage.setItem(UsernameKey, value);
  }

  public static get username(): string {
    return localStorage.getItem(UsernameKey);
  }

  // userId
  public static set userId(value: string) {
    localStorage.setItem(UserIdKey, value);
  }

  public static get userId(): string {
    return localStorage.getItem(UserIdKey);
  }


  // isUserLoggedIn getter
  public static get isLoggedIn(): boolean {
    let tokentokentokentoken = UserSession.accessToken;
    console.log(`This is the fucking wrong token: ${tokentokentokentoken}`);
    if (tokentokentokentoken) {
      return true;
    }

    return false;
  }

  public static logout() {
    localStorage.removeItem(TokenKey);
    localStorage.removeItem(UserIdKey);
    localStorage.removeItem(UsernameKey);
  }

  public static loginSuccessfullyWithDictionary(dict: any) {
    UserSession.accessToken = dict['token'];
    UserSession.userId = dict['user']['userId'];
    UserSession.username = dict['user']['username'];
  }

}
