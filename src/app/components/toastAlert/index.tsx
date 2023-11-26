import { Alert, Snackbar } from "@mui/material";

export function ToastAlert (props: {open: boolean, handleClose: any, msg: string, severity: any}) {
    return (
        <Snackbar
            open={props.open} 
            autoHideDuration={6000} 
            onClose={props.handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={props.handleClose} severity={props.severity} sx={{ width: '100%' }}>
                {props.msg}
            </Alert>
        </Snackbar>
    );
}