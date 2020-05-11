import React from 'react';

export default function BreweryFinder(props){
    return(
        <div>
            <div className='lookupContainer'>
                <div className='autoBreweryFinder'>
                    <p id='autoBreweryFinderText'>QUICK! Lets find a brewery close to you right...</p>
                    <button className='quickFindButton' type='button' onClick={props.handleBreweryQuickFind}> NOW!</button>
                </div>
                <div className='breweryLookUp'>
                    <p> Or you can look up breweries using a zipcode. Enter a five digit zipcode below and click the button to get started.</p>
                    <form>
                        <input type='number' id='userEnteredZipcode' placeholder='Zipcode' /><br/>                            
                    </form>
                    <button type='button' className='findBreweryByInputButton' onClick={props.handleBreweryFindByUserInput}>Find Breweries By Zip</button>
                </div>
            </div>
        </div>
    );
};
