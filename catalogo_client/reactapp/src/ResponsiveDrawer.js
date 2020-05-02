import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import red from '@material-ui/core/colors/red';
import LoadingOverlay from 'react-loading-overlay';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';


import MenuList from './MenuList';
import CategoriaList from './CategoriaList';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

function OpenMenuPrompt(props) {
    const isVisible = props.isVisible;
    if (isVisible) {
        return (
            <Box>
            <Typography variant="h6" noWrap>
            Bem-vindo(a) ao Site!
            </Typography>
            </Box>
        );
    } else {
        return null;
    }
}


export default function PersistentDrawerLeft(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const [firstTime, setFirstTime] = React.useState(true);

    // spinner overlay, true = spinner is showing
    const [isMenuActive, setIsMenuActive] = React.useState(true);
    const [isCategoriaActive, setIsCategoriaActive] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleClick = (id, nome) => {
        props.onClick(id, nome);
        if (id !== props.categoria) {
            setIsCategoriaActive(true);
            setFirstTime(false);
        }
        handleDrawerClose();
    };

    const hideMenuOverlay = () => {
        setIsMenuActive(false);
    };

    const handleCategoriaOverlayFalse = () => {
        setIsCategoriaActive(false);
    };

    return (
        <div className={classes.root}>
        <CssBaseline />
        <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
        })}
        >
        <Toolbar>
        <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        className={clsx(classes.menuButton, open && classes.hide)}
        >
        <Typography variant="button">
        Menu&nbsp;
        </Typography>
        
        <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" noWrap>
        Pontual Import Brindes
        </Typography>
        
        </Toolbar>
        </AppBar>

        <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
            paper: classes.drawerPaper,
        }}
        >

        <LoadingOverlay active={isMenuActive} spinner>

        <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        </div>

        <Divider />

        <MenuList onClick={(id, nome) => handleClick(id, nome)} onLoad={() => hideMenuOverlay()} />
        </LoadingOverlay>
        
        </Drawer>


        <main
        className={clsx(classes.content, {
            [classes.contentShift]: open,
        })}
        >
        <div className={classes.drawerHeader} />

        <OpenMenuPrompt isVisible={firstTime} />
        
        <LoadingOverlay active={isCategoriaActive} text="Carregando, por favor aguarde...">


        <CategoriaList categoria={props.categoria} categoriaNome={props.categoriaNome} doneLoading={() => handleCategoriaOverlayFalse()} />

        </LoadingOverlay>

        </main>

        </div>
    );
}
