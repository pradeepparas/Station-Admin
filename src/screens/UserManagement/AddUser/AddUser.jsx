import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import {Link, useHistory, useParams }  from  'react-router-dom';
import moment from 'moment';
import { connect } from "react-redux";
import { compose } from 'redux';
import * as actions from "../../../redux/actions/userActions";
import * as API from "../../../constants/APIs";
import axios from 'axios';
import { getStationData, setIsSubmitted, setIsLoading } from "../../../redux/actions/stationActions";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "reactstrap";

// components saveButton
import styles from './AddUser.module.css';

// import logo from './logo.png';
import flag from '../../StationManagement/flag.svg';

// Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  FormControlLabel,
  Checkbox,
  Button
  } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { toast } from 'react-toastify';

const GreenCheckbox = withStyles({
  root: {
    color: '#213D77',
    '&$checked': {
      color: '#213D77',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

// const BootstrapInput = withStyles((theme) => ({
//   root: {
//     'label + &': {
//       marginTop: theme.spacing(3),
//     },
//   },
//   input: {
//     borderRadius: 4,
//     position: 'relative',
//     backgroundColor: theme.palette.background.paper,
//     border: '1px solid #ced4da',
//     fontSize: 16,
//     padding: '10px 26px 10px 12px',
//     transition: theme.transitions.create(['border-color', 'box-shadow']),
//     // Use the system font instead of the default Roboto font.
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//     '&:focus': {
//       borderRadius: 4,
//       borderColor: '#80bdff',
//       boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
//     },
//   },
// }))(InputBase);

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
  label: {
		color: "red",
		["@media (max-width:320px)"]: {},
	},
  textField1:{
    outline: 'none',
    width: 190,
    height: 41,
    borderRadius: 30,
    '&:focus': {
      borderColor: '#6c757d'
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
    borderRadius: 16,
    color: 'white',
    backgroundColor: '#213D77',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#213D77',
      color: '#FFF'
    }
  },
	saveButton1: {
		width: 100,
		marginRight: 20,
		borderRadius: 16,
    color: 'white',
    backgroundColor: '#213D77',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#213D77',
      color: '#FFF'
    },
		["@media (max-width:428px)"]: {
			marginRight: 0,
			width: '100%',
			// marginBottom: 5
		},
	},
  button2: {
		["@media (max-width:428px)"]: {
			marginRight: 0,
			width: '100%',
			marginBottom: 5
		},
		marginRight: 45,
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
    width: 170,
	},
	date1: {
    "& .MuiOutlinedInput-adornedEnd":{
      'filter' : 'invert(0%) sepia(3%) saturate(0%) hue-rotate(250deg) brightness(103%) contrast(104%)'
    },
		// marginLeft: theme.spacing(1),
		// marginRight: theme.spacing(1),
		// width: 170,
	},
}));

