import { CronService } from "./cron-service";

describe("CronService", () => {
  const mockOnTick = jest.fn();

  test("should create a job", (done) => {
    const job = CronService.createJob("* * * * * *", () => {});

    setTimeout(() => {
      expect(mockOnTick).toHaveBeenCalledTimes(2);

      job.stop();
      done();
    }, 2000);
  });
});
