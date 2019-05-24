import React from 'react';

export const UserContext = React.createContext()

class Provider extends React.Component {
    state = {
        getToken: () => {
            return this.state.token || '' 
         },
        setToken: (value) => {
            this.setState({token: value}) 
        },
        setUser: (value) => {
            this.setState({user: value}) 
        },
        setMaps: (value) => {
            this.setState({localisation: value}) 
        }

    }
    render(){
        return(
            <UserContext.Provider value={{...this.state}}>
            {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default Provider