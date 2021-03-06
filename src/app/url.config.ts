
export class UrlConfig {
    public static readonly BACKEND_BASE_URL: string = "virtserver.swaggerhub.com/s-gbz/MemeScout25";

    public static readonly USER_REGISTER: string = "/user/register";
    public static readonly USER_LOGIN: string = "/user/login";
    public static readonly USER_PROFILE: string = "/user/profile";
    public static readonly USER_PROFILE_EDIT: string = "/user/profile/edit";
    public static readonly USER_GET_MESSAGES: string = "/user/messages";
    public static readonly USER_WRITE_MESSAGE: string = "/user/messages/write";

    public static readonly MEMES: string = "/memes";
    public static readonly MEMES_RATE: string = "/memes/rate";
    public static readonly MEMES_UPLOAD: string = "/memes/upload";
}