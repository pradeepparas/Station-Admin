import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Link, Redirect } from "react-router-dom";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input,
	Label,
	Form,
	FormGroup,
} from "reactstrap";

// Images modalButton
import downArrow from '../StationManagement/downArrow.png';
import delete_logo from '../StationManagement/delete.svg';
import edit from '../StationManagement/edit.png';
import flag from '../StationManagement/flag.svg';
import printer from './printer.png';

// Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CancelIcon from "@material-ui/icons/Cancel";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Pagination from '@material-ui/lab/Pagination';

// components
import styles from './Revenue.module.css';
// import styled from 'styled-components';

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
    ["@media (min-width: 280px) and (max-width: 1185px)"]: {
      width: '100%'
    }
  },
  tableContainer: {
    overflow: 'visible',
    borderRadius: '0px 0px 20px 20px',
    boxShadow: 'none',
    ["@media (min-width: 180px) and (max-width: 895px)"]: {
      overflow: 'auto'
    },
  },
  textField1:{
    ["@media (min-width: 280px) and (max-width: 1185px)"]: {
      width: '100%',
      marginBottom: 5
    },
    outline: 'none',
    width: 150,
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
  page1: {
    marginTop: 40,
    // color: '#213D77',
    // borderRadius: 8
  },
  button1: {
		width: 100,
    ["@media (min-width: 280px) and (max-width: 1185px)"]: {
      width: '100%',
      marginBottom: 5
    },
    borderRadius: 80,
    color: 'white',
    backgroundColor: '#213D77',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#213D77',
      color: '#FFF'
    }
  },
	div1: {
		marginRight: 10,
		["@media (min-width: 681px) and (max-width: 1185px)"]: {
			marginRight: 0,
			width: 500,
		},
		["@media (min-width: 280px) and (max-width: 680px)"]: {
			marginRight: 0,
			width: '91%',
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
		["@media (min-width: 280px) and (max-width: 1185px)"]: {
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

function createData(stationName, userName, service, order, vendorName, date, Amount) {
  return { stationName, userName, service, order, vendorName, date, Amount };
}

const rows = [
  createData("Bhopal", "John Doe", "Medicines", 101, "John Doe", "01/01/21", 1000),
  createData("Indore", "John Doe", "Medicines", 102, "John Doe", "01/01/21", 1000),
  createData("Habib Ganj", "John Doe", "Medicines", 103, "John Doe", "01/01/21", 1000),
  createData("Bhopal", "John Doe", "Medicines", 104, "John Doe", "01/01/21", 1000),
  createData("Bhopal", "John Doe", "Medicines", 105, "John Doe", "01/01/21", 1000),
];

export default function StationManagement(props) {
  // Dates State
  const [pageNo, setPageNo] = useState();
  const [date, setDate] = useState({
    start: new Date().toISOString().slice(0, 10),
    end: new Date().toISOString().slice(0, 10),
  })
	const [showModal, setShowModal] = useState(false);
	const [arrayDetails, setArrayDetails] = useState([]);
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
	const handleDeleteSubmit = () => {
		// set delete modal false
		setModal({
			deleteModal: false,
			deletedModal: true
		})
	}

  // Changing Date fields
   const handleDateChange = (data, type) => {
    console.log(data)
    // debugger
    if(type == 'start') {
      setDate({
        ...date,
        start: data.target.value
      })
    } else {
      setDate({
        ...date,
        end: data.target.value
      })
    }
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSelectChange = (event) => {
    setAge(event.target.value);
  };

  const toggleModal =(e,data, i)=>{
  	setModal(true);
    if(data == 'delete'){
      setModal({
        deleteModal: true
      })
    } else {
			setArrayDetails(rows[i]);
      setModal({
        details: true
      })
    }
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

    //  used for pagination
    const handleChangePage = (event, page) => {
      setPageNo(page)
      // props.getUserDataByParams(page, props.limit)
	  }

    // Used for Pagination
    const setPage = () => {
      let total = Math.ceil(rows.length / 10)
      return (
        <Pagination
          onChange={handleChangePage}
          count={total}
          shape="rounded"
          classes={{ ul: classes.ul1 }}
          size='small'/>
    )
  }

  return(
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>Revenue</div>
        <button className={styles.modalButton} /*style={{display: 'contents'}}*/ /*onClick={passwordGenerate}*/>
        <img className={styles.modalImage} style={{width: 30,height: 30, marginTop: 10, marginLeft: 10, marginRight: 10}} src={printer} />
        <small style={{display: 'flex', alignItems: 'center'}}>Download Details</small>
        </button>
      </div>
      <div className={styles.table}>
      <div className={styles.filterContent}>
        <div className={styles.searchBarDiv}>
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <OutlinedInput
            // label="Search"
            className={classes.textField1}
            id="outlined-adornment-weight"
            value={values.weight}
            onChange={handleChange('weight')}
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

         {/*Select*/}
         <div className={styles.selectDiv1}>
           <select className={styles.select1} name="slct" id="slct" /*value={this.state.courseId} onChange={this.handleInputs}*/>
             <option selected disabled>Station Name</option>
             <option value="1">Bhopal</option>
             <option value="2">Indore</option>
             <option value="3">Habib Ganj</option>
         </select>
         </div>

         <div className={styles.selectDiv1}>
           <select className={styles.select1} name="slct" id="slct" /*value={this.state.courseId} onChange={this.handleInputs}*/>
             <option selected disabled>Vendor Name</option>
             <option value="1">John Doe</option>
             <option value="2">Name</option>
         </select>
         </div>

          <div className={styles.selectDiv1}>
            <select className={styles.select1} name="slct" id="slct" /*value={this.state.courseId} onChange={this.handleInputs}*/>
              <option selected disabled>Service Name</option>
              <option value="1">Medicines</option>
              <option value="2">Food and Beverage</option>
              <option value="2">Porter</option>
          </select>
          </div>
          {/*</div>*/}

        {/*<div className={styles.dateDiv}>*/}
        <div className={classes.container1}>
        <label style={{width: 70}} className={styles.dateLabel}>From Date</label>
    			<TextField
    				id="date"
    				variant="outlined"
    				type="date"
    				size="small"
            placeholder="From Date"
    				// defaultValue={new Date()}
            name="start"
            value={date.start}
            onChange={(e) => handleDateChange(e, 'start')}
    				className={classes.date1}
            InputProps={{
              placeholder: "From Date",
              // endAdornment: null,
              classes: { input: classes.input1 },
              focused: classes.focused1,
            }}
    				// InputLabelProps={{
            //   placeholder: 'From Date',
    				// 	shrink: true,
    				// }}
    			/>
    		</div>

        <div className={classes.container1}>
          <label style={{width: 45}} className={styles.dateLabel}>To Date</label>
    			<TextField
    				id="date"
    				variant="outlined"
    				type="date"
    				size="small"
    				// defaultValue={new Date()}
            name="end"
            value={date.end}
            onChange={(e) => handleDateChange(e, 'end')}
    				className={classes.date1}
    				// InputLabelProps={{
            //   label: 'To Date',
    				// 	shrink: true,
            //   classes: { input: classes.input1 },
            //   focused: classes.focused1,
    				// }}
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
        <Button className={classes.button1} variant="contained">
          Search
        </Button>
				</div>
      </div>

      <TableContainer className={classes.tableContainer} component={Paper}>
      <Table /*className={classes.table}*/ aria-label="simple table">
        <TableHead style={{backgroundColor: '#e4e4e4'}}>
          <TableRow>
            <TableCell>S.No.</TableCell>
            <TableCell align="center">Station Name</TableCell>
            <TableCell align="center">Customer Name</TableCell>
            <TableCell align="center">Service Name</TableCell>
            <TableCell align="center">Service Order No.</TableCell>
            <TableCell align="center">Vendor Name</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow className={classes.table} key={row.name}>
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="center">{row.stationName}</TableCell>
              <TableCell align="center">{row.userName}</TableCell>
              <TableCell align="center">{row.service}</TableCell>
              <TableCell align="center">{row.order}</TableCell>
              <TableCell align="center">{row.vendorName}</TableCell>
              <TableCell align="center">{row.date}</TableCell>
              <TableCell align="center">{row.Amount}</TableCell>
              <TableCell align="center">
              <div className={styles.dropdown}>
                <button className={styles.dropbtn}>Action <img src={downArrow} className={styles.arrow}/></button>
                <div className={styles.dropdown_content}>
                  <a><div onClick={(e) => toggleModal(e, 'details', index)}>View Details</div></a>
                </div>
                </div></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>

			{/* After Delete Modal */}
			{<Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal.deletedModal} toggle={toggleModalClose} centered={true}>
					<ModalBody modalClassName={styles.modalContainer}>
          <img style={{width: 60}} src={flag} />
					<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>Successfully Deleted User</strong>  </p>
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
				<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>Are you sure you want to delete John User?</strong>  </p>

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
							onClick={(e) => { handleDeleteSubmit(e) }}
						>
							YES
						</Button>
					</ModalFooter>
				</Modal>}

				{/* Modal for view Details */}
        <Modal className={styles.modalContainer} contentClassName={styles.customClass}
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
						 <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 15}}>
							 <button className={styles.modalButton} /*style={{display: 'contents'}}*/ /*onClick={passwordGenerate}*/>
								 <img className={styles.modalImage} style={{width: 30,height: 30, marginTop: 10, marginLeft: 10, marginRight: 10}} src={printer} />
								 <small style={{display: 'flex', alignItems: 'center'}}>Download Details</small>
							 </button>
						</div>
						<div className={styles.modalOuterDiv} style={{display: 'flex'}}>
						<div className={styles.box1}>
								<div className={styles.modalBox} /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
								<div className={styles.modalDiv}  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Station Name</span><span style={{marginLeft: 40,marginRight: 25}}> - </span>{arrayDetails.stationName}
								</div>
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Customer Name</span><span style={{marginLeft: 24,marginRight: 25}}> - </span>{arrayDetails.userName}
								</div>
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Service Name</span><span style={{marginLeft: 40,marginRight: 25}}> - </span>{arrayDetails.service}
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Service Order No.</span><span style={{marginLeft: 17,marginRight: 25}}> - </span>{arrayDetails.order}
								</div>
                <div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Vendor Name</span><span style={{marginLeft: 42,marginRight: 25}}> - </span>{arrayDetails.vendorName}
								</div>
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Date</span><span style={{marginLeft: 98,marginRight: 25}}> - </span>{arrayDetails.date}
								</div>
								</div>
						</div>

						<div className={styles.box1}>
							<div className={styles.modalBox} /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
							<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Service Charge</span><span style={{marginLeft: 47,marginRight: 25}}> - </span>500
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Vendor Charge</span><span style={{marginLeft: 47,marginRight: 25}}> - </span>400
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Tax</span><span style={{marginLeft: 120,marginRight: 25}}> - </span>100
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Other fees</span><span style={{marginLeft: 76,marginRight: 25}}> - </span>00
							</div>
              { /* Extra div */ }
							<div className={styles.modalDiv} className={styles.modalDiv}
								style={{
									flexDirection: 'row',
									marginTop: 31,
									paddingTop: 11,
									marginRight: 10,
									borderTopStyle: 'solid',
									borderWidth: 2,
									borderColor: '#6b6f788c'}}>
							<span className={styles.textModal}>Total Price</span><span style={{marginLeft: 76,marginRight: 25}}> - </span>{arrayDetails.Amount}
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
					</Modal>


      {rows.length > 0 &&<div className={styles.pageDiv}>
      <div style={{marginTop: 40}}>
      {rows.length > 0 && setPage()}
      </div>
      </div>}
    </div>
  );
}
