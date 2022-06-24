export class UserToken {
  constructor(
    private token: string,
    private tokenExpirationDate: Date
  ) {}

  get userToken() {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }
    return this.token;
  }
}
