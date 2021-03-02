import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from "react-redux";
import { compose } from 'redux';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { Link, Redirect } from "react-router-dom";

import {
	Modal,
	// ModalHeader,
	ModalBody,
	ModalFooter,
	// Input,
	// Label,
	// Form,
	// FormGroup,
} from "reactstrap";

// Images
import downArrow from '../StationManagement/downArrow.png';
import delete_logo from '../StationManagement/delete.svg';
// import edit from '../StationManagement/edit.png';
import flag from '../StationManagement/flag.svg';

// Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CancelIcon from "@material-ui/icons/Cancel";
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
// import InputLabel from '@material-ui/core/InputLabel';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import Select from '@material-ui/core/Select';
// import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Pagination from '@material-ui/lab/Pagination';

// components
import styles from './Users.module.css';
import * as actions from '../../redux/actions/userActions';
import { setIsLoading } from '../../redux/actions/stationActions';
import * as API from '../../constants/APIs';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },

  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    "& MuiButton-contained:hover": {
      backgroundColor: '#213D77',
    },
    ".MuiPaper-elevation1": {
      boxShadow: 'none'
    },
    "& .MuiTableCell-root": {
      root: {
        borderBottom: 'none'
      }
    }
    // "& .MuiTableContainer-root": {
    //   overflow: 'visible',
    //   borderRadius: 20
    // }
  },
  ul1: {
    "& .Mui-selected:hover": {
      borderRadius: 8,
      color: "white",
      backgroundColor: '#213D77'
    },
    "& .Mui-selected": {
      borderRadius: 8,
      color: "white",
      backgroundColor: '#213D77'
    }
  },
  textField: {
    ["@media (min-width: 280px) and (max-width: 842px)"]: {
      width: '100%'
    }
  },
  textField1:{
    ["@media (min-width: 280px) and (max-width: 842px)"]: {
      width: '100%',
      marginBottom: 5
    },
    outline: 'none',
    width: 180,
    height: 41,
    borderRadius: 30,
    '&:focus': {
      outline: 'none',
      borderColor: '#6c757d'
    },
    '&:hover': {
      outline: 'none',
      // borderColor: '#6c757d'
    },
    '&:after': {
      borderColor: '#6c757d'
    },
    // '& .MuiInput-underline:after': {
    //   borderBottomColor: '#6c757d',
    // },
  },
  tableContainer: {
    overflow: 'visible',
    borderRadius: '0px 0px 20px 20px',
    boxShadow: 'none',
    ["@media (min-width: 180px) and (max-width: 800px)"]: {
      overflow: 'auto'
    },
  },
  page1: {
    marginTop: 40,
    // color: '#213D77',
    // borderRadius: 8
  },
	div1: {
		marginRight: 10,
		["@media (min-width: 681px) and (max-width: 842px)"]: {
			marginRight: 0,
			width: 500,
		},
		["@media (min-width: 280px) and (max-width: 680px)"]: {
			marginRight: 0,
			width: '91%',
		}
	},
  button1: {
		width: 100,
    ["@media (min-width: 280px) and (max-width: 842px)"]: {
      width: '100%',
      marginBottom: 5
    },
    width: 120,
    borderRadius: 80,
    color: 'white',
    backgroundColor: '#213D77',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#213D77',
      color: '#FFF'
    }
  },
  button2: {
    width: 100,
    borderRadius: 16,
    color: 'white',
    backgroundColor: '#272d3b',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#272d3b',
      color: '#FFF'
    }
  },
  container1: {
		["@media (min-width: 280px) and (max-width: 842px)"]: {
      width: '100%',
			display: 'flex',
			flexDirection: 'column',
      marginBottom: 5
    },
		display: "flex",
		// flexWrap: "wrap",
    width: 192,
	},
	table: {
    "&:last-child td": {
      borderBottom: 0,
    },
    "&:last-child th": {
      borderBottom: 0,
    },
		overflowX: 'scroll',
    // "& .MuiTableCell-root": {
    //   // "tr:last-child": {
    //   //   borderBottom: 0,
    //   // },
    //   "&:last-child .td": {
    //     borderBottom: 0,
    //   }
    // }
	},
	date1: {
    // width: 131,
    height: 40,
    fontSize: 12,
    "& .MuiOutlinedInput-adornedEnd":{
      'filter' : 'invert(0%) sepia(3%) saturate(0%) hue-rotate(250deg) brightness(103%) contrast(104%)'
    },
    '&:hover': {
      outline: 'none',
      borderColor: 'red'
    },
		// marginLeft: theme.spacing(1),
		// marginRight: theme.spacing(1),
		// width: 170,
	},
  input1: {
    '&:hover': {
      outline: 'none',
      // backgroundColor: 'red',
      borderColor: 'red'
    },
    height: 18,
    paddingLeft: 4,
    paddingRight: 1,
		color: "#4D4F5C",
		fontSize: "smaller",
	},
  focused1: {
    borderColor: 'white'
  }
}));

