import { mock } from "node:test";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log-repository.impl";

describe("LogRepositoryImpl", () => {
  const mockDataSource = {
    savelog: jest.fn(),
    getLogs: jest.fn(),
  };
  const LogRepository = new LogRepositoryImpl(mockDataSource);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("savelog should call datasource with arguments", async () => {
    const log = { level: LogSeverityLevel.high, message: "test" } as LogEntity;

    await LogRepository.savelog(log);

    expect(mockDataSource.savelog).toHaveBeenCalledWith(log);
  });

  test("getlogs should call datasource with arguments", async () => {
    await LogRepository.getLogs(LogSeverityLevel.low);

    expect(mockDataSource.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low);
  });
});
