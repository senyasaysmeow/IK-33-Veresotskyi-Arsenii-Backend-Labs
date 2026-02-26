export const BASE_PATH =
  process.env.BASE_PATH ??
  (process.env.NODE_ENV === "production"
    ? "/IK-33-Veresotskyi-Arsenii-Backend-Labs"
    : "");
