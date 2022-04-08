import Drawer from '@mui/material/Drawer';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import { useNavigate } from "react-router-dom";
     
const MUIDrawer = props => {
    let navigate = useNavigate();

    const {history} = props;
    const menuList = [   
        {
            key: 'transactions',
            name: 'Transactions',
            type: 'text',
            icon: <LibraryBooksRoundedIcon/>,
            onclick: () => navigate('/')
        },
        {
            key: 'peers',
            name: 'Peers',
            type: 'text',
            icon: <AppsRoundedIcon/>,
            onclick: () => navigate('/peers')
        }
    ]
    return (
        <>
            <Drawer sx={{ width: '160px'}} variant="permanent">
                <List>
                    {menuList.map(menu => (
                        <ListItem button key={menu.key} onClick={menu.onclick}>
                            <ListItemIcon>
                                {menu.icon}
                            </ListItemIcon>
                            <ListItemText primary={menu.name} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    )
};

export default MUIDrawer;