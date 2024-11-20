/* eslint-disable @typescript-eslint/no-magic-numbers */
import { TContext } from "@digital-alchemy/core";

export enum HttpStatus {
  // Informational Responses
  HTTP_100_CONTINUE = 100,
  HTTP_101_SWITCHING_PROTOCOLS = 101,
  HTTP_102_PROCESSING = 102,
  HTTP_103_EARLY_HINTS = 103,

  // Successful Responses
  HTTP_200_OK = 200,
  HTTP_201_CREATED = 201,
  HTTP_202_ACCEPTED = 202,
  HTTP_203_NON_AUTHORITATIVE_INFORMATION = 203,
  HTTP_204_NO_CONTENT = 204,
  HTTP_205_RESET_CONTENT = 205,
  HTTP_206_PARTIAL_CONTENT = 206,
  HTTP_207_MULTI_STATUS = 207,
  HTTP_208_ALREADY_REPORTED = 208,
  HTTP_226_IM_USED = 226,

  // Redirection Messages
  HTTP_300_MULTIPLE_CHOICES = 300,
  HTTP_301_MOVED_PERMANENTLY = 301,
  HTTP_302_FOUND = 302,
  HTTP_303_SEE_OTHER = 303,
  HTTP_304_NOT_MODIFIED = 304,
  HTTP_305_USE_PROXY = 305,
  HTTP_306_RESERVED = 306,
  HTTP_307_TEMPORARY_REDIRECT = 307,
  HTTP_308_PERMANENT_REDIRECT = 308,

  // Client Error Responses
  HTTP_400_BAD_REQUEST = 400,
  HTTP_401_UNAUTHORIZED = 401,
  HTTP_402_PAYMENT_REQUIRED = 402,
  HTTP_403_FORBIDDEN = 403,
  HTTP_404_NOT_FOUND = 404,
  HTTP_405_METHOD_NOT_ALLOWED = 405,
  HTTP_406_NOT_ACCEPTABLE = 406,
  HTTP_407_PROXY_AUTHENTICATION_REQUIRED = 407,
  HTTP_408_REQUEST_TIMEOUT = 408,
  HTTP_409_CONFLICT = 409,
  HTTP_410_GONE = 410,
  HTTP_411_LENGTH_REQUIRED = 411,
  HTTP_412_PRECONDITION_FAILED = 412,
  HTTP_413_REQUEST_ENTITY_TOO_LARGE = 413,
  HTTP_414_REQUEST_URI_TOO_LONG = 414,
  HTTP_415_UNSUPPORTED_MEDIA_TYPE = 415,
  HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  HTTP_417_EXPECTATION_FAILED = 417,
  HTTP_418_IM_A_TEAPOT = 418,
  HTTP_421_MISDIRECTED_REQUEST = 421,
  HTTP_422_UNPROCESSABLE_ENTITY = 422,
  HTTP_423_LOCKED = 423,
  HTTP_424_FAILED_DEPENDENCY = 424,
  HTTP_425_TOO_EARLY = 425,
  HTTP_426_UPGRADE_REQUIRED = 426,
  HTTP_428_PRECONDITION_REQUIRED = 428,
  HTTP_429_TOO_MANY_REQUESTS = 429,
  HTTP_431_REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
  HTTP_451_UNAVAILABLE_FOR_LEGAL_REASONS = 451,

  // Server Error Responses
  HTTP_500_INTERNAL_SERVER_ERROR = 500,
  HTTP_501_NOT_IMPLEMENTED = 501,
  HTTP_502_BAD_GATEWAY = 502,
  HTTP_503_SERVICE_UNAVAILABLE = 503,
  HTTP_504_GATEWAY_TIMEOUT = 504,
  HTTP_505_HTTP_VERSION_NOT_SUPPORTED = 505,
  HTTP_506_VARIANT_ALSO_NEGOTIATES = 506,
  HTTP_507_INSUFFICIENT_STORAGE = 507,
  HTTP_508_LOOP_DETECTED = 508,
  HTTP_509_BANDWIDTH_LIMIT_EXCEEDED = 509,
  HTTP_510_NOT_EXTENDED = 510,
  HTTP_511_NETWORK_AUTHENTICATION_REQUIRED = 511,
}
export class BadRequestError extends Error {
  public status = HttpStatus.HTTP_400_BAD_REQUEST;

  constructor(
    public context: TContext,
    message = "Bad Request",
  ) {
    super(message);
  }
}

export class UnauthorizedError extends Error {
  public status = HttpStatus.HTTP_401_UNAUTHORIZED;

  constructor(
    public context: TContext,
    message = "Unauthorized",
  ) {
    super(message);
  }
}

