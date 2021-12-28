import React, { useState , useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
  Typography,
  makeStyles,
  TextField,
  Button,
  CardContent,
  InputAdornment,
  SvgIcon,
  Snackbar,
  Link,
  Modal,
  Backdrop,
  Collapse,
  Paper,
  IconButton,
  Fab,
  Container,
  Switch,
  Grid
} from '@material-ui/core';


import EditIcon from '@material-ui/icons/Edit';
import GoBackIcon from '@material-ui/icons/ArrowBackTwoTone';
import Page from '../../../components/Page';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Search as SearchIcon } from 'react-feather';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support

//to show delete conformation dailog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import StarBorderIcon from '@material-ui/icons/Visibility';
import GridListTileBar from '@material-ui/core/GridListTileBar';

//To show alert
import MuiAlert from '@material-ui/lab/Alert';
import { unset } from 'lodash';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  importButton: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1)
  },
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
  card: {
    // marginRight: '360px',
    // marginLeft: '360px',
    paddingBottom: '60px',
    paddingTop: '60px',
    marginLeft:'unset',
    marginRight:'unset'
  },
  mideaQuery:{
    maxWidth: 650,
    margin:'0 auto', 
  },
  link: {
    borderRadius: '11px',
    // marginLeft: '360px',
    width: '100px',
    height: '35px',
    marginTop: '100px',
    marginBottom: '5px',
  },
  testswitch:{
    marginLeft: '8px',
    marginTop: '14px',
  },
  title: {
    // color: theme.palette.secondary.light,
    color: 'WHITE',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  zoomout: {
    cursor: 'zoom-out'
  },
  gridList: {
    borderRadius: 12
  },
}));

const Results = ({ className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [is_edit_mode, set_edit_mode] = React.useState(0);
  const [message, setmessage] = React.useState();
  const [getOrder, setOrder] = React.useState();
  const [Warehouses, setWarehouses] = useState('');
  const [openModel, setModelOpen] = React.useState(false);
  const [getEditClientDetail, setEditClientDetail] = React.useState([]);
  const [getUserDetail, setUserDetail] = React.useState([]);
  //show data = 1,edt data = 2
  const [mode, setmode] = React.useState(1);
  const {state} = useLocation();

  //To show alert
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter();
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited();
        }
      },
    });
  
    return (
      <animated.div ref={ref} style={style} {...other}>
        {children}
      </animated.div>
    );
  });

  Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
  };


   //img open
   const [imgOpen, setImgOpen] = React.useState(false);
   const [imgValue, selectedImgValue] = React.useState(false);
   const [fileData, addFileData] = React.useState(false);
   const handleClickImgOpen = () => {
    
     setImgOpen(true);
   };
 
   const handleImgClose = () => {
     setImgOpen(false);
   };

   const handleChangeImg = (event) => {
      addFileData(event.target.files[0]);
      selectedImgValue(URL.createObjectURL(event.target.files[0]));
   }
   
  
//To show delete conformation dailog
const [openDailog, setOpenDailog] = React.useState(false);
const theme = useTheme();
const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

const getEditableData = () => {
  if(!state){
    navigate('/app/client', { replace: true });
  }else{
    selectedImgValue(state.client.image);
    setEditClientDetail(state.client);
  }
  
}

  useEffect(() => {
      getEditableData();
  }, []);

  return (
    <div>
 <Page
      className={classes.root}
      title="Storages"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        marginTop="10px"
        className={classes.mideaQuery}
      >
        <Fab size="small" color="primary" aria-label="edit" onClick={()=>{navigate('/app/client', { replace: true })}}  className={classes.link}>
          <GoBackIcon className={classes.extendedIcon}/>
        Back
        </Fab>
  
        <Card className={classes.card}> 
        <Container maxWidth="sm">
          <Formik
          
            initialValues={{
              name:getEditClientDetail.name,
              description:getEditClientDetail.description,
              // image:getEditClientDetail.image,
            }}
            enableReinitialize
            validationSchema={Yup.object().shape({
              name: Yup.string().max(255).required('Name is required'),
              
            })}
            onSubmit={values => {
              handleSubmit(values,getEditClientDetail.id)
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Update
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Update your client details
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Client Name"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.name}
                  variant="outlined"
                  id='name'
                />
                <TextField
                  fullWidth
                  label="Description"
                  margin="normal"
                  name="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.description}
                  variant="outlined"
                  id='description'
                />
                <GridList cellHeight={150} cellWidth={300} className={classes.gridList} cols={1}>
                        <GridListTile key={values.image} cols={1}>
                          <img src={imgValue} alt={'image'} variant="outlined"/>
                          <GridListTileBar
                              title={<Button component="label" className={classes.title} >Change image
                                        <input type="file" name="image" id='image' onChange={(event)=>{handleChangeImg(event)}} hidden/>
                                      </Button>}
                              classes={{
                                root: classes.titleBar,
                                title: classes.title,
                              }}
                              actionIcon={
                                <IconButton aria-label={`star`}>
                                  <StarBorderIcon className={classes.title} onClick={()=>{handleClickImgOpen()}}/>
                                </IconButton>
                              }
                          />
                          
                        </GridListTile>
                    </GridList>
                
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Update
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
        </Card>
      </Box>
      
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "right" }}> 
        <Alert onClose={handleClose} severity="error" backgroundColor='e53935'>
            {message}
        </Alert>
      </Snackbar>
      <Dialog onClose={handleImgClose} open={imgOpen} className={classes.content} maxWidth={false}>
          <img src={imgValue}  alt="image" onClick={()=>{handleImgClose()}} className={classes.zoomout}/>
       </Dialog>
      
    </Page>
    </div>
    
 );
 //handle submit event of form
 function handleSubmit(values,client_id){

  //Api calling
  const formData = new FormData();
  formData.append('image',fileData);
  formData.append('client_id',client_id);
  formData.append('name',values.name);
  formData.append('description',values.description);

  const axios = require('axios');
    const auth_token = localStorage.getItem('authtoken');
    const headers = { 
      'Authorization': 'Bearer '+auth_token,
      'content-type': 'multipart/form-data'
    };
    axios.post(process.env.REACT_APP_API_URL+'updateOurClientByAdmin',formData,{ headers })
    .then(response => {
      console.log(response.data);
      if(response.status == 200){
        navigate('/app/client', { state:{}})
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
      const status_code = error.response.status;
      if (status_code == 401){
      localStorage.clear();
      // console.log('401',error.response.data.message);
      setmessage(error.response.data.message);
      setOpen(true);
      navigate('/login', { state:{error_message: error.response.data.message,status: 'error' }});
      }else if(status_code == 422){
      // console.log('422',error.response.data.message);
      setmessage(error.response.data.message);
      setOpen(true);
      }else if(status_code == 400){
      // console.log('400',error.response.data.message);
      setmessage(error.response.data.message);
      setOpen(true);
      }else{
      // console.log('else-2',error.response.data.message);
      setmessage(error.response.data.message);
      setOpen(true);
      }
      });
}

};

Results.propTypes = {
  className: PropTypes.string,
  // customers: PropTypes.array.isRequired
};

export default Results;
