import React from 'react';
import 'bulma/css/bulma.css';
import './style.css';
import {
    Link
  } from "react-router-dom";


export default class Jobcard extends React.Component{
    render(){
        return(
            <div>
            <div id='job'>
                <div style={{width:'320px'}}className="card">
                <header style={{width:'320px',height:'55px'}} className="card-header" >
                <p className=" is-centered card-header-title">
                {this.props.company}
                </p>
                </header>
                <div className="card-content">
                <div className="content">
               <strong>As a :   </strong>{this.props.title}<br/>
               <strong>Industry :   </strong>{this.props.industry}<br/>
               <strong>For :   </strong>{this.props.for}<br/>
               <strong>Salary :   </strong>{this.props.salary}<br/>
               {this.props.description}<br/>
               <a href="http://www.google.com">#{this.props.skill1}</a> <a href="http://www.google.com">#{this.props.skill2}</a>
                <br/>
                </div>
                </div>
                <footer style={{width:'320px',height:'50px'}} className="card-footer">
                <Link style={{"textDecoration":'none'}} className="card-footer-item" to={`/jobs/${this.props.id}`}>Link</Link>
        
                </footer>
                </div>
            </div>
            </div>
        );
    }
}