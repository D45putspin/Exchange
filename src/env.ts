export const ENV_VARIABLES = {
  EXCHANGE_BASE_URL:
    process.env.EXCHANGE_BASE_URL ||
    'https://openexchangerates.org/api/latest.json?app_id=',
  EXCHANGE_API_KEY:
    process.env.EXCHANGE_API_KEY || '"4e1f47a4f17e4d58a19a0e419fb8e2e9"',
};
