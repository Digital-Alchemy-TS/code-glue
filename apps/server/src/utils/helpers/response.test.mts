import { TContext } from "@digital-alchemy/core";

import {
  BadGatewayError,
  BadRequestError,
  BandwidthLimitExceededError,
  ConflictError,
  ExpectationFailedError,
  FailedDependencyError,
  ForbiddenError,
  GatewayTimeoutError,
  GoneError,
  HttpStatus,
  HttpVersionNotSupportedError,
  ImATeapotError,
  InsufficientStorageError,
  InternalServerError,
  LengthRequiredError,
  LockedError,
  LoopDetectedError,
  MethodNotAllowedError,
  MisdirectedRequestError,
  NetworkAuthenticationRequiredError,
  NotAcceptableError,
  NotExtendedError,
  NotFoundError,
  NotImplementedError,
  PaymentRequiredError,
  PreconditionFailedError,
  PreconditionRequiredError,
  ProxyAuthenticationRequiredError,
  RequestedRangeNotSatisfiableError,
  RequestEntityTooLargeError,
  RequestHeaderFieldsTooLargeError,
  RequestTimeoutError,
  RequestUriTooLongError,
  ServiceUnavailableError,
  TooEarlyError,
  TooManyRequestsError,
  UnauthorizedError,
  UnavailableForLegalReasonsError,
  UnprocessableEntityError,
  UnsupportedMediaTypeError,
  UpgradeRequiredError,
  VariantAlsoNegotiatesError,
} from ".";

const context = "test" as TContext;

// #MARK: BadRequest
describe("BadRequestError", () => {
  it("should create an instance of BadRequestError with default message", () => {
    const error = new BadRequestError(context);

    expect(error).toBeInstanceOf(BadRequestError);
    expect(error.message).toBe("Bad Request");
    expect(error.status).toBe(HttpStatus.HTTP_400_BAD_REQUEST);
    expect(error.context).toBe(context);
  });

  it("should create an instance of BadRequestError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new BadRequestError(context, customMessage);

    expect(error).toBeInstanceOf(BadRequestError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_400_BAD_REQUEST);
    expect(error.context).toBe(context);
  });
});

// #MARK: Unauthorized
describe("UnauthorizedError", () => {
  it("should create an instance of UnauthorizedError with default message", () => {
    const error = new UnauthorizedError(context);

    expect(error).toBeInstanceOf(UnauthorizedError);
    expect(error.message).toBe("Unauthorized");
    expect(error.status).toBe(HttpStatus.HTTP_401_UNAUTHORIZED);
    expect(error.context).toBe(context);
  });

  it("should create an instance of UnauthorizedError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new UnauthorizedError(context, customMessage);

    expect(error).toBeInstanceOf(UnauthorizedError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_401_UNAUTHORIZED);
    expect(error.context).toBe(context);
  });
});

// #MARK: PaymentRequired
describe("PaymentRequiredError", () => {
  it("should create an instance of PaymentRequiredError with default message", () => {
    const error = new PaymentRequiredError(context);

    expect(error).toBeInstanceOf(PaymentRequiredError);
    expect(error.message).toBe("Payment Required");
    expect(error.status).toBe(HttpStatus.HTTP_402_PAYMENT_REQUIRED);
    expect(error.context).toBe(context);
  });

  it("should create an instance of PaymentRequiredError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new PaymentRequiredError(context, customMessage);

    expect(error).toBeInstanceOf(PaymentRequiredError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_402_PAYMENT_REQUIRED);
    expect(error.context).toBe(context);
  });
});

// #MARK: Forbidden
describe("ForbiddenError", () => {
  it("should create an instance of ForbiddenError with default message", () => {
    const error = new ForbiddenError(context);

    expect(error).toBeInstanceOf(ForbiddenError);
    expect(error.message).toBe("Forbidden");
    expect(error.status).toBe(HttpStatus.HTTP_403_FORBIDDEN);
    expect(error.context).toBe(context);
  });

  it("should create an instance of ForbiddenError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new ForbiddenError(context, customMessage);

    expect(error).toBeInstanceOf(ForbiddenError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_403_FORBIDDEN);
    expect(error.context).toBe(context);
  });
});