export class PaymentRequiredError extends Error {
  public status = HttpStatus.HTTP_402_PAYMENT_REQUIRED;

  constructor(
    public context: TContext,
    message = "Payment Required",
  ) {
    super(message);
  }
}

export class ForbiddenError extends Error {
  public status = HttpStatus.HTTP_403_FORBIDDEN;

  constructor(
    public context: TContext,
    message = "Forbidden",
  ) {
    super(message);
  }
}

export class NotFoundError extends Error {
  public status = HttpStatus.HTTP_404_NOT_FOUND;

  constructor(
    public context: TContext,
    message = "Not Found",
  ) {
    super(message);
  }
}

export class MethodNotAllowedError extends Error {
  public status = HttpStatus.HTTP_405_METHOD_NOT_ALLOWED;

  constructor(
    public context: TContext,
    message = "Method Not Allowed",
  ) {
    super(message);
  }
}

export class NotAcceptableError extends Error {
  public status = HttpStatus.HTTP_406_NOT_ACCEPTABLE;

  constructor(
    public context: TContext,
    message = "Not Acceptable",
  ) {
    super(message);
  }
}

export class ProxyAuthenticationRequiredError extends Error {
  public status = HttpStatus.HTTP_407_PROXY_AUTHENTICATION_REQUIRED;

  constructor(
    public context: TContext,
    message = "Proxy Authentication Required",
  ) {
    super(message);
  }
}

export class RequestTimeoutError extends Error {
  public status = HttpStatus.HTTP_408_REQUEST_TIMEOUT;

  constructor(
    public context: TContext,
    message = "Request Timeout",
  ) {
    super(message);
  }
}

export class ConflictError extends Error {
  public status = HttpStatus.HTTP_409_CONFLICT;

  constructor(
    public context: TContext,
    message = "Conflict",
  ) {
    super(message);
  }
}

export class GoneError extends Error {
  public status = HttpStatus.HTTP_410_GONE;

  constructor(
    public context: TContext,
    message = "Gone",
  ) {
    super(message);
  }
}

export class LengthRequiredError extends Error {
  public status = HttpStatus.HTTP_411_LENGTH_REQUIRED;

  constructor(
    public context: TContext,
    message = "Length Required",
  ) {
    super(message);
  }
}

export class PreconditionFailedError extends Error {
  public status = HttpStatus.HTTP_412_PRECONDITION_FAILED;

  constructor(
    public context: TContext,
    message = "Precondition Failed",
  ) {
    super(message);
  }
}

export class RequestEntityTooLargeError extends Error {
  public status = HttpStatus.HTTP_413_REQUEST_ENTITY_TOO_LARGE;

  constructor(
    public context: TContext,
    message = "Request Entity Too Large",
  ) {
    super(message);
  }
}

export class RequestUriTooLongError extends Error {
  public status = HttpStatus.HTTP_414_REQUEST_URI_TOO_LONG;

  constructor(
    public context: TContext,
    message = "Request URI Too Long",
  ) {
    super(message);
  }
}

export class UnsupportedMediaTypeError extends Error {
  public status = HttpStatus.HTTP_415_UNSUPPORTED_MEDIA_TYPE;

  constructor(
    public context: TContext,
    message = "Unsupported Media Type",
  ) {
    super(message);
  }
}

export class RequestedRangeNotSatisfiableError extends Error {
  public status = HttpStatus.HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE;

  constructor(
    public context: TContext,
    message = "Requested Range Not Satisfiable",
  ) {
    super(message);
  }
}

export class ExpectationFailedError extends Error {
  public status = HttpStatus.HTTP_417_EXPECTATION_FAILED;

  constructor(
    public context: TContext,
    message = "Expectation Failed",
  ) {
    super(message);
  }
}

export class ImATeapotError extends Error {
  public status = HttpStatus.HTTP_418_IM_A_TEAPOT;

  constructor(
    public context: TContext,
    message = "I'm a teapot",
  ) {
    super(message);
  }
}

export class MisdirectedRequestError extends Error {
  public status = HttpStatus.HTTP_421_MISDIRECTED_REQUEST;

  constructor(
    public context: TContext,
    message = "Misdirected Request",
  ) {
    super(message);
  }
}

export class UnprocessableEntityError extends Error {
  public status = HttpStatus.HTTP_422_UNPROCESSABLE_ENTITY;

  constructor(
    public context: TContext,
    message = "Unprocessable Entity",
  ) {
    super(message);
  }
}

export class LockedError extends Error {
  public status = HttpStatus.HTTP_423_LOCKED;

  constructor(
    public context: TContext,
    message = "Locked",
  ) {
    super(message);
  }
}

