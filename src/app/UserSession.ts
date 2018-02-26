const TokenKey: string = "TokenKey";
const UserIdKey: string = "UserIdKey";
const UsernameKey: string = "UserNameKey"

export class UserSession {

  // accessToken
  public static set accessToken(value: string) {
    localStorage.setItem(TokenKey, value);
  }

  public static get accessToken(): string {
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
  public static get isUserLoggedIn(): boolean {
    return UserSession.accessToken != null && UserSession.accessToken.trim() !== '';
  }

  public static logout() {
    UserSession.accessToken = null;
    UserSession.username = null;
    UserSession.userId = null;
  }

  public static loginSuccessfullyWithDictionary(dict: any) {
    UserSession.accessToken = dict['token'];
    UserSession.userId = dict['user']['userId'];
    UserSession.username = dict['user']['username'];
  }

}