// #MARK: NotFound
describe("NotFoundError", () => {
  it("should create an instance of NotFoundError with default message", () => {
    const error = new NotFoundError(context);

    expect(error).toBeInstanceOf(NotFoundError);
    expect(error.message).toBe("Not Found");
    expect(error.status).toBe(HttpStatus.HTTP_404_NOT_FOUND);
    expect(error.context).toBe(context);
  });

  it("should create an instance of NotFoundError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new NotFoundError(context, customMessage);

    expect(error).toBeInstanceOf(NotFoundError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_404_NOT_FOUND);
    expect(error.context).toBe(context);
  });
});

// #MARK: MethodNotAllowed
describe("MethodNotAllowedError", () => {
  it("should create an instance of MethodNotAllowedError with default message", () => {
    const error = new MethodNotAllowedError(context);

    expect(error).toBeInstanceOf(MethodNotAllowedError);
    expect(error.message).toBe("Method Not Allowed");
    expect(error.status).toBe(HttpStatus.HTTP_405_METHOD_NOT_ALLOWED);
    expect(error.context).toBe(context);
  });

  it("should create an instance of MethodNotAllowedError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new MethodNotAllowedError(context, customMessage);

    expect(error).toBeInstanceOf(MethodNotAllowedError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_405_METHOD_NOT_ALLOWED);
    expect(error.context).toBe(context);
  });
});

// #MARK: NotAcceptable
describe("NotAcceptableError", () => {
  it("should create an instance of NotAcceptableError with default message", () => {
    const error = new NotAcceptableError(context);

    expect(error).toBeInstanceOf(NotAcceptableError);
    expect(error.message).toBe("Not Acceptable");
    expect(error.status).toBe(HttpStatus.HTTP_406_NOT_ACCEPTABLE);
    expect(error.context).toBe(context);
  });

  it("should create an instance of NotAcceptableError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new NotAcceptableError(context, customMessage);

    expect(error).toBeInstanceOf(NotAcceptableError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_406_NOT_ACCEPTABLE);
    expect(error.context).toBe(context);
  });
});

// #MARK: ProxyAuthenticationRequired
describe("ProxyAuthenticationRequiredError", () => {
  it("should create an instance of ProxyAuthenticationRequiredError with default message", () => {
    const error = new ProxyAuthenticationRequiredError(context);

    expect(error).toBeInstanceOf(ProxyAuthenticationRequiredError);
    expect(error.message).toBe("Proxy Authentication Required");
    expect(error.status).toBe(
      HttpStatus.HTTP_407_PROXY_AUTHENTICATION_REQUIRED,
    );
    expect(error.context).toBe(context);
  });

  it("should create an instance of ProxyAuthenticationRequiredError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new ProxyAuthenticationRequiredError(context, customMessage);

    expect(error).toBeInstanceOf(ProxyAuthenticationRequiredError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(
      HttpStatus.HTTP_407_PROXY_AUTHENTICATION_REQUIRED,
    );
    expect(error.context).toBe(context);
  });
});

// #MARK: RequestTimeout
describe("RequestTimeoutError", () => {
  it("should create an instance of RequestTimeoutError with default message", () => {
    const error = new RequestTimeoutError(context);

    expect(error).toBeInstanceOf(RequestTimeoutError);
    expect(error.message).toBe("Request Timeout");
    expect(error.status).toBe(HttpStatus.HTTP_408_REQUEST_TIMEOUT);
    expect(error.context).toBe(context);
  });

  it("should create an instance of RequestTimeoutError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new RequestTimeoutError(context, customMessage);

    expect(error).toBeInstanceOf(RequestTimeoutError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_408_REQUEST_TIMEOUT);
    expect(error.context).toBe(context);
  });
});

