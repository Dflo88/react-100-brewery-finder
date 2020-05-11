import React, { Component } from 'react';

class BreweryFinder extends Component {
    constructor(props){
        super(props);
    };

    handleBreweryQuickFind() {
        this.props.handleBreweryQuickFind();
    };

    handleBreweryFindByUserInput() {
        let userEnteredZipcode = document.getElementById('userEnteredZipcode').value;
        this.props.handleBreweryFindByUserInput(userEnteredZipcode);
    }

    render(){
        return(
            <div>
                <div className='lookupContainer'>
                    <div className='autoBreweryFinder'>
                        <p id='autoBreweryFinderText'>QUICK! Lets find a brewery close to you right...</p>
                        <button className='quickFindButton' type='button' onClick={this.handleBreweryQuickFind.bind(this)}> NOW!</button>
                    </div>
                    <div className='breweryLookUp'>
                        <p> Or you can look up breweries using a zipcode. Enter a five digit zipcode below and click the button to get started.</p>
                        <form>
                            <input type='number' id='userEnteredZipcode' placeholder='Zipcode' /><br/>                            
                        </form>
                        <button type='button' className='findBreweryByInputButton' onClick={this.handleBreweryFindByUserInput.bind(this)}>Find Breweries By Zip</button>
                    </div>
                </div>
            </div>
        );
    };
};
export default BreweryFinder;