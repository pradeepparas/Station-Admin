import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { compose } from 'redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios'
import { Link, Redirect, useHistory } from "react-router-dom";
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

// Images
import downArrow from './downArrow.png';
import delete_logo from './delete.svg';
import edit from './edit.png';
import printer from './printer.png';
import flag from './flag.svg';

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
import styles from './StationManagement.module.css';
import styled from 'styled-components';
import { Modal1 } from './Modal';
import { GlobalStyle } from './globalStyles';
import * as constantValue from '../constants/constants';
import * as actions from "../../redux/actions/stationActions";
import * as API from "../../constants/APIs";
import { hasAccess } from "../../constants/hasAccess";
// import { toast } from 'react-toastify';
// import Loading from '../../components/Loading/LoadingComponent';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Button1 = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #141414;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;

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
		["@media (min-width: 280px) and (max-width: 1200px)"]: {
			width: '60%'
		},
		["@media (min-width: 280px) and (max-width: 750px)"]: {
			width: '90%'
		},
	},
  textField1:{
		["@media (min-width: 280px) and (max-width: 1200px)"]: {
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
  tableContainer: {
    overflow: 'visible',
    borderRadius: '0px 0px 20px 20px',
    boxShadow: 'none',
    ["@media (min-width: 180px) and (max-width: 1140px)"]: {
      overflow: 'auto'
    },
  },
  page1: {
    marginTop: 40,
    // color: '#213D77',
    // borderRadius: 8
  },
	link1: {
		width: '100%',
		borderRadius: 16,
    color: 'white',
    backgroundColor: '#213D77',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#213D77',
      color: '#FFF'
    }
	},
  button1: {
    width: 120,
    marginRight: 10,
		["@media (min-width: 280px) and (max-width: 1200px)"]: {
      width: '60%',
			marginRight: 0,
      marginBottom: 5
    },
		["@media (min-width: 280px) and (max-width: 750px)"]: {
			width: '90%',
			marginRight: 0,
		},
    borderRadius: 16,
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
		display: "flex",
		flexWrap: "wrap",
		["@media (min-width: 280px) and (max-width: 1200px)"]: {
      width: '60%',
			display: 'flex',
			flexDirection: 'column',
      marginBottom: 5
    },
		["@media (min-width: 280px) and (max-width: 750px)"]: {
			width: '90%'
		},
    // width: 170,
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
	},
	input1: {
    '&:hover': {
      outline: 'none',
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

// function createData(station_name, station_code, station_type, managed_by,
//   no_of_platform, contact_name, contact_mobile, contract_start_date, exp_end_date,
//   station__gps_ltd, station__gps_lng, contract_giver, contractWinner, contract_tenure, contract_email,
//   adminName, adminNumber, adminEmail ) {
//   return { station_name, station_code, station_type, managed_by,
//     no_of_platform, contact_name, contact_mobile, contract_start_date, exp_end_date,
//     station__gps_ltd, station__gps_lng, contract_giver, contractWinner, contract_tenure, contract_email,
//     adminName, adminNumber, adminEmail };
// }

// const rows = [
//   createData('Indore', "INDB", "Urban", "Indian Railways", "06", "ABC", 8874589687, "02/01/21", "01/01/26",
//   "23.2218", "77.4392", "Indian Railways", "Basnsal Constructions", "05 Years", "abc@gmail.com", "ABC", 8854785689, "abc@gmail.com"),
//   createData('Bhopal', "INDB", "Urban", "Indian Railways", "06", "ABC", 8874589687, "02/01/21", "01/01/26",
//   "23.2218", "77.4392", "Indian Railways", "Basnsal Constructions", "05 Years", "abc@gmail.com", "ABC", 8854785689, "abc@gmail.com"),
//   createData('Habib Ganj', "INDB", "Urban", "Indian Railways", "06", "ABC", 8874589687, "02/01/21", "01/01/26",
//   "23.2218", "77.4392", "Indian Railways", "Basnsal Constructions", "05 Years", "abc@gmail.com", "ABC", 8854785689, "abc@gmail.com"),
//   createData('Indore', "INDB", "Urban", "Indian Railways", "06", "ABC", 8874589687, "02/01/21", "01/01/26",
//   "23.2218", "77.4392", "Indian Railways", "Basnsal Constructions", "05 Years", "abc@gmail.com", "ABC", 8854785689, "abc@gmail.com"),
//   createData('Indore', "INDB", "Urban", "Indian Railways", "06", "ABC", 8874589687, "02/01/21", "01/01/26",
//   "23.2218", "77.4392", "Indian Railways", "Basnsal Constructions", "05 Years", "abc@gmail.com", "ABC", 8854785689, "abc@gmail.com"),
// ];

export function StationManagement(props) {
  const history = useHistory()
  const [pageNo, setPageNo] = useState();
  const [search, setSearch] = useState({
    station_name: "",
    name: "",
    station_code: "",
    station_type: "",
    managed_by: "",
    start_date: "",
    end_date: "",
  })
  const [managedByList, setManagedByList] = useState([])
	const [showModal, setShowModal] = useState(false);
	const [rows, setRows] = useState([]);
  const [dropDownDetails, setDropDownDetails] = useState([]);
  const [stationType, setStationType] = useState([])
  const [modal, setModal] = useState({
    deleteModal: false,
    details: false,
		deletedModal: false
  });
	const [arrayDetails, setArrayDetails] = useState([]);
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

  useEffect(() => {
    if(props.stationDetails){
      setDropDownDetails(props.stationDetails)
      console.log(props.stationDetails)
      // debugger
    }
    if(props.stationType){
      setStationType(props.stationType)
    }
    if(props.stationDocs){
      console.log("props.stateionDocs",props.stationDocs)
      setRows(props.stationDocs)
      debugger
    }
  }, [props.stationDetails, props.stationDocs, props.stationType])

  // Handling Pagination
  const handleChangePage = (event, page) => {
    setPageNo(page)
    props.getStationDataByParams(page, props.limit)
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

// Handle Delete function
	const handleDeleteSubmit = (e, id) => {
    console.log(id)
    props.setIsLoading(true)
    debugger
    axios({
      url: `${API.DeleteStationAPI}/${id}`,
      method: "DELETE",
      headers: {
        //    'Accept-Language': 'hi',
        "accept": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
         },
    }).then((response) => {
      if(response.data.success){
        // toast.success(response.data.message)
        setModal({
          deleteModal: false,
          deletedModal: true
        })
        props.getStationDataByParams(pageNo, props.limit)
      }
      props.setIsLoading(false)
    })
    // props.deleteStation(arrayDetails.id)
		// set delete modal false
	}

  // GET Station Lists
  useEffect(() => {
    let token = localStorage.getItem('token')
    if(token == null){
      history.push('/');
    } else {
      props.getStationDataByParams(1, 10);
      props.getStationData()
    }

    // debugger
  }, [])

	// useEffect for Getting Data
	// useEffect(() => {
	// 	setRows(props.details)
	// 	console.log(rows)
	// 	debugger
	// }, [props.details])

   // GET Contractors List
   useEffect(() => {
    props.GetContractors()
  }, [])

  useEffect(() => {
    setManagedByList(props.contractorsList)
  }, [props.contractorsList])

  // Edit Station
  const editStation=(e, data, i)=>{
    // data.id=i
    props.setStationData(data)
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSelectChange = (event) => {
    setAge(event.target.value);
  };

  const toggleModal =(e,data, i)=>{

  	setArrayDetails(rows[i]);
    setModal(true);
    console.log(arrayDetails)
    // debugger
    if(data == 'delete'){
      setModal({
        deleteModal: true
      })
    } else {
			console.log(arrayDetails)
			// debugger
      setModal({
        details: true
      })
    }
  	// setState({...state, packageName:data.packageName, id: data._id, })
    }

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

    // close modal
    const toggleModalClose =()=>{
  	  setModal({
        deleteModal: false,
        details: false,
				deletedModal: false
      })

    }

    // function for adding station or Setting IsEdit False
    const addStation = () => {
      props.setIsEditFalse(false)
    }

    const searchStations = () => {
      console.log(search)
      debugger
      props.getStationDataByParams(1, 10, search)
    }

    const handleInputs = (event) => {
      if(event.target.value != '0' || event.target.name == 'name'){
        setSearch({
          ...search,
          [event.target.name]: [event.target.value]
        })
        // props.getStationDataByParams(1, 10, search)
      }
    }

	const downloadStationByID = (e, id) => {
		props.downloadStationDetails(id)
	}

  return(
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>Station Management</div>
        {hasAccess('Station', 'create')&&<Link to="/station-management/add">
        <Button onClick={addStation} className={classes.link1} variant="contained">
          + Add Station
        </Button>
        </Link>}
      </div>
      <div className={styles.table}>
      <div className={styles.filterContent}>
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <OutlinedInput
            // label="Search"
            className={classes.textField1}
            id="outlined-adornment-weight"
            name="name"
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

         {/*Select*/}
         <div className={styles.selectDiv1}>
           <select disabled={search.station_code} className={styles.select1} name="station_name" value={search.station_name} onChange={handleInputs}>
             <option value={'0'}>Station Name</option>
             {dropDownDetails.length > 0 && dropDownDetails.map(data =>
               <option key={data._id} value={data.station_name}>{data.station_name}</option>
             )}
         </select>
         </div>

          {/*<div className={styles.selectDiv1}>
            <select disabled={search.station_name} className={styles.select1} name="station_code" value={search.station_code} onChange={handleInputs}>
              <option value={'0'}>Station Code</option>
              {dropDownDetails.length > 0 && dropDownDetails.map(data =>
                <option key={data._id} value={data.station_code}>{data.station_code}</option>
              )}
          </select>
          </div>*/}

            <div className={styles.selectDiv1}>
              <select className={styles.select1} name="station_type" value={search.station_type} onChange={handleInputs}>
                <option value={'0'}>Station Type</option>
                {stationType.length > 0 && stationType.map(data =>
                <option key={data._id} value={data.station_type}>{data.station_type}</option>
              )}
            </select>
            </div>

          <div className={styles.selectDiv1}>
            <select className={styles.select1} name="managed_by" value={search.managed_by} onChange={handleInputs}>
              <option value={'0'}>Managed By</option>
              {managedByList.length && managedByList.map(data =>
                <option key={data._id} value={data._id}>{data.name}</option>
              )}
          </select>
          </div>

        <div className={classes.container1}>
				<TextField
					id="date"
					variant="outlined"
					type="date"
					size="small"
          name="start_date"
          value={search.start_date}
          onChange={(e) => handleDateChange(e, 'start')}
					className={classes.date1}
					InputProps={{
						placeholder: "From Date",
						classes: { input: classes.input1 },
						max: new Date().toISOString().slice(0, 10),
            focused: classes.focused1,
					}}
				/>
    		</div>

        <div className={classes.container1}>
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
            min: search.start_date.toString().slice(0, 10),
						placeholder: "From Date",
						classes: { input: classes.input1 },
						focused: classes.focused1,
					}}
				/>
    		</div>

        {/*Search Button*/}
        <Button className={classes.button1} onClick={searchStations} variant="contained">
          Search
        </Button>
      </div>

      <TableContainer className={classes.tableContainer} component={Paper}>
      <Table /*className={classes.table}*/ aria-label="simple table">
        <TableHead style={{backgroundColor: '#e4e4e4'}}>
          <TableRow>
            <TableCell>S.No.</TableCell>
            <TableCell align="center">Station Name</TableCell>
            <TableCell align="center">Station Code</TableCell>
            <TableCell align="center">Station Type</TableCell>
            <TableCell align="center">Managed By</TableCell>
            <TableCell align="center">No. of Platforms</TableCell>
            <TableCell align="center">Contact Person</TableCell>
            <TableCell align="center">Contact Person Mobile</TableCell>
            <TableCell style={{minWidth: 110}} align="center">Start Date</TableCell>
            <TableCell style={{minWidth: 110}} align="center">End Date</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        {rows.length > 0 && <TableBody>
          {rows.map((row, index) => (
            <TableRow className={classes.table} key={row.name}>
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
							<TableCell align="center">{row.station_name}</TableCell>
              <TableCell align="center">{row.station_code}</TableCell>
              <TableCell align="center">{row.station_type}</TableCell>
              <TableCell align="center">{row.managed_by?row.managed_by.name: '-'}</TableCell>
              <TableCell align="center">{row.no_of_platform}</TableCell>
              <TableCell align="center">{row.contact_name}</TableCell>
              <TableCell align="center">{row.contact_mobile}</TableCell>
              <TableCell align="center">{moment(row.contract_start_date).format("DD-MM-YYYY")}</TableCell>
              <TableCell align="center">{moment(row.exp_end_date).format("DD-MM-YYYY")}</TableCell>
              <TableCell align="center">
              <div className={styles.dropdown}>
                <button className={styles.dropbtn}>Action <img src={downArrow} className={styles.arrow}/></button>
                <div className={styles.dropdown_content}>
                  {hasAccess('Station', 'view') &&<a><div onClick={(e) => toggleModal(e, 'details', index)}>View Details</div></a>}
                  {hasAccess('Station', 'update') &&<Link to={`station-management/${row._id}`}><div onClick={(e) => editStation(e, row, index)}>Edit Details</div></Link>}
                  {hasAccess('Station', 'delete') &&<a><div onClick={(e) => toggleModal(e, 'delete', index)}>Delete Station</div></a>}
                </div>
                </div></TableCell>
            </TableRow>
          ))}

        </TableBody>}
      </Table>
    </TableContainer>
		{rows.length == 0 && <div className={styles.emptyTable} style={{ display: 'flex', justifyContent: 'center'}}>No Data Found</div>}
      </div>

			{/* After Delete Modal */}
			<Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal.deletedModal} toggle={toggleModalClose} centered={true}>
					<ModalBody modalClassName={styles.modalContainer}>
          <img style={{width: 60}} src={flag} />
					<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>Successfully Deleted Station</strong>  </p>
					</ModalBody>
					<ModalFooter className={styles.footer}>
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
				</Modal>

      {/* Modal for deleting Station */}
      <Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal.deleteModal} toggle={toggleModalClose} centered={true}>
					<ModalBody modalClassName={styles.modalContainer}>
          <img style={{width: 60}} src={delete_logo} />
				<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>Are you sure you want to delete {arrayDetails.station_name} Station?</strong>  </p>
					</ModalBody>
					<ModalFooter className={styles.footer}>
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
							onClick={(e) => { handleDeleteSubmit(e, arrayDetails._id) }}
						>
							YES
						</Button>
					</ModalFooter>
				</Modal>

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
				 <div style={{display: 'flex', justifyContent: 'flex-end'}}>
				 {hasAccess('Station', 'update') &&<Link to={`station-management/${arrayDetails._id}`}><button className={styles.modalButton}/*style={{display: 'contents'}}*/ onClick={(e) => editStation(e, arrayDetails)}>
				 <img className={styles.modalImage} style={{width: 30,height: 30, marginTop: 10, marginLeft: 10, marginRight: 10}} src={edit} />
				 <small style={{display: 'flex', alignItems: 'center'}}>Edit Details</small>
				 </button></Link>}
				 <button className={styles.modalButton} /*style={{display: 'contents'}}*/ onClick={(e) => downloadStationByID(e, arrayDetails._id)}>
				 <img className={styles.modalImage} style={{width: 30,height: 30, marginTop: 10, marginLeft: 10, marginRight: 10}} src={printer} />
				 <small style={{display: 'flex', alignItems: 'center'}}>Download Details</small>
				 </button>
				 </div>
						<div className={styles.modalOuterDiv} style={{display: 'flex'}}>

						<div className={styles.box1}>
							<div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>Station Details</div>
								<div className={styles.modalBox} /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
								<div className={styles.modalDiv}  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Station Name</span><span style={{marginLeft: 80,marginRight: 25}}> - </span>{arrayDetails.station_name}
								</div>
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Station Code</span><span style={{marginLeft: 86,marginRight: 25}}> - </span>{arrayDetails.station_code}
								</div>
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Station Type</span><span style={{marginLeft: 88,marginRight: 25}}> - </span>{arrayDetails.station_type}
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>No. of Platforms</span><span style={{marginLeft: 66,marginRight: 25}}> - </span>{arrayDetails.no_of_platform}
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Station GPS Coordinates</span><span style={{marginLeft: 15,marginRight: 25}}> - </span>{arrayDetails.station__gps_ltd}°N, {arrayDetails.station__gps_lng}°E
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Managed By</span><span style={{marginLeft: 90,marginRight: 25}}> - </span>{arrayDetails.managed_by?arrayDetails.managed_by.name: '-'}
								</div>
								</div>
						</div>

						<div className={styles.box1}>
						<div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>Contract Details</div>
							<div className={styles.modalBox} /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
							<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Contract Giver</span><span style={{marginLeft: 60,marginRight: 25}}> - </span>{arrayDetails.contract_giver}
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Contract Winner</span><span style={{marginLeft: 46,marginRight: 25}}> - </span>{arrayDetails.contract_winner}
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Contract Start Date</span><span style={{marginLeft: 29,marginRight: 25}}> - </span>{moment(arrayDetails.contract_start_date).format("DD-MM-YYYY")}
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Contract Tenure</span><span style={{marginLeft: 50,marginRight: 25}}> - </span>{arrayDetails.contract_tenure}
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Expected End Date</span><span style={{marginLeft: 31,marginRight: 25}}> - </span>{moment(arrayDetails.exp_end_date).format("DD-MM-YYYY")}
							</div>
							<div className={styles.modalDiv}  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}></span><span style={{marginLeft: 80,marginRight: 25}}> </span>
							</div>
							</div>
							</div>
						</div>

						<div className={styles.modalOuterDiv} style={{display: 'flex'}}>
						<div className={styles.box1}>
							<div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>Contact Person Details</div>
								<div className={styles.modalBox} /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Name</span><span style={{marginLeft: 134,marginRight: 25}}> - </span>{arrayDetails.contact_name}
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Phone Number</span><span style={{marginLeft: 76,marginRight: 25}}> - </span>{arrayDetails.contact_mobile}
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Email</span><span style={{marginLeft: 137,marginRight: 25}}> - </span>{arrayDetails.contact_email}
								</div>
								</div>
						</div>

						<div className={styles.box1}>
						<div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>Station Admin Details</div>
							<div className={styles.modalBox} /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
							<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Name</span><span style={{marginLeft: 115,marginRight: 25}}> - </span>{arrayDetails.station_admin?arrayDetails.station_admin.name: '-'}
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Phone Number</span><span style={{marginLeft: 57,marginRight: 25}}> - </span>{arrayDetails.station_admin?arrayDetails.station_admin.mobile: '-'}
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Email</span><span style={{marginLeft: 118,marginRight: 25}}> - </span>{arrayDetails.station_admin?arrayDetails.station_admin.email: '-'}
							</div>
							</div>
							</div>
						</div>
					</Modal>


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
		details: state.Stations.details,
    contractorsList: state.Stations.contractorsList,
    stationDetails: state.Stations.stationDetails,
    stationDocs: state.Stations.docs,
    total: state.Stations.total,
    limit: state.Stations.limit,
    isLoading: state.Stations.isLoading,
    stationType: state.Stations.stationType
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
    setIsLoading: (value) =>
      dispatch(actions.setIsLoading(value)),
    getStationData: () => {
      dispatch(actions.getStationData())
    },
    getStationDataByParams: (pageNo, limit, value) =>
      dispatch(actions.getStationDataByParams(pageNo, limit, value)),
    setStationData: (data) => {
      dispatch(actions.setStationDate(data))
    },
    setIsEditFalse: (value) => {
      dispatch(actions.setIsEditFalse(value))
    },
    deleteStation: (id) => {
      dispatch(actions.deleteStation(id))
    },
    GetContractors: () => {
      dispatch(actions.GetContractors())
    },
		downloadStationDetails: (id) =>
			dispatch(actions.downloadStationDetails(id))
	};
};

export default compose(connect(mapStateToProps,  mapDispatchToProps))(StationManagement);
