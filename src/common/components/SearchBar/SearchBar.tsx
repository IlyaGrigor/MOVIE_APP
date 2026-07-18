import {Box, IconButton, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import type React from "react";

type Props = {
    value: string;
    setValue: (value: string) => void;
    onSearch: () => void;
    placeholder?: string;
};

export const SearchBar = ({
                              value,
                              setValue,
                              onSearch,
                              placeholder = "Search for a movie...",
                          }: Props) => {
    const handleSubmit = (
        event: React.SubmitEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!value.trim()) return;

        onSearch();
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
            }}
        >
            <TextField
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder={placeholder}
            />

            <IconButton
                type="submit"
                disabled={!value.trim()}
            >
                <SearchIcon/>
            </IconButton>
        </Box>
    );
};