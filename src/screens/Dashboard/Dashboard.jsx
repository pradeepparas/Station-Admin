import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import styles from "./Dashboard.module.css";
import jwt_decode from "jwt-decode";
import { compose } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios';
import { toast } from 'react-toastify';
// import { withTranslation,useTranslation } from 'react-i18next';

// Material UI
import CallMadeSharpIcon from '@material-ui/icons/CallMadeSharp';

//  Import images
import train1 from '../../components/Drawer/images/train1.svg';
import servicestack from '../../components/Drawer/images/servicestack.svg';
import user_friends from '../../components/Drawer/images/user_friends.svg';
import user_check from '../../components/Drawer/images/user_check.svg';
import rupee from '../../components/Drawer/images/rupee.svg';

import Card from "../../components/Card/Card";
import * as actions from '../../redux/actions/stationActions';

export function DashBoard(props) {
	const history = useHistory();
	const [counts, setCounts] = useState({
		station: "",
		user: "",
		total_service: "",
		vendor_service: ""
	})
	// const [t, i18n] = useTranslation('common');
	// useEffect(()=>{
	// 	props.getDashboardCount()
	// },[])

	useEffect(() => {
		// Get Dashboard Count
		props.getDashboardCount(1)
	}, [])

	useEffect(() => {
		if(props.dashboadCount){
			setCounts(props.dashboadCount)
			debugger
		}
	}, [props.dashboadCount])

	useEffect(() => {
		let token = localStorage.getItem('token')
		if(token == null){
			history.push('/')
		}
		console.log(jwt_decode(localStorage.getItem('token')).exp < Date.now() / 1000)
		debugger
	}, [])

	return (
		<>
			<div className={styles.title}>Dashboard</div>
			{/* <button onClick={() => i18n.changeLanguage('hi')}>Hindi</button> */}
			<div className={styles.grid}>
			{<Card title={'Total Stations'} number={counts.station?counts.station: "0"} icon={train1} link="/station-management" arrow={<CallMadeSharpIcon />} color="#2d62ed" />}
			{<Card title={'Total Users'} number={counts.user? counts.user: "0"} arrow={<CallMadeSharpIcon />} link="/users" /**/ icon={servicestack} color="#7d00b5" />}
			{<Card title={'Total Vendors'} number={counts.vendor_service? counts.vendor_service: "0"} arrow={<CallMadeSharpIcon />} link="/vendors" icon={user_friends} color="#ff007c" />}
			{<Card title={'Total Services'} number={counts.total_service? counts.total_service: "0"} icon={user_check} color="#0a4491" />}
		  	{<Card title={'Total Revenue'} arrow={<CallMadeSharpIcon />} number="256K" link="/revenue" icon={rupee} color="#025e87" />}
		  	{<Card title={"Today's Revenue"} arrow={<CallMadeSharpIcon />} number="2500" icon={rupee} color="#02873d" />}
			</div>
		</>
	);
}

const mapStateToProps =(state)=>{
	return{
		dashboadCount: state.Stations.dashboardCount,
	}
}

const mapDispatchToProps =(dispatch)=>{
	return {
		getDashboardCount: (type) =>
			dispatch(actions.getDashboardCount(type)),
	}
}
export default compose(connect(mapStateToProps, mapDispatchToProps))(DashBoard)
