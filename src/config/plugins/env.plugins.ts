import 'dotenv/config'
import * as env from 'env-var'

export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  MAIL_SERVICE: env.get('MAIL_SERVICE').required().asString(),
  MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
  MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
  PROD: env.get('PROD').required().asBool()
}
