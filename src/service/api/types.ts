export interface RequestPhoneAreaCode {
  app_id: string;
  app_secret: string;
}

export interface ResponsePhoneAreaCode {
  code: number;
  data: {
    enUs: string;
    zhCn: string;
    phoneCode: string;
  }[];
  message: string;
}
