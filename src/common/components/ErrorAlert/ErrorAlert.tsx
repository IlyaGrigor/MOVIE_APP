import {Alert, Button} from "@mui/material";

type ErrorAlertProps = {
    error?: unknown;
    message?: string;
    onRetry?: () => void;
};

export const ErrorAlert = ({error, message = "Something went wrong", onRetry}: ErrorAlertProps) => {
    return (
        <Alert
            severity="error"
            action={
                onRetry ? (
                    <Button color="inherit" size="small" onClick={onRetry}>
                        Retry
                    </Button>
                ) : undefined
            }
            sx={{my: 3}}
        >
            {message}
            {error ? `: ${getErrorMessage(error)}` : null}
        </Alert>
    );
};

const getErrorMessage = (error: unknown) => {
    if (typeof error === "string") {
        return error;
    }

    if (isRecord(error)) {
        if (typeof error.status === "number" || typeof error.status === "string") {
            return `request failed (${error.status})`;
        }

        if (typeof error.message === "string") {
            return error.message;
        }
    }

    return "please try again";
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
    return typeof value === "object" && value !== null;
};