// #MARK: Conflict
describe("ConflictError", () => {
  it("should create an instance of ConflictError with default message", () => {
    const error = new ConflictError(context);

    expect(error).toBeInstanceOf(ConflictError);
    expect(error.message).toBe("Conflict");
    expect(error.status).toBe(HttpStatus.HTTP_409_CONFLICT);
    expect(error.context).toBe(context);
  });

  it("should create an instance of ConflictError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new ConflictError(context, customMessage);

    expect(error).toBeInstanceOf(ConflictError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_409_CONFLICT);
    expect(error.context).toBe(context);
  });
});

// #MARK: Gone
describe("GoneError", () => {
  it("should create an instance of GoneError with default message", () => {
    const error = new GoneError(context);

    expect(error).toBeInstanceOf(GoneError);
    expect(error.message).toBe("Gone");
    expect(error.status).toBe(HttpStatus.HTTP_410_GONE);
    expect(error.context).toBe(context);
  });

  it("should create an instance of GoneError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new GoneError(context, customMessage);

    expect(error).toBeInstanceOf(GoneError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_410_GONE);
    expect(error.context).toBe(context);
  });
});

// #MARK: LengthRequired
describe("LengthRequiredError", () => {
  it("should create an instance of LengthRequiredError with default message", () => {
    const error = new LengthRequiredError(context);

    expect(error).toBeInstanceOf(LengthRequiredError);
    expect(error.message).toBe("Length Required");
    expect(error.status).toBe(HttpStatus.HTTP_411_LENGTH_REQUIRED);
    expect(error.context).toBe(context);
  });

  it("should create an instance of LengthRequiredError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new LengthRequiredError(context, customMessage);

    expect(error).toBeInstanceOf(LengthRequiredError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_411_LENGTH_REQUIRED);
    expect(error.context).toBe(context);
  });
});

// #MARK: PreconditionFailed
describe("PreconditionFailedError", () => {
  it("should create an instance of PreconditionFailedError with default message", () => {
    const error = new PreconditionFailedError(context);

    expect(error).toBeInstanceOf(PreconditionFailedError);
    expect(error.message).toBe("Precondition Failed");
    expect(error.status).toBe(HttpStatus.HTTP_412_PRECONDITION_FAILED);
    expect(error.context).toBe(context);
  });

  it("should create an instance of PreconditionFailedError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new PreconditionFailedError(context, customMessage);

    expect(error).toBeInstanceOf(PreconditionFailedError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_412_PRECONDITION_FAILED);
    expect(error.context).toBe(context);
  });
});

// #MARK: RequestEntityTooLarge
describe("RequestEntityTooLargeError", () => {
  it("should create an instance of RequestEntityTooLargeError with default message", () => {
    const error = new RequestEntityTooLargeError(context);

    expect(error).toBeInstanceOf(RequestEntityTooLargeError);
    expect(error.message).toBe("Request Entity Too Large");
    expect(error.status).toBe(HttpStatus.HTTP_413_REQUEST_ENTITY_TOO_LARGE);
    expect(error.context).toBe(context);
  });

  it("should create an instance of RequestEntityTooLargeError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new RequestEntityTooLargeError(context, customMessage);

    expect(error).toBeInstanceOf(RequestEntityTooLargeError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_413_REQUEST_ENTITY_TOO_LARGE);
    expect(error.context).toBe(context);
  });
});

// #MARK: RequestUriTooLong
describe("RequestUriTooLongError", () => {
  it("should create an instance of RequestUriTooLongError with default message", () => {
    const error = new RequestUriTooLongError(context);

    expect(error).toBeInstanceOf(RequestUriTooLongError);
    expect(error.message).toBe("Request URI Too Long");
    expect(error.status).toBe(HttpStatus.HTTP_414_REQUEST_URI_TOO_LONG);
    expect(error.context).toBe(context);
  });

  it("should create an instance of RequestUriTooLongError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new RequestUriTooLongError(context, customMessage);

    expect(error).toBeInstanceOf(RequestUriTooLongError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_414_REQUEST_URI_TOO_LONG);
    expect(error.context).toBe(context);
  });
});

