import React from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import Interviewcard from './InterviewCard';
import Spinner from 'react-bootstrap/Spinner'
import  './Style/toStyle.css';


class Interviews extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            all: null,
            loading : true,
            data : null
          }
        
          this.toArray = this.toArray.bind(this);
    }

    async componentDidMount(){
        const values = {
            method : "GET",
            headers : {
                'x-auth' : this.props.token,
            } 
        }
        try{
        const response = await fetch('https://alumni-backend-app.herokuapp.com/alumni/interviews', values);
        console.log(response)
        if (!response.ok) {
            throw new Error(response.status); // 404
          }
        const json = await response.json();
        console.log(json)
        this.setState({all:json})
        this.toArray()
        }
        catch(error){
            console.log(error)
        }
    }

    toArray = () => {
        const dataarray = [];
        if(this.state.all)              
        {
            const stateall = this.state.all;
            Object.keys(stateall).forEach(key => {
                dataarray.push(stateall[key])
            })
            console.log(dataarray[0].topics);
            this.setState({
                data : dataarray,
                loading : false
            })
        }
    }
    

    render(){
        return(
            <div>
                <div className="container div-Container">
                <div className="notification" id="jobcard-div">
                <Link className='button' to='/addinterview'>Add Experience</Link>
                { this.state.loading || !this.state.data ?
                (
                    <div id='Loading-id'>
                    <Spinner  animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                    </Spinner>
                    </div>
                ) : (
                    <div id="Jobcard-id">{this.state.data.map((item,index) => 
                    <Interviewcard
                    key={index}
                    company={item.company}
                    id={item._id}
                    difficulty={item.difficulty}
                    industry={item.industry}
                    title={item.workTitle}
                    topic={item.topics}/>
                    )}</div>
                ) }
                </div>
                </div>
            </div>
        )
    }
}


const mapStatesToProps = state => {
    return{
        token : state.Auth_token
    }
}


export default connect(mapStatesToProps,null) (Interviews);