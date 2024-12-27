export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high'
}

export interface LogEntityOptions {
  level: LogSeverityLevel
  message: string
  createdAt?: Date
  origin: string
}

export class LogEntity {
  public message: string
  public level: LogSeverityLevel
  public createdAt: Date
  public origin: string

  constructor(options: LogEntityOptions) {
    const { message, level, origin, createdAt = new Date() } = options
    this.level = level
    this.message = message
    this.createdAt = createdAt
    this.origin = origin
  }

  static fromJson = (json: string): LogEntity => {
    json = json === '' ? '{}' : json
    const { message, level, createdAt, origin } = JSON.parse(json)

    const log = new LogEntity({ message, level, createdAt: new Date(createdAt), origin })

    return log
  }

  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { message, level, origin, createdAt } = object

    const log = new LogEntity({
      message,
      level,
      createdAt,
      origin
    })

    return log
  }
}
