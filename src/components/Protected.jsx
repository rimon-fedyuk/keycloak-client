import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function Protected( { token } ) {
	const isRun = useRef( false );
	const [ data, setDate ] = useState( null );

	useEffect( () => {
		if ( isRun.current ) return;
		isRun.current = true;

		const config = {
			headers: {
				authorization: `Bearer ${ token }`
			}
		};

		axios.get( "http://localhost:5001/documents", config )
			.then( res => setDate( res.data ) )
			.catch( err => console.log( err ) );
	}, [] );

	return data ? <>{ data.map( ( rec, i ) => ( <h3 key={ i }>{ rec }</h3> ) ) }</> : <div>loading</div>;
}

export default Protected
