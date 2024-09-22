import 'dotenv/config'
import * as env from 'env-var'

export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
  MAIL_EMAIL: env.get('MAIL_EMAIL').required().asEmailString(),
  PROD: env.get('PROD').required().asBool()
}
