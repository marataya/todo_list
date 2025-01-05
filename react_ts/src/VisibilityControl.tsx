import {Checkbox, Paper, Stack, Typography} from "@mui/material";

interface VisibilityControlProps {
    showCompleted: boolean;
    callback: (checked: boolean) => void;
}

function VisibilityControl({showCompleted, callback}: VisibilityControlProps) {
    return (
        <Paper sx={{margin: '5px 0', padding: '10px 0'}}>
            <Stack direction="row" spacing={1} sx={{justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant="h7">Show Completed Tasks</Typography>
                <Checkbox checked={showCompleted} onChange={(e) => callback(e.target.checked)}/>
            </Stack>
        </Paper>
    );
}

export default VisibilityControl;