// #MARK: UnsupportedMediaType
describe("UnsupportedMediaTypeError", () => {
  it("should create an instance of UnsupportedMediaTypeError with default message", () => {
    const error = new UnsupportedMediaTypeError(context);

    expect(error).toBeInstanceOf(UnsupportedMediaTypeError);
    expect(error.message).toBe("Unsupported Media Type");
    expect(error.status).toBe(HttpStatus.HTTP_415_UNSUPPORTED_MEDIA_TYPE);
    expect(error.context).toBe(context);
  });

  it("should create an instance of UnsupportedMediaTypeError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new UnsupportedMediaTypeError(context, customMessage);

    expect(error).toBeInstanceOf(UnsupportedMediaTypeError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_415_UNSUPPORTED_MEDIA_TYPE);
    expect(error.context).toBe(context);
  });
});

// #MARK: RequestedRangeNotSatisfiable
describe("RequestedRangeNotSatisfiableError", () => {
  it("should create an instance of RequestedRangeNotSatisfiableError with default message", () => {
    const error = new RequestedRangeNotSatisfiableError(context);

    expect(error).toBeInstanceOf(RequestedRangeNotSatisfiableError);
    expect(error.message).toBe("Requested Range Not Satisfiable");
    expect(error.status).toBe(
      HttpStatus.HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE,
    );
    expect(error.context).toBe(context);
  });

  it("should create an instance of RequestedRangeNotSatisfiableError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new RequestedRangeNotSatisfiableError(context, customMessage);

    expect(error).toBeInstanceOf(RequestedRangeNotSatisfiableError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(
      HttpStatus.HTTP_416_REQUESTED_RANGE_NOT_SATISFIABLE,
    );
    expect(error.context).toBe(context);
  });
});

// #MARK: ExpectationFailed
describe("ExpectationFailedError", () => {
  it("should create an instance of ExpectationFailedError with default message", () => {
    const error = new ExpectationFailedError(context);

    expect(error).toBeInstanceOf(ExpectationFailedError);
    expect(error.message).toBe("Expectation Failed");
    expect(error.status).toBe(HttpStatus.HTTP_417_EXPECTATION_FAILED);
    expect(error.context).toBe(context);
  });

  it("should create an instance of ExpectationFailedError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new ExpectationFailedError(context, customMessage);

    expect(error).toBeInstanceOf(ExpectationFailedError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_417_EXPECTATION_FAILED);
    expect(error.context).toBe(context);
  });
});

// #MARK: InternalServer
describe("InternalServerError", () => {
  it("should create an instance of InternalServerError with default message", () => {
    const error = new InternalServerError(context);

    expect(error).toBeInstanceOf(InternalServerError);
    expect(error.message).toBe("Internal Server Error");
    expect(error.status).toBe(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR);
    expect(error.context).toBe(context);
  });

  it("should create an instance of InternalServerError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new InternalServerError(context, customMessage);

    expect(error).toBeInstanceOf(InternalServerError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_500_INTERNAL_SERVER_ERROR);
    expect(error.context).toBe(context);
  });
});

// #MARK: NotImplemented
describe("NotImplementedError", () => {
  it("should create an instance of NotImplementedError with default message", () => {
    const error = new NotImplementedError(context);

    expect(error).toBeInstanceOf(NotImplementedError);
    expect(error.message).toBe("Not Implemented");
    expect(error.status).toBe(HttpStatus.HTTP_501_NOT_IMPLEMENTED);
    expect(error.context).toBe(context);
  });

  it("should create an instance of NotImplementedError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new NotImplementedError(context, customMessage);

    expect(error).toBeInstanceOf(NotImplementedError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_501_NOT_IMPLEMENTED);
    expect(error.context).toBe(context);
  });
});

