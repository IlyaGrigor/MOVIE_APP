import {Box, Typography} from "@mui/material";

export const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                borderTop: 1,
                borderColor: "divider",
                py: 3,
                mt: 8,
                textAlign: "center",
            }}
        >
            <Typography variant="body2" color="text.secondary">
                © 2026 MovieDatabasePlatform by Ilya Grigor · Data courtesy of TMDB
            </Typography>
        </Box>
    );
};
