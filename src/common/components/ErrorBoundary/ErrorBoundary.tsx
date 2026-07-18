import {Component, type ErrorInfo, type ReactNode} from "react";
import {Button, Container, Typography} from "@mui/material";

type ErrorBoundaryProps = {
    children: ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        hasError: false,
    };

    static getDerivedStateFromError(): ErrorBoundaryState {
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Unhandled app error", error, errorInfo);
    }

    reset = () => {
        this.setState({hasError: false});
    };

    render() {
        if (this.state.hasError) {
            return (
                <Container sx={{py: 8}}>
                    <Typography variant="h4" gutterBottom>
                        Something went wrong
                    </Typography>
                    <Typography color="text.secondary" sx={{mb: 3}}>
                        The page could not be rendered. Try again or refresh the app.
                    </Typography>
                    <Button variant="contained" onClick={this.reset}>
                        Try again
                    </Button>
                </Container>
            );
        }

        return this.props.children;
    }
}