// #MARK: BadGateway
describe("BadGatewayError", () => {
  it("should create an instance of BadGatewayError with default message", () => {
    const error = new BadGatewayError(context);

    expect(error).toBeInstanceOf(BadGatewayError);
    expect(error.message).toBe("Bad Gateway");
    expect(error.status).toBe(HttpStatus.HTTP_502_BAD_GATEWAY);
    expect(error.context).toBe(context);
  });

  it("should create an instance of BadGatewayError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new BadGatewayError(context, customMessage);

    expect(error).toBeInstanceOf(BadGatewayError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_502_BAD_GATEWAY);
    expect(error.context).toBe(context);
  });
});

// #MARK: ServiceUnavailable
describe("ServiceUnavailableError", () => {
  it("should create an instance of ServiceUnavailableError with default message", () => {
    const error = new ServiceUnavailableError(context);

    expect(error).toBeInstanceOf(ServiceUnavailableError);
    expect(error.message).toBe("Service Unavailable");
    expect(error.status).toBe(HttpStatus.HTTP_503_SERVICE_UNAVAILABLE);
    expect(error.context).toBe(context);
  });

  it("should create an instance of ServiceUnavailableError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new ServiceUnavailableError(context, customMessage);

    expect(error).toBeInstanceOf(ServiceUnavailableError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_503_SERVICE_UNAVAILABLE);
    expect(error.context).toBe(context);
  });
});

// #MARK: GatewayTimeout
describe("GatewayTimeoutError", () => {
  it("should create an instance of GatewayTimeoutError with default message", () => {
    const error = new GatewayTimeoutError(context);

    expect(error).toBeInstanceOf(GatewayTimeoutError);
    expect(error.message).toBe("Gateway Timeout");
    expect(error.status).toBe(HttpStatus.HTTP_504_GATEWAY_TIMEOUT);
    expect(error.context).toBe(context);
  });

  it("should create an instance of GatewayTimeoutError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new GatewayTimeoutError(context, customMessage);

    expect(error).toBeInstanceOf(GatewayTimeoutError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_504_GATEWAY_TIMEOUT);
    expect(error.context).toBe(context);
  });
});

// #MARK: HTTPVersionNotSupported
describe("HTTPVersionNotSupportedError", () => {
  it("should create an instance of HTTPVersionNotSupportedError with default message", () => {
    const error = new HttpVersionNotSupportedError(context);

    expect(error).toBeInstanceOf(HttpVersionNotSupportedError);
    expect(error.message).toBe("HTTP Version Not Supported");
    expect(error.status).toBe(HttpStatus.HTTP_505_HTTP_VERSION_NOT_SUPPORTED);
    expect(error.context).toBe(context);
  });

  it("should create an instance of HTTPVersionNotSupportedError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new HttpVersionNotSupportedError(context, customMessage);

    expect(error).toBeInstanceOf(HttpVersionNotSupportedError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_505_HTTP_VERSION_NOT_SUPPORTED);
    expect(error.context).toBe(context);
  });
});

// #MARK: VariantAlsoNegotiates
describe("VariantAlsoNegotiatesError", () => {
  it("should create an instance of VariantAlsoNegotiatesError with default message", () => {
    const error = new VariantAlsoNegotiatesError(context);

    expect(error).toBeInstanceOf(VariantAlsoNegotiatesError);
    expect(error.message).toBe("Variant Also Negotiates");
    expect(error.status).toBe(HttpStatus.HTTP_506_VARIANT_ALSO_NEGOTIATES);
    expect(error.context).toBe(context);
  });

  it("should create an instance of VariantAlsoNegotiatesError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new VariantAlsoNegotiatesError(context, customMessage);

    expect(error).toBeInstanceOf(VariantAlsoNegotiatesError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_506_VARIANT_ALSO_NEGOTIATES);
    expect(error.context).toBe(context);
  });
});

