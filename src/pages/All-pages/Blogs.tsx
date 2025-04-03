
import { Typography , Box} from "@mui/material";

export default function Home(){
    return(
        <Box className="flex column justify-center align-center h-100 w-100">
            <Typography variant="h1" color="primary" fontSize={50}>
                بلاگ ها
            </Typography>
        </Box>
    )
}