export class AppConstants {
	
    public static get baseServer(): string { return "https://bbmperson-api.herokuapp.com/"}

	public static get baseLogin(): string { return this.baseServer + "login"}

	public static get baseUrl(): string { return this.baseServer + "usuario/"}
}