export class FailedDependencyError extends Error {
  public status = HttpStatus.HTTP_424_FAILED_DEPENDENCY;

  constructor(
    public context: TContext,
    message = "Failed Dependency",
  ) {
    super(message);
  }
}

export class TooEarlyError extends Error {
  public status = HttpStatus.HTTP_425_TOO_EARLY;

  constructor(
    public context: TContext,
    message = "Too Early",
  ) {
    super(message);
  }
}

export class UpgradeRequiredError extends Error {
  public status = HttpStatus.HTTP_426_UPGRADE_REQUIRED;

  constructor(
    public context: TContext,
    message = "Upgrade Required",
  ) {
    super(message);
  }
}

export class PreconditionRequiredError extends Error {
  public status = HttpStatus.HTTP_428_PRECONDITION_REQUIRED;

  constructor(
    public context: TContext,
    message = "Precondition Required",
  ) {
    super(message);
  }
}

export class TooManyRequestsError extends Error {
  public status = HttpStatus.HTTP_429_TOO_MANY_REQUESTS;

  constructor(
    public context: TContext,
    message = "Too Many Requests",
  ) {
    super(message);
  }
}

export class RequestHeaderFieldsTooLargeError extends Error {
  public status = HttpStatus.HTTP_431_REQUEST_HEADER_FIELDS_TOO_LARGE;

  constructor(
    public context: TContext,
    message = "Request Header Fields Too Large",
  ) {
    super(message);
  }
}

export class UnavailableForLegalReasonsError extends Error {
  public status = HttpStatus.HTTP_451_UNAVAILABLE_FOR_LEGAL_REASONS;

  constructor(
    public context: TContext,
    message = "Unavailable For Legal Reasons",
  ) {
    super(message);
  }
}

export class NotImplementedError extends Error {
  public status = HttpStatus.HTTP_501_NOT_IMPLEMENTED;

  constructor(
    public context: TContext,
    message = "Not Implemented",
  ) {
    super(message);
  }
}

export class BadGatewayError extends Error {
  public status = HttpStatus.HTTP_502_BAD_GATEWAY;

  constructor(
    public context: TContext,
    message = "Bad Gateway",
  ) {
    super(message);
  }
}

export class ServiceUnavailableError extends Error {
  public status = HttpStatus.HTTP_503_SERVICE_UNAVAILABLE;

  constructor(
    public context: TContext,
    message = "Service Unavailable",
  ) {
    super(message);
  }
}

export class GatewayTimeoutError extends Error {
  public status = HttpStatus.HTTP_504_GATEWAY_TIMEOUT;

  constructor(
    public context: TContext,
    message = "Gateway Timeout",
  ) {
    super(message);
  }
}

export class HttpVersionNotSupportedError extends Error {
  public status = HttpStatus.HTTP_505_HTTP_VERSION_NOT_SUPPORTED;

  constructor(
    public context: TContext,
    message = "HTTP Version Not Supported",
  ) {
    super(message);
  }
}

export class VariantAlsoNegotiatesError extends Error {
  public status = HttpStatus.HTTP_506_VARIANT_ALSO_NEGOTIATES;

  constructor(
    public context: TContext,
    message = "Variant Also Negotiates",
  ) {
    super(message);
  }
}

export class InsufficientStorageError extends Error {
  public status = HttpStatus.HTTP_507_INSUFFICIENT_STORAGE;

  constructor(
    public context: TContext,
    message = "Insufficient Storage",
  ) {
    super(message);
  }
}

export class LoopDetectedError extends Error {
  public status = HttpStatus.HTTP_508_LOOP_DETECTED;

  constructor(
    public context: TContext,
    message = "Loop Detected",
  ) {
    super(message);
  }
}

export class BandwidthLimitExceededError extends Error {
  public status = HttpStatus.HTTP_509_BANDWIDTH_LIMIT_EXCEEDED;

  constructor(
    public context: TContext,
    message = "Bandwidth Limit Exceeded",
  ) {
    super(message);
  }
}

export class NotExtendedError extends Error {
  public status = HttpStatus.HTTP_510_NOT_EXTENDED;

  constructor(
    public context: TContext,
    message = "Not Extended",
  ) {
    super(message);
  }
}

export class NetworkAuthenticationRequiredError extends Error {
  public status = HttpStatus.HTTP_511_NETWORK_AUTHENTICATION_REQUIRED;

  constructor(
    public context: TContext,
    message = "Network Authentication Required",
  ) {
    super(message);
  }
}

export class InternalServerError extends Error {
  public status = HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR;

  constructor(
    public context: TContext,
    message = "Internal Server Error",
  ) {
    super(message);
  }
}
