import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Grid,
    Link
} from "@material-ui/core";
import {
    Security,
    Info
} from "@material-ui/icons";
import NoticeDialog from "./LegalNoticePopups/NoticeDialog";

const Footer = () => {

    return <>
        <Grid container justify="center" style={{minHeight: "212px", marginTop:20}}>
            <Grid container item sm={6} xs={11} justify="space-between">
                <Grid item sm={5} xs={12}>
                    <Security color="action" />
                    <Typography paragraph>
                    Welcome to Udee, where we bring our community together for entertainment purposes. Our cool service identifies users, fostering connections and creating memorable entertainment experiences.


                    </Typography>
                </Grid>
                <Grid item sm={5} xs={11}>
                    <Info color="action" />
                    <Typography paragraph>
                    Udee is a unique service that connects individuals within our community using distinct user numbers, fostering entertainment-oriented connections..
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
        <AppBar position="static" elevation={0} component="footer" color="default">
            <Toolbar style={{ justifyContent: "center" }}>
                <Typography variant="caption">©2024</Typography> <NoticeDialog  separator="&nbsp;᛫" />
            </Toolbar>
        </AppBar>
    </>
}

export default Footer;