// #MARK: InsufficientStorage
describe("InsufficientStorageError", () => {
  it("should create an instance of InsufficientStorageError with default message", () => {
    const error = new InsufficientStorageError(context);

    expect(error).toBeInstanceOf(InsufficientStorageError);
    expect(error.message).toBe("Insufficient Storage");
    expect(error.status).toBe(HttpStatus.HTTP_507_INSUFFICIENT_STORAGE);
    expect(error.context).toBe(context);
  });

  it("should create an instance of InsufficientStorageError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new InsufficientStorageError(context, customMessage);

    expect(error).toBeInstanceOf(InsufficientStorageError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_507_INSUFFICIENT_STORAGE);
    expect(error.context).toBe(context);
  });
});

// #MARK: LoopDetected
describe("LoopDetectedError", () => {
  it("should create an instance of LoopDetectedError with default message", () => {
    const error = new LoopDetectedError(context);

    expect(error).toBeInstanceOf(LoopDetectedError);
    expect(error.message).toBe("Loop Detected");
    expect(error.status).toBe(HttpStatus.HTTP_508_LOOP_DETECTED);
    expect(error.context).toBe(context);
  });

  it("should create an instance of LoopDetectedError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new LoopDetectedError(context, customMessage);

    expect(error).toBeInstanceOf(LoopDetectedError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_508_LOOP_DETECTED);
    expect(error.context).toBe(context);
  });
});

// #MARK: NotExtended
describe("NotExtendedError", () => {
  it("should create an instance of NotExtendedError with default message", () => {
    const error = new NotExtendedError(context);

    expect(error).toBeInstanceOf(NotExtendedError);
    expect(error.message).toBe("Not Extended");
    expect(error.status).toBe(HttpStatus.HTTP_510_NOT_EXTENDED);
    expect(error.context).toBe(context);
  });

  it("should create an instance of NotExtendedError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new NotExtendedError(context, customMessage);

    expect(error).toBeInstanceOf(NotExtendedError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_510_NOT_EXTENDED);
    expect(error.context).toBe(context);
  });
});

// #MARK: NetworkAuthenticationRequired
describe("NetworkAuthenticationRequiredError", () => {
  it("should create an instance of NetworkAuthenticationRequiredError with default message", () => {
    const error = new NetworkAuthenticationRequiredError(context);

    expect(error).toBeInstanceOf(NetworkAuthenticationRequiredError);
    expect(error.message).toBe("Network Authentication Required");
    expect(error.status).toBe(
      HttpStatus.HTTP_511_NETWORK_AUTHENTICATION_REQUIRED,
    );
    expect(error.context).toBe(context);
  });

  it("should create an instance of NetworkAuthenticationRequiredError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new NetworkAuthenticationRequiredError(
      context,
      customMessage,
    );

    expect(error).toBeInstanceOf(NetworkAuthenticationRequiredError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(
      HttpStatus.HTTP_511_NETWORK_AUTHENTICATION_REQUIRED,
    );
    expect(error.context).toBe(context);
  });
});

// #MARK: ImATeapot
describe("ImATeapotError", () => {
  it("should create an instance of ImATeapotError with default message", () => {
    const error = new ImATeapotError(context);

    expect(error).toBeInstanceOf(ImATeapotError);
    expect(error.message).toBe("I'm a teapot");
    expect(error.status).toBe(HttpStatus.HTTP_418_IM_A_TEAPOT);
    expect(error.context).toBe(context);
  });

  it("should create an instance of ImATeapotError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new ImATeapotError(context, customMessage);

    expect(error).toBeInstanceOf(ImATeapotError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_418_IM_A_TEAPOT);
    expect(error.context).toBe(context);
  });
});

// #MARK: MisdirectedRequest
describe("MisdirectedRequestError", () => {
  it("should create an instance of MisdirectedRequestError with default message", () => {
    const error = new MisdirectedRequestError(context);

    expect(error).toBeInstanceOf(MisdirectedRequestError);
    expect(error.message).toBe("Misdirected Request");
    expect(error.status).toBe(HttpStatus.HTTP_421_MISDIRECTED_REQUEST);
    expect(error.context).toBe(context);
  });

  it("should create an instance of MisdirectedRequestError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new MisdirectedRequestError(context, customMessage);

    expect(error).toBeInstanceOf(MisdirectedRequestError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_421_MISDIRECTED_REQUEST);
    expect(error.context).toBe(context);
  });
});

