import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
  Fab,
  Snackbar,
  Card,
  Switch,
  Grid,
  IconButton
} from '@material-ui/core';
import Page from '../../../components/Page';
import GoBackIcon from '@material-ui/icons/ArrowBackTwoTone';
import Dialog from '@material-ui/core/Dialog';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import StarBorderIcon from '@material-ui/icons/Visibility';
import GridListTileBar from '@material-ui/core/GridListTileBar';
//To show alert
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100px',
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  card: {
    // marginRight: '360px',
    // marginLeft: '360px',
    paddingBottom: '60px',
    paddingTop: '100px',
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
    marginTop: '-43px',
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



const AddCityView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [message, setmessage] = React.useState();
  const [open, setOpen] = React.useState(false);

  //To show alert
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  //switches
  const [getSwitch, setSwitch] = React.useState({
    is_active: true
  });
  const handleChangeSwitch = (event) => {
    setSwitch({ ...getSwitch, [event.target.name]: event.target.checked});
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
    

  //handle submit event of form
  function handleSubmit(values){

    console.log(',values',values);
    //Api calling
    // setValues([]);
    const formData = new FormData();
    formData.append('profile',fileData);
    formData.append('name',values.name);
    formData.append('email',values.description);
    formData.append('address',values.address);
    formData.append('mobile',values.mobile);

    const axios = require('axios');
      const headers = { 
        'content-type': 'multipart/form-data'
      };
      axios.post(process.env.REACT_APP_API_URL+'add',formData,{ headers })
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
        });
  }

  return (
    <Page
      className={classes.root}
      title="Cities"
    >
    <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        marginTop="100px !importants" 
        className={classes.mideaQuery}
      >
        <Fab size="small" color="primary" aria-label="edit" onClick={()=>{navigate('/', { replace: true })}}  className={classes.link}>
          <GoBackIcon className={classes.extendedIcon}/>
          Back
        </Fab>
  
        <Card className={classes.card}> 
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              name:'',
              description:''
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().min(3).required('Name is required'),
              email: Yup.string().required('Email is required'),
              profile: Yup.string().required('Profile is required'),
            })}
            onSubmit={values => {
              handleSubmit(values)
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
                    Add
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Add your user details
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Name"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.name}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.email}
                  variant="outlined"
                />
                <Box mb={3}mt={2}>
                  {
                  imgValue == '' ? 
                      <Button variant="contained" component="label" >Choose profile image
                        <input type="file" name="image" id='image' onChange={(event)=>{handleChangeImg(event)}} hidden/>
                      </Button>
                  :
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
                  }
                </Box>
                <TextField
                  fullWidth
                  label="Address"
                  margin="normal"
                  name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.address}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Mobile"
                  margin="normal"
                  name="mobile"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.mobile}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Submit
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
  );
};

export default AddCityView;