// function createData(name, number, email, date) {
//   return { name, number, email, date };
// }

// const rows = [
//   createData("John Doe", 8854875896, "john@gmail.com", "01/01/21"),
//   createData("John Doe", 8854875896, "john@gmail.com", "01/01/21"),
//   createData("John Doe", 8854875896, "john@gmail.com", "01/01/21"),
//   createData("John Doe", 8854875896, "john@gmail.com", "01/01/21"),
//   createData("John Doe", 8854875896, "john@gmail.com", "01/01/21"),
// ];

export function StationManagement(props) {
// name, calories, fat, carbs, protein
  const [pageNo, setPageNo] = useState();
  const [date, setDate] = useState({
    start: new Date().toISOString().slice(0, 10),
    end: new Date().toISOString().slice(0, 10),
  })
  const [search, setSearch] = useState({
    name: "",
    station_name: "",
    role: "",
    start_date: "",
    end_date: "",
  })
  const [rows, setRows] = useState([]);
	const [arrayDetails, setArrayDetails] = useState([]);
	const [showModal, setShowModal] = useState(false);
	// const [index, setIndex] = useState("")
  const [modal, setModal] = useState({
    deleteModal: false,
    details: false,
		deletedModal: false
  });
  const classes = useStyles();
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const [age, setAge] = React.useState('');

	const openModal = () => {
    setShowModal(prev => !prev);
  };

// Handle Delete function
	const handleDeleteSubmit = (e, userData) => {
		// set delete modal false
    console.log(userData)
    debugger
    let data = {
      "block_status": !userData.is_blocked,
      "user_id": userData._id
    }
    props.setIsLoading(true)

    axios({
      url: `${API.BlockUserAPI}/block`,
      method: "PUT",
      headers: {
        //    'Accept-Language': 'hi',
        "accept": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      data: data
    }).then((response) => {
      if(response.data.success){
        debugger
        // toast.success(response.data.message)
        setModal({
          deleteModal: false,
          deletedModal: true
        })
        props.getUserDataByParams(pageNo, props.limit, search, 2)
      } else {
        debugger
        toast.error(response.data.message)
      }
    }).catch(err => {
      toast.error(err.response.data.message)
      debugger
      props.setIsLoading(false)
    })
    props.setIsLoading(false)
	}

  //  used for pagination
  const handleChangePage = (event, page) => {
    setPageNo(page)
    props.getUserDataByParams(page, props.limit, search, 2)
	}

    // Used for Pagination
  const setPage = () => {
    let total = Math.ceil(props.total / props.limit)
    return (
        <Pagination
          onChange={handleChangePage}
          count={total}
          shape="rounded"
          classes={{ ul: classes.ul1 }}
          size='small'/>
    )
  }

  // Calling function for fetching users List
  useEffect(() => {
    props.getUserDataByParams(1, 10, null, 2);
    debugger
  },[props.getUserDataByParams])

  // Changing Date fields
  const handleDateChange = (data, type) => {
    console.log(data)
    // debugger
    if(type == 'start') {
      setSearch({
        ...search,
        start_date: data.target.value
      })
    } else {
      setSearch({
        ...search,
        end_date: data.target.value
      })
    }
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSelectChange = (event) => {
    setAge(event.target.value);
  };

  // user Details are filled from Redux store
  useEffect(() => {
    if(props.userDocs){
      setRows(props.userDocs)
      debugger
    }
    // debugger
  },[props.userDocs])

  const toggleModal =(e,data, i)=>{
  	setModal(true);
    setArrayDetails(rows[i]);
    if(data == 'delete'){
      setModal({
        deleteModal: true
      })
    } else {

      setModal({
        details: true
      })
    }
		debugger
  	// setState({...state, packageName:data.packageName, id: data._id, })
    }
    // close modal
    const toggleModalClose =()=>{
  	  setModal({
        deleteModal: false,
        details: false,
				deletedModal: false
      })
    }

    // Get Users List By Params
    const searchUsers = () => {
      console.log(search)
      debugger
      props.getUserDataByParams(1, 10, search, 2)
    }

    // Handling Inputs
    const handleInputs = (event) => {
      setSearch({
        ...search,
        [event.target.name]: [event.target.value]
      })
    }

  return(
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>Users</div>
      </div>
      <div style={{overflow: 'visible'}} className={styles.table}>
      <div className={styles.filterContent}>
        <div className={styles.searchBarDiv}>
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <OutlinedInput
            // label="Search"
            name='name'
            className={classes.textField1}
            id="outlined-adornment-weight"
            value={search.name}
            onChange={handleInputs}
            startAdornment={<SearchOutlinedIcon />}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              placeholder: 'Search',

              color: 'red',
              'aria-label': 'weight',
            }}
            // labelWidth={12}
          />
        </FormControl>

          {/*</div>*/}
          {/* Dates fields */}
        {/*<div className={styles.dateDiv}>*/}
        <div className={classes.container1}>
        <label style={{width: 70}} className={styles.dateLabel}>From Date</label>
    			<TextField
    				id="date"
    				variant="outlined"
    				type="date"
    				size="small"
            placeholder="From Date"
            name="start_date"
            value={search.start_date}
            onChange={(e) => handleDateChange(e, 'start')}
    				className={classes.date1}
            InputProps={{
              placeholder: "From Date",
              classes: { input: classes.input1 },
              focused: classes.focused1,
            }}
    			/>
    		</div>

        <div className={classes.container1}>
          <label style={{width: 45}} className={styles.dateLabel}>To Date</label>
    			<TextField
    				id="date"
    				variant="outlined"
    				type="date"
    				size="small"
            name="end_date"
            value={search.end_date}
            onChange={(e) => handleDateChange(e, 'end')}
    				className={classes.date1}
            InputProps={{
              placeholder: "From Date",
              // endAdornment: null,
              classes: { input: classes.input1 },
              focused: classes.focused1,
            }}
    			/>
    		</div>
        </div>

				<div className={classes.div1}>
				{/*Search Button*/}
        <Button className={classes.button1} onClick={searchUsers} variant="contained">
          Search
        </Button>
				</div>
      </div>

      <TableContainer className={classes.tableContainer} component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{backgroundColor: '#e4e4e4'}}>
          <TableRow>
            <TableCell>S.No.</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Phone Number</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Registration Date</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            // debugger
            return(
            <TableRow className={classes.table} key={row.name}>
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.mobile}</TableCell>
              <TableCell align="center">{row.email? row.email: '-'}</TableCell>

              <TableCell align="center">{moment(row.created_at).format("DD-MM-YYYY")}</TableCell>
              <TableCell align="center">{row.is_blocked?"In-active": "Active"}</TableCell>
              <TableCell align="center">
              <div className={styles.dropdown}>
                <button className={styles.dropbtn}>Action <img src={downArrow} className={styles.arrow}/></button>
                <div>
                <div className={styles.dropdown_content}>
                  <a><div onClick={(e) => toggleModal(e, 'details', index)}>View Details</div></a>
                  <a><div onClick={(e) => toggleModal(e, 'delete', index)}>{row.is_blocked?"Unblock": "Block"}</div></a>
                </div>
                </div>
                </div></TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>

      {rows.length == 0 && <div className={styles.emptyTable} style={{ display: 'flex', justifyContent: 'center'}}>No Data Found</div>}
      </div>

			{/* After Delete Modal */}
			{<Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal.deletedModal} toggle={toggleModalClose} centered={true}>
					<ModalBody modalClassName={styles.modalContainer}>
          <img style={{width: 60}} src={flag} />
					<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>Successfully Blocked User</strong>  </p>
					</ModalBody>
					<ModalFooter className={styles.deleteFooter}>
						<Button
              style={{width: 100}}
							variant="contained"
              color="black"
              className={classes.button1}
							onClick={toggleModalClose}
						>
						OK
						</Button>
					</ModalFooter>
				</Modal>}

			{/*Delete User*/}
      {<Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal.deleteModal} toggle={toggleModalClose} centered={true}>
					<ModalBody modalClassName={styles.modalContainer}>
          <img style={{width: 60}} src={delete_logo} />
				<p style={{marginTop: 20}}><strong style={{fontSize: 18}}>Are you sure you want to {arrayDetails.is_blocked?"un-block": "block"} '{arrayDetails.name}' ?</strong>  </p>

					</ModalBody>
					<ModalFooter className={styles.deleteFooter}>
						<Button
              style={{width: 100}}
							variant="contained"
              color="black"
              className={classes.button2}
							onClick={toggleModalClose}
						>
						NO
						</Button>
						<Button
              style={{width: 100}}
							variant="contained"
							className={classes.button1}
							onClick={(e) => { handleDeleteSubmit(e, arrayDetails) }}
						>
							YES
						</Button>
					</ModalFooter>
				</Modal>}

				{/* Modal for view Details */}
        {<Modal className={styles.modalContainer} contentClassName={styles.customClass}
				 isOpen={modal.details} toggle={toggleModalClose} centered={true}>
				 <CancelIcon
					 style={{
						 width: 40,
						 height: 40,
						 backgroundColor: 'white',
						 color: "#213D77",
						 borderRadius: 55,
						 position: "absolute",
						 top: "-14",
						 right: "-16",
						 cursor: "pointer",
					 }}
					 onClick={toggleModalClose}
				 />
						<div className={styles.modalOuterDiv} style={{display: 'flex'}}>

						<div className={styles.box1}>
								<div className={styles.modalBox} >
								<div className={styles.modalDiv}  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>User Name</span><span style={{marginLeft: 86,marginRight: 25}}> - </span>{arrayDetails.name}
								</div>
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>User Phone Number</span><span style={{marginLeft: 27,marginRight: 25}}> - </span>{arrayDetails.mobile}
								</div>
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>User Email</span><span style={{marginLeft: 88,marginRight: 25}}> - </span>{arrayDetails.email}
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Registration Date</span><span style={{marginLeft: 45,marginRight: 25}}> - </span>{moment(arrayDetails.created_at).format("DD-MM-YYYY")}
								</div>

                {/* Empty Div */}
                <div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}></span><span style={{marginLeft: 90,marginRight: 25}}></span>
								</div>
								</div>
						</div>

						</div>
            <ModalFooter className={styles.footer}>
  						<Button
                style={{width: 100}}
  							variant="contained"
                color="black"
                className={classes.button1}
  							onClick={toggleModalClose}
  						>
  						Ok
  						</Button>
  					</ModalFooter>
					</Modal>}


      {rows.length > 0 &&<div className={styles.pageDiv}>
      <div style={{marginTop: 40}}>
      {rows.length > 0 && setPage()}
      </div>
      </div>}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userDocs: state.Users.docs,
    limit: state.Users.limit,
    total: state.Users.total
  }
}
// concat ...
const mapDispatchToProps = (dispatch) => {
  return {
    getUserDataByParams: (pageNo, size, params, type) =>
      dispatch(actions.getUserDataByParams(pageNo, size, params, type)),
    setIsLoading: (loading) =>
      dispatch(setIsLoading(loading))
    // blockUserById: (userId) =>
    //   dispatch(actions.blockUserById(userId))
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(StationManagement)