// #MARK: UnprocessableEntity
describe("UnprocessableEntityError", () => {
  it("should create an instance of UnprocessableEntityError with default message", () => {
    const error = new UnprocessableEntityError(context);

    expect(error).toBeInstanceOf(UnprocessableEntityError);
    expect(error.message).toBe("Unprocessable Entity");
    expect(error.status).toBe(HttpStatus.HTTP_422_UNPROCESSABLE_ENTITY);
    expect(error.context).toBe(context);
  });

  it("should create an instance of UnprocessableEntityError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new UnprocessableEntityError(context, customMessage);

    expect(error).toBeInstanceOf(UnprocessableEntityError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_422_UNPROCESSABLE_ENTITY);
    expect(error.context).toBe(context);
  });
});

// #MARK: Locked
describe("LockedError", () => {
  it("should create an instance of LockedError with default message", () => {
    const error = new LockedError(context);

    expect(error).toBeInstanceOf(LockedError);
    expect(error.message).toBe("Locked");
    expect(error.status).toBe(HttpStatus.HTTP_423_LOCKED);
    expect(error.context).toBe(context);
  });

  it("should create an instance of LockedError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new LockedError(context, customMessage);

    expect(error).toBeInstanceOf(LockedError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_423_LOCKED);
    expect(error.context).toBe(context);
  });
});

// #MARK: FailedDependency
describe("FailedDependencyError", () => {
  it("should create an instance of FailedDependencyError with default message", () => {
    const error = new FailedDependencyError(context);

    expect(error).toBeInstanceOf(FailedDependencyError);
    expect(error.message).toBe("Failed Dependency");
    expect(error.status).toBe(HttpStatus.HTTP_424_FAILED_DEPENDENCY);
    expect(error.context).toBe(context);
  });

  it("should create an instance of FailedDependencyError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new FailedDependencyError(context, customMessage);

    expect(error).toBeInstanceOf(FailedDependencyError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_424_FAILED_DEPENDENCY);
    expect(error.context).toBe(context);
  });
});

// #MARK: UnorderedCollection
describe("UnorderedCollectionError", () => {
  it("should create an instance of TooEarlyError with default message", () => {
    const error = new TooEarlyError(context);

    expect(error).toBeInstanceOf(TooEarlyError);
    expect(error.message).toBe("Too Early");
    expect(error.status).toBe(HttpStatus.HTTP_425_TOO_EARLY);
    expect(error.context).toBe(context);
  });

  it("should create an instance of UnorderedCollectionError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new TooEarlyError(context, customMessage);

    expect(error).toBeInstanceOf(TooEarlyError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_425_TOO_EARLY);
    expect(error.context).toBe(context);
  });
});

// #MARK: UpgradeRequired
describe("UpgradeRequiredError", () => {
  it("should create an instance of UpgradeRequiredError with default message", () => {
    const error = new UpgradeRequiredError(context);

    expect(error).toBeInstanceOf(UpgradeRequiredError);
    expect(error.message).toBe("Upgrade Required");
    expect(error.status).toBe(HttpStatus.HTTP_426_UPGRADE_REQUIRED);
    expect(error.context).toBe(context);
  });

  it("should create an instance of UpgradeRequiredError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new UpgradeRequiredError(context, customMessage);

    expect(error).toBeInstanceOf(UpgradeRequiredError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_426_UPGRADE_REQUIRED);
    expect(error.context).toBe(context);
  });
});

// #MARK: PreconditionRequired
describe("PreconditionRequiredError", () => {
  it("should create an instance of PreconditionRequiredError with default message", () => {
    const error = new PreconditionRequiredError(context);

    expect(error).toBeInstanceOf(PreconditionRequiredError);
    expect(error.message).toBe("Precondition Required");
    expect(error.status).toBe(HttpStatus.HTTP_428_PRECONDITION_REQUIRED);
    expect(error.context).toBe(context);
  });

  it("should create an instance of PreconditionRequiredError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new PreconditionRequiredError(context, customMessage);

    expect(error).toBeInstanceOf(PreconditionRequiredError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_428_PRECONDITION_REQUIRED);
    expect(error.context).toBe(context);
  });
});

