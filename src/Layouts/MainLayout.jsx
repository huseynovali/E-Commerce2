import { AppBar, Badge, Box, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AccountCircle, Inventory, ShoppingCart } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from 'react-redux';

function MainLayout() {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('activeUser');
        navigate("/")
    }
  const CartReducer = useSelector(state=>state)

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                        >
                            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                                E-Commerce
                            </Link>
                        </Typography>

                        <Box sx={{ flexGrow: 1 }} />
                        <Box >
                            <Link to={'/cart'}>
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                >
                                    <Badge badgeContent={CartReducer?.length} color="error">
                                        <ShoppingCart />
                                    </Badge>
                                </IconButton>
                            </Link>
                            {
                                localStorage.getItem("token") ?
                                    <>
                                        <Link to={'/addProduct'}>
                                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                                <Inventory />
                                            </IconButton></Link>
                                        <IconButton
                                            size="large"
                                            edge="end"
                                            aria-label="account of current user"

                                            aria-haspopup="true"

                                            color="inherit"
                                        >
                                            <Link to={"/profile"}>
                                                <AccountCircle />
                                            </Link>

                                        </IconButton>
                                        <IconButton
                                            size="large"
                                            edge="end"
                                            aria-label="account of current user"
                                            aria-haspopup="true"
                                            color="inherit"
                                            onClick={() => logout()}
                                        >
                                            <LogoutIcon />
                                        </IconButton>
                                    </> :
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-haspopup="true"
                                        color="inherit"
                                    >
                                        <Link to={"/login"} >
                                            <LoginIcon />
                                        </Link>
                                    </IconButton>
                            }
                        </Box>
                    </Toolbar>
                </AppBar>

            </Box>
            <Outlet />
        </div>
    )
}

export default MainLayout