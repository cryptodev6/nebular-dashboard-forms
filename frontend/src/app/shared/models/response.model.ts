export class ErrorResponseMessage{
    status: number;
    errors: Error[];
}

export class Error{
    message: string;
    type:string;
    code: string;
    source: string;
    index: number;
    stackTrace: string;
}

export class SuccessMessageResponse{
    message: string;
}
