const config = {
  BACKEND_URI:
    process.env.NEXT_PUBLIC_BACKEND_URI_DEV || ("_undefined" as string),
};
export const { BACKEND_URI } = config;
