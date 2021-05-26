import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import { DataContext } from "../context/Context";

export default class ProtecRoutes extends Component {
   
    state = {  }
    render() { 
        const { logeado } = this.context;
        const { component: Component, ...rest } = this.props;
        return ( 
            <Route {...rest} 
            render={ props =>{
                if (logeado){
                    return <Component {...props}/>
                }else {
                    return <Redirect to= {
                        {
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
                    
                }}
                />
         );
    }
}
ProtecRoutes.contextType = DataContext;
