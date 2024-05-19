import { Box, Button } from "@mui/material";
import Link from "next/link";


export default function Snacks() {
    return (
        <main>
        <Box
            mt={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
            gap={5}
    
        >
             <h1>Snacks</h1>
        <p>This is the snacks page</p>
        <Link href="/" passHref>
            <Button variant="contained">Home</Button>
        </Link>
        </Box>
        </main>
    );
    }