export function AddUser(props) {
  const [dropDownDetails, setDropDownDetails] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [role, setRole] = useState([]);
  const [modal, setModal] = useState(false);
  const classes = useStyles();
  const history= useHistory();
	const { user_id } = useParams();
  const [state, setState]=useState({
      userName:"",
      userNumber:"",
      role:"",
      stationName:"",
      userEmail:"",
			date: "",
      userPassword:"",// IDEA:
			// isEdit:false, isAdd:false,
  });
	const [values, setValues] = useState({
		password: "",
		showPassword: false,
	})
  const [errors , setErros]= useState({})

  // close modal
  const toggleModalClose =()=>{
    setModal(false)
    props.setIsSubmitted(false)
    history.push('/user-management')
  }

    //
		useEffect(()=>{
		if(props.isEdit){
			console.log(props.user)
			debugger
			setState(props.user)
			// set value in startDate

			//funciton
		}
		},[])

    //  Getting dropdown details
    useEffect(() => {
      if(props.userDetails){
        setDropDownDetails(props.userDetails)
        console.log(props.userDetails)
        // debugger
      }
    }, [props.userDetails])

    useEffect(() => {
      props.setIsLoading(true)
      axios({
        url: API.GetRoleAPI,
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        }
      }).then((response)=> {
        setRole(response.data.role)
        props.setIsLoading(false)
      })

      if(props.isEdit || user_id != 'add'){
        props.setIsLoading(true)
        axios({
          url: `${API.GetUserAPI}/${user_id}`,
          headers: {
            //    'Accept-Language': 'hi',
            "accept": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
             },
        }).then(response => {
          if(response.data.success){
            console.log(response.data.user)
            debugger
              // setState(data)
              setState({
                _id: response.data.user._id,
                userName: response.data.user.name,
                userNumber: response.data.user.mobile,
                role: response.data.user.role_id,
                stationName: response.data.user.station_id,
                userEmail: response.data.user.email?response.data.user.email:'',
                // date: response.data.user,
              })
          } else {
            setState([]);
          }
        }).catch(err => {
          toast.error(err.response.data.message)
          props.setIsLoading(false)
        })
        props.setIsLoading(false)
        // setState(props.stationData)
        // setDetails(props.stationData)
      }
    }, [])


  // Handle Submit User
  const handleSubmit = (e) => {

      e.preventDefault();
      if (!validateForm()) {
          return
      }

      // Add and Update User
      if(user_id === 'add') {
        debugger
        state.date = moment(new Date()).format("DD-MM-YYYY")
        console.log(state)
        debugger
		    props.addUserDetails(state)
        // debugger
      } else {
        props.EditUserDetails(state)
      }
  }

  // Open Modal for Add User Successfully and Update User Successfully
  useEffect(() => {
    debugger
    if(props.isSubmitted){
      setModal(true);
      if(user_id == 'add'){
        setIsAdd(true);
      } else {
        setIsAdd(false);
      }
    } else {

    }
  }, [props.isSubmitted])

	// useEffect
	useEffect(() => {
		props.getUserData()
	}, [])

  // validate form
  const validateForm =()=>{
    // All regex for validation
       var emailValid = state.userEmail.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
       var mobileValid = state.userNumber.toString().match(/^[0]?[6789]\d{9}$/);
       var usernameRegex = state.userName.toString().match(/^[a-zA-Z0-9]+$/);

       var isValid= true;
       if(state.userName.trim()==''){
           errors.userName="Name is required";
           isValid =false;
       }
      else if(state.userNumber.toString().trim()==''|| !mobileValid){
          errors.userNumber="phone number is required or invalid number";
          isValid =false;
      }
			else if(state.userEmail.toString().trim()!=='' && !emailValid){
          errors.userEmail="invalid email example ";
          isValid =false;
      }
    else  if(state.stationName.trim()=='' || state.stationName == '0'){
          errors.stationName="station name is required";
          isValid =false;
      }
      else if(state.role.trim()=='' || state.role == '0'){
          errors.role="role field is required";
          isValid =false;
      }
      else if((user_id == 'add') && (state.userPassword.toString().trim()==''||
                !(state.userPassword.length >= 3 && state.userPassword.length <= 10))){
          errors.userPassword="password is in between 3 to 10 characters";
          isValid =false;
      }

      setErros({...errors, errors:errors})
      return isValid
   }

  const handleInputs = (event) => {
		console.log(event.target.name, event.target.value)
		// debugger

    setState({
      ...state,
      [event.target.name]: (event.target.name == 'userPassword'
                          || event.target.name == 'userNumber')?
                          event.target.value.trim() : event.target.value
    })
    // debugger
    setErros({errors, [event.target.name]:""})
  }

	// Password visibility on off
	const handleClickShowPassword = () => {
		console.log(values.password);
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

  return(
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title1}>{user_id == 'add' ? "Add User" : "Edit User"}</div>
        <Button startIcon={<ArrowBackIosIcon color="white" />} onClick={() => history.push('/user-management')} className={classes.button1} variant="contained">
          Back
        </Button>
      </div>
        <div className={styles.box}>
        <div className={styles.box1}>
          <div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>User Details</div>
            <div className={styles.grid}>
              <div className={styles.textfield}>
              <label style={{color: 'black'}}>Name</label>
                <input autocomplete="off" name="userName" value={state.userName} onChange={handleInputs} className={styles.inputfield} type="text" />
                <div className={styles.error_message}>{errors.userName}</div>
              </div>

              <div className={styles.textfield}>
                <label style={{color: 'black'}}>Phone Number</label>
                <input autocomplete="off" name="userNumber" value={state.userNumber} onChange={handleInputs} className={styles.inputfield} type="text" />
                <div className={styles.error_message}>{errors.userNumber}</div>
              </div>

							<div className={styles.textfield}>
	              <label style={{color: 'black'}}>Email</label>
	              <input autocomplete="off" name="userEmail" value={state.userEmail} onChange={handleInputs} className={styles.inputfield} type="text" />
	              <div className={styles.error_message}>{errors.userEmail}</div>
	            </div>

            <div className={styles.textfield}>
              <label style={{color: 'black'}}>Station Name</label>
              <select className={styles.select1} name="stationName" value={state.stationName} onChange={handleInputs}>
                <option value={'0'}>Station Name</option>
                {dropDownDetails.length > 0 && dropDownDetails.map(data =>
                  <option key={data._id} value={data._id}>{data.station_name}</option>
                )}
            </select>
            <div className={styles.error_message}>{errors.stationName}</div>
            </div>

						<div className={styles.textfield}>
							<label style={{color: 'black'}}>Role</label>
							<select className={styles.select1} name="role" value={state.role} onChange={handleInputs}>
								<option value={'0'}>Role</option>
								{role.length > 0 && role.map(data =>
                  <option key={data._id} value={data._id}>{data.role.replace('_', ' ')}</option>
                  )}
						</select>
						<div className={styles.error_message}>{errors.role}</div>
						</div>

            {user_id == 'add' ? <div className={styles.textfield}>
              <label style={{color: 'black'}}>Password</label>

              <input style={{position: 'relative'}} autocomplete="off" name="userPassword" value={state.userPassword} onChange={handleInputs} className={styles.inputfield} type={values.showPassword? "text" : "password"} />
							<span>
							<IconButton
								style={{position: 'relative',float: 'right', backgroundColor: 'white', width: 33, height: 33}}
								className={styles.passwordIcon}
								aria-label="toggle password visibility"
								onClick={
									handleClickShowPassword
								}
								onMouseDown={
									handleMouseDownPassword
								}
								edge="end"
							>
								{values.showPassword ? (
									<Visibility />
								) : (
									<VisibilityOff />
								)}
							</IconButton>
							</span>
							<div style={{marginTop: -31}} className={styles.error_message}>{errors.userPassword}</div>
            </div>: <div></div>}


						{/*Dummy Div*/}
						<div className={styles.extraDiv}></div>
						<div></div>
						<div className={styles.saveButton}>
			      <Button style={{}} onClick={() => history.push('/user-management')}  className={classes.button2} variant="contained">
			        Cancel
			      </Button>
			      <Button style={{}} onClick={handleSubmit} className={classes.saveButton1} variant="contained">
			        {user_id == 'add' ? "Save" : "Update"}
			      </Button>
			      </div>
            </div>
        </div>

      </div>

      {/* Modal for Add Update User */}
			<Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal} toggle={toggleModalClose} centered={true}>
					<ModalBody modalClassName={styles.modalContainer}>
          <img style={{width: 60}} src={flag} />
					<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>{isAdd ? "Successfully Added User": "Successfully Updated"} </strong>  </p>
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
    </div>
  );
}

const mapStateToProps = (state) => {
	return {
    isSubmitted: state.Stations.isSubmitted,
		user: state.Users.userData,
		isEdit: state.Users.isEdit,
    userDetails: state.Stations.stationDetails,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    setIsSubmitted: flag => {
      dispatch(setIsSubmitted(flag))
    },
    setIsLoading: (value) =>
      dispatch(setIsLoading(value)),
		addUserDetails: (user) =>
			dispatch(actions.userActions(user)),
    getUserData: () => {
      dispatch(getStationData())
    },
    EditUserDetails: (details) =>
      dispatch(actions.EditUserDetails(details))
	}
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(AddUser);
