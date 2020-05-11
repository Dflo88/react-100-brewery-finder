import React, { Component } from 'react';
import BreweryFinder from './BreweryFinder'
import BreweryLocations from './BreweryLocations';
import ErrorMessage from './ErrorMessage'
import Axios from 'axios';

class App extends Component {
    constructor(props){
        super(props);
// Notes on state: localBrewery will house the locations of local breweries using the OpenBreweryDB api.
// currentLocation will house the users current location found using the freeGeoIP api or a user submitted data.
// displayView will tell our application which views to render.
        this.state = {
            localBrewery : [],
            currentLocation : [],
            displayView : 1,
         }
         this.handleBreweryQuickFind = this.handleBreweryQuickFind.bind(this);
         this.handleReturnToBreweryFinder = this.handleReturnToBreweryFinder.bind(this);
         this.handleBreweryFindByUserInput = this.handleBreweryFindByUserInput.bind(this);
    };

    componentDidMount(){
        Axios.get('/api')
        .then(currentLocation => this.setState({ currentLocation: {
            city: currentLocation.data.city,
            zip: currentLocation.data.zip,
            state: currentLocation.data.region_name
        }}));
    };
   
    handleBreweryQuickFind() {
        Axios
            .get(`https://api.openbrewerydb.org/breweries?by_postal=${this.state.currentLocation.zip}`)
            .then(response => response.data)
            .then(localBrewery => this.setState({ localBrewery }))
            .then(() => this.setState({ displayView : 2}));
    };

    handleReturnToBreweryFinder() {
        this.setState({ displayView : 1});
        this.setState({localBrewery: []});
    };

    handleBreweryFindByUserInput(userEnteredZipcode) {
        userEnteredZipcode.length != 5 ? alert('Please enter a 5 digit zipcode!') : 
        Axios
            .get(`https://api.openbrewerydb.org/breweries?by_postal=${userEnteredZipcode}`)
            .then(response => response.data)
            .then(localBrewery => this.setState({ localBrewery }))
            .then( () => {
                this.state.localBrewery.length === 0 ? this.setState({displayView: 3}) : this.setState({displayView: 2});
            });
    };
    render(){
        // The view that is displayed is rendered based on the state value for 'displayView'. If displayView
        // is equal to 1, then the <BreweryFinder> component will render. This componenet is used to search 
        //for a brewery. If displayView is equal to 2, then <BreweryLocations> will render which shows all the 
        //local breweries we found. If displayView is equal to 3, then <ErrorMessage> will render which shows a
        // message that no breweries were found in the area searched.
        let currentView;
        switch(this.state.displayView){
            case 1:
                currentView = <BreweryFinder handleBreweryFindByUserInput={() => this.handleBreweryFindByUserInput(document.getElementById('userEnteredZipcode').value)} handleBreweryQuickFind={this.handleBreweryQuickFind}/>;
                break;
            case 2:
                currentView = <div>
                                    <div className='breweryLocationTable'>
                                        <div className='tableHeaders tableName'>Brewery Name</div>
                                        <div className='tableHeaders tableWebsite'>Brewery Website</div>
                                        <div className='tableHeaders tableAddress'>Brewery Address</div>
                                        <div className='tableHeaders tableMap'>Link to map</div>
                                    </div>
                                    {
                                        this.state.localBrewery.map(breweryInfo => (
                                            <BreweryLocations 
                                            key={breweryInfo['id']}
                                            name={breweryInfo['name']}
                                            website={breweryInfo['website_url']}
                                            street={breweryInfo['street']}
                                            city={breweryInfo['city']}
                                            state={breweryInfo['state']}
                                            zip={breweryInfo['postal_code']}
                                            longitude={breweryInfo['longitude']}
                                            latitude={breweryInfo['latitude']}
                                            />
                                        ))
                                    }
                                    <button type='button' className='returnToBreweryFinderButton' onClick={this.handleReturnToBreweryFinder}>Start a new brewery search!</button>
                              </div>
                break;
            case 3:
                currentView = <ErrorMessage handleReturnToBreweryFinder={this.handleReturnToBreweryFinder}/> 
                break;
        };
        return(
            <div className='container'>
                <header>
                    <p className='headerTitle'>Welcome to breweryFinder</p>
                    <p className='headerSubTitle'>The fastest way to find a brewery near you.</p>
                </header>
                <main>
                    {currentView}
                </main>
            </div>
        );
    };
};
export default App;