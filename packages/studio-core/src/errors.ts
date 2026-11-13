/** Structured failures shared by host routes and model tools. */
import { HarnessError } from "@deepseek-ai/dsh-error";
export class StudioError extends HarnessError {
  constructor(
    code: string,
    message: string,
    readonly status = 400,
    options?: ErrorOptions,
  ) {
    super(message, code, options);
    this.name = "StudioError";
  }
}
