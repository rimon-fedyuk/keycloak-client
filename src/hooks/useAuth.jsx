import React, { useState, useEffect, useRef } from "react";
import Keycloak from "keycloak-js";

const useAuth = () => {
	const isRun = useRef( false );
	const [ token, setToken ] = useState( null );
	const [ isLogin, setLogin ] = useState( false );

	useEffect( () => {
		if ( isRun.current ) return;
		isRun.current = true;

		const client = new Keycloak( {
			url: import.meta.env.VITE_KEYCLOCK_URL,
			realm: import.meta.env.VITE_KEYCLOCK_REALM,
			clientId: import.meta.env.VITE_KEYCLOCK_CLIENT,
		} );

		client.init( {
			onLoad: "login-required"
		} ).then( res => {
			setLogin( res );
			setToken( client.token );
		} );
	}, [] );

	return [ isLogin, token ];
};

export default useAuth;
