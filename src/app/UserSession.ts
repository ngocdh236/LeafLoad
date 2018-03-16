const TokenKey: string = "TokenKey";
const UserIdKey: string = "UserIdKey";
const UsernameKey: string = "UserNameKey";
const EmailKey: string = "EmailKey";

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

  // email
  public static set email(value: string) {
    localStorage.setItem(EmailKey, value);
  }

  public static get email(): string {
    return localStorage.getItem(EmailKey);
  }

  // isUserLoggedIn getter
  public static get isLoggedIn(): boolean {
    if (UserSession.accessToken) {
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

    let userInfo = dict['user'];
    UserSession.updateWithNewInfo(userInfo);
  }

  public static updateWithNewInfo(newInfo: any) {
    if (newInfo) {
      let userId = newInfo['user_id'];
      if (userId) { UserSession.userId = userId; }

      let email = newInfo['email'];
      if (email) { UserSession.email = email; }

      let username = newInfo['username'];
      if (username) { UserSession.username = username; }
    }
  }

}
