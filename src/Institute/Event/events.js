import React from 'react';
import Eventcard from './Eventcard'
import { connect } from 'react-redux'



class Events extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            all:null,
            loading:true,
            data:null
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
        const response = await fetch('https://alumni-backend-app.herokuapp.com/alumni/events', values);
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
            console.log(dataarray[0].title)
            this.setState({
                data : dataarray,
                loading : false
            })
        }
    }


    render(){
        return(
            <div>
                <br/>
                <br/>
                {!this.state.loading ? 
                (
                    <div>{this.state.data.map((item,number) => <Eventcard key={number} id={item._id} time={item.time}title={item.title} subtitle={item.subtitle} />)}</div>
                ) : (
                    <div>
                    <br/>
                    <h4>Loading ..</h4>
                    </div>
                )

                }
            </div>
        )
    }
}

const mapStatesToProps = state => {
    return{
        token : state.Auth_token
    }
}


export default connect(mapStatesToProps,null) (Events);




