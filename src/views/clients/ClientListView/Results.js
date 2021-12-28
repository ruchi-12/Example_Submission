import React, { useState , useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  TextField,
  Button,
  CardContent,
  InputAdornment,
  SvgIcon,
  Snackbar,
  Fab,
  TableSortLabel,
} from '@material-ui/core';
import {Search as SearchIcon } from 'react-feather';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
//to show delete conformation dailog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';


//To show alert
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {},
  exportButton: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1)
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  table: {
    minWidth: 650,
  },
  f: {
    marginBottom: '-59px'
  },
  gridList: {
    width: 180,
    height: 65,
  },
  zoomout: {
    cursor: 'zoom-out'
  },
  zoomin: {
    cursor: 'zoom-in'
  },

}));


const Results = ({ className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [message, setmessage] = React.useState();
  const [clients, setClient] = useState('');
  const [openModel, setModelOpen] = React.useState(false);
  const [getUserDetail, setUserDetail] = React.useState(false);
  const [getDeletableId, setDeletableId] = React.useState('false');
  //img open
  const [imgOpen, setImgOpen] = React.useState(false);
  const [imgValue, selectedImgValue] = React.useState(false);
  const handleClickImgOpen = (img) => {
    selectedImgValue(img);
    setImgOpen(true);
  };

  const handleImgClose = () => {
    setImgOpen(false);
  };

  //SORT
  const [order, setOrder] = useState()
  const [orderBy, setOrderBy] = useState()

  //search
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

  //To show alert
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const [values, setValues] = useState({
    id: '',
    name: '',
    email: '',
    profile: '',
    address: '',
    mobile: '',
  });
  
  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    const axios = require('axios');
    const headers = {};
    axios.get(process.env.REACT_APP_API_URL+'list','')
        .then(response => {
          // console.log(response.data.id);
          if(response.status == 200){
            const client_detail = response.data.data;
            setClient(client_detail);
          
          }else{
            // console.log('else-1',response.data.message);
            setmessage(response.data.message);
            setOpen(true);
          }
        })
        .catch(error => {
          if (axios.isCancel(error)) {
          console.log(error.message);
          } else {
          console.log(error.message);
          }
        });
  }

  const deleteClient = (id) => {
    handleCloseDailog();
    // console.log('idList',selectedCustomerIds);
        const axios = require('axios');
        const auth_token = localStorage.getItem('authtoken');
        const headers = { 
          'Authorization': 'Bearer '+auth_token
        };
        axios.get(process.env.REACT_APP_API_URL+'/remove/{'+id+'}')
        .then(response => {
          if(response.status == 200){
            const allClient = response.data.data;
            setClient(allClient);
          }else{
            // console.log('else-1',response.data.message);
            setmessage(response.data.message);
            setOpen(true);
          }
        })
        .catch(error => {
            if (axios.isCancel(error)) {
            console.log(error.message);
            } else {
            console.log(error.message);
            }
        });  
    
    setSelectedCustomerIds([]);
  }

 //To show delete conformation dailog
 const [openDailog, setOpenDailog] = React.useState(false);
   const handleClickOpenDailog = () => {
     if(selectedCustomerIds.length <= 0){
       console.log('No one location selected!');
       setmessage('Please select atleast one client to perform any action.');
       setOpen(true);
     }else{
     setOpenDailog(true);
     }
   };
   const handleCloseDailog = () => {
     setOpenDailog(false);
   };


  //sort
  const headCells = [
    { id: 'id', label: 'Client Id' },
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email'},
    { id: 'profile', label: 'Profile'},
    { id: 'address', label: 'Address'},
    { id: 'mobile', label: 'Mobile'},
    { id: 'action', label: 'Action', disableSorting: true },
  ];

  const handleSortRequest = cellId => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(cellId)
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
      return order === 'desc'
          ? (a, b) => descendingComparator(a, b, orderBy)
          : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
      if (b[orderBy] < a[orderBy]) {
          return -1;
      }
      if (b[orderBy] > a[orderBy]) {
          return 1;
      }
      return 0;
  }

  //search
  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
        fn: items => {
            if (target.value == "")
                return items;
            else
                return items.filter(
                  (x) => 
                  x.name.toLowerCase().includes(target.value) ||
                  x.email.toString().toLowerCase().includes(target.value) ||
                  x.profile.toString().toLowerCase().includes(target.value) 
                  )
        }
    })
  }

  return (

    <div>
    
    <Box
            display="flex"
            justifyContent="flex-end"
          >
            <Button className={classes.exportButton}
            color="primary"
            variant="contained"
            onClick={()=>{navigate('/add-user', { state:{replace: true}})}}>
              Add client
            </Button>
      </Box>
          <Box mt={3}mb={3}>
          <Card>
            <CardContent>
              <Box maxWidth={500} className={classes.modal}>
                <TextField
                  fullWidth
                  onChange={handleSearch}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          fontSize="small"
                          color="action"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search location "
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
        
      <Card
    className={clsx(classes.root, className)}
    {...rest}
    >
      <Box >
        <PerfectScrollbar>
          <Box minWidth={1050}>
          <Table>
          <TableHead>
              <TableRow>
                {
                    headCells.map(headCell => (
                        <TableCell key={headCell.id}
                            sortDirection={orderBy === headCell.id ? order : false}>
                            {headCell.disableSorting ? headCell.label :
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={() => { handleSortRequest(headCell.id) }}>
                                    {headCell.label}
                                </TableSortLabel>
                            }
                        </TableCell>
                    ))
                }
              </TableRow>
            </TableHead>
            <TableBody>
            { 
              stableSort(filterFn.fn(Object.values(clients)), getComparator(order, orderBy))
              .slice(page * limit, page * limit + limit).map((client) => (

                <TableRow
                  hover
                  key={client.id}
                  selected={selectedCustomerIds.indexOf(client.id) !== -1}
                >
                   <TableCell>
                        {client.id}
                  </TableCell>
                  <TableCell>
                        {client.name}
                  </TableCell>
                  <TableCell>
                    <GridList cellHeight={45} cellWidth={10} className={classes.gridList} cols={1}>
                          <GridListTile key={client.profile} cols={1}>
                            <img src={client.profile} alt={client.name}  onClick={()=>{handleClickImgOpen(client.profile)}} className={classes.zoomin}/>
                          </GridListTile>
                    </GridList>
                  </TableCell>
                  <TableCell>
                        {client.email}
                  </TableCell>
                  <TableCell>
                
                  <Fab size="small" color="secondary" aria-label="edit" onClick={()=>{navigate('/app/editClient', { state:{client: client}})}} >
                    <EditIcon />
                  </Fab>
                  <Fab size="small" color="secondary" aria-label="delete" onClick={()=>{deleteClient(client.id)}} >
                    <DeleteIcon />
                  </Fab>
                  </TableCell>
                </TableRow>
            
            ))}
            </TableBody>
          </Table>
        </Box>
        </PerfectScrollbar>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}> 
          <Alert onClose={handleClose} severity="error">
              {message}
          </Alert>
        </Snackbar>
        <Dialog onClose={handleImgClose} open={imgOpen} className={classes.content} maxWidth={false}>
          <img src={imgValue}  alt="image" onClick={()=>{handleImgClose()}} className={classes.zoomout}/>
        </Dialog>
        <Dialog
        open={openDailog}
        onClose={handleCloseDailog}
        aria-labelledby="responsive-dialog-title"
        >
        <DialogTitle id="responsive-dialog-title">
          <Typography variant="h4" gutterBottom>
            Are you sure ?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h5" gutterBottom>
              You will not be able to recover this selected element.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDailog} color="primary">
            Disagree
          </Button>
          <Button onClick={deleteClient} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      
        
      </Box>
    </Card>
    </div>
 );

};

Results.propTypes = {
  className: PropTypes.string,
  // customers: PropTypes.array.isRequired
};

export default Results;