// #MARK: TooManyRequests
describe("TooManyRequestsError", () => {
  it("should create an instance of TooManyRequestsError with default message", () => {
    const error = new TooManyRequestsError(context);

    expect(error).toBeInstanceOf(TooManyRequestsError);
    expect(error.message).toBe("Too Many Requests");
    expect(error.status).toBe(HttpStatus.HTTP_429_TOO_MANY_REQUESTS);
    expect(error.context).toBe(context);
  });

  it("should create an instance of TooManyRequestsError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new TooManyRequestsError(context, customMessage);

    expect(error).toBeInstanceOf(TooManyRequestsError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_429_TOO_MANY_REQUESTS);
    expect(error.context).toBe(context);
  });
});

// #MARK: RequestHeaderFieldsTooLarge
describe("RequestHeaderFieldsTooLargeError", () => {
  it("should create an instance of RequestHeaderFieldsTooLargeError with default message", () => {
    const error = new RequestHeaderFieldsTooLargeError(context);

    expect(error).toBeInstanceOf(RequestHeaderFieldsTooLargeError);
    expect(error.message).toBe("Request Header Fields Too Large");
    expect(error.status).toBe(
      HttpStatus.HTTP_431_REQUEST_HEADER_FIELDS_TOO_LARGE,
    );
    expect(error.context).toBe(context);
  });

  it("should create an instance of RequestHeaderFieldsTooLargeError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new RequestHeaderFieldsTooLargeError(context, customMessage);

    expect(error).toBeInstanceOf(RequestHeaderFieldsTooLargeError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(
      HttpStatus.HTTP_431_REQUEST_HEADER_FIELDS_TOO_LARGE,
    );
    expect(error.context).toBe(context);
  });
});

// #MARK: UnavailableForLegalReasons
describe("UnavailableForLegalReasonsError", () => {
  it("should create an instance of UnavailableForLegalReasonsError with default message", () => {
    const error = new UnavailableForLegalReasonsError(context);

    expect(error).toBeInstanceOf(UnavailableForLegalReasonsError);
    expect(error.message).toBe("Unavailable For Legal Reasons");
    expect(error.status).toBe(
      HttpStatus.HTTP_451_UNAVAILABLE_FOR_LEGAL_REASONS,
    );
    expect(error.context).toBe(context);
  });

  it("should create an instance of UnavailableForLegalReasonsError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new UnavailableForLegalReasonsError(context, customMessage);

    expect(error).toBeInstanceOf(UnavailableForLegalReasonsError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(
      HttpStatus.HTTP_451_UNAVAILABLE_FOR_LEGAL_REASONS,
    );
    expect(error.context).toBe(context);
  });
});

// #MARK: BandwidthLimitExceeded
describe("BandwidthLimitExceededError", () => {
  it("should create an instance of BandwidthLimitExceededError with default message", () => {
    const error = new BandwidthLimitExceededError(context);

    expect(error).toBeInstanceOf(BandwidthLimitExceededError);
    expect(error.message).toBe("Bandwidth Limit Exceeded");
    expect(error.status).toBe(HttpStatus.HTTP_509_BANDWIDTH_LIMIT_EXCEEDED);
    expect(error.context).toBe(context);
  });

  it("should create an instance of BandwidthLimitExceededError with custom message", () => {
    const customMessage = "Custom Error Message";
    const error = new BandwidthLimitExceededError(context, customMessage);

    expect(error).toBeInstanceOf(BandwidthLimitExceededError);
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(HttpStatus.HTTP_509_BANDWIDTH_LIMIT_EXCEEDED);
    expect(error.context).toBe(context);
  });
});
