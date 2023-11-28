import { Stack, AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { AccountCircle, Settings, ExitToApp } from "@mui/icons-material";

const NavBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                {/* Left side with logo and name */}
                <Stack style={{ display: "flex", alignItems: "center", flexGrow: 1 }} direction='row'>
                    <Typography variant="h6" component="div" >
                        Your Logo
                    </Typography>
                    <Typography variant="h6" component="div">
                        Your App Name
                    </Typography>
                </Stack>

                <Stack direction='row' gap={1}>
                    {/* Right side with profile, settings, and sign out buttons */}
                    <IconButton color="inherit" >
                        <AccountCircle />
                    </IconButton>
                    <IconButton color="inherit" >
                        <Settings />
                    </IconButton>
                    <Button color="inherit" startIcon={<ExitToApp />}>
                        Sign Out
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;