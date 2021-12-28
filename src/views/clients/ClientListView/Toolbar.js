import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core'; 
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const updateCustomer = () => {
  console.log('1');
  // console.log(selectedCustomerIds);
}

const deleteCustomer = () => {
  console.log('2');
}

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        {/* <Button className={classes.importButton}>
          Import
        </Button>
        <Button className={classes.exportButton}>
          Export
        </Button> */}
        <Button className={classes.importButton} 
        //color="primary"
        variant="contained"
        onClick={updateCustomer}>
          Update customer
        </Button>
        <Button className={classes.exportButton}
        // color="primary"
        variant="contained"
        onClick={deleteCustomer}>
          Delete customer
        </Button>
        {/* <Button
          color="primary"
          variant="contained"
          onClick={UpdateCustomer}
        >
          Update customer
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={UpdateCustomer}
        >
          Delete customer
        </Button> */}
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
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
                placeholder="Search user"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
