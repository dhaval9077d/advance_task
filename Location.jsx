import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { default as  nationalities} from '../../../../util/jsonFiles/nationalities.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Grid } from 'semantic-ui-react';

export class Address extends React.Component {
    constructor(props) {
        super(props)
        const location=props.addressData?
        Object.assign({}, props.details)
        : {
                number:"",
                street:"",
                suburb:"",
                country:"",
                city:"",
                postCode:""
        }
        this.state={
            showEditSection: false,
            newLocation:location
        }
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.onSaveAddress=this.onSaveAddress.bind(this)
    }
    openEdit() {
        const addressData = Object.assign({}, this.props.addressData)
        this.setState({
            showEditSection: true,
            newLocation: addressData
        })
    }
    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }   
    handleChange(event) {
        const data = Object.assign({}, this.state.newLocation)
        data[event.target.name] = event.target.value
        this.setState({
            newLocation: data
        })
    }
    onSaveAddress()
    {
        this.props.saveProfileData({address : this.state.newLocation})
        this.closeEdit()
    }
    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
    renderEdit()
    {
        let countriesOptions = [];
        let citiesOptions=[];
        const selectedCountry = this.state.newLocation.country;
        const selectedCity = this.state.newLocation.city;
        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);
        if (selectedCountry != "" && selectedCountry != null ) {
            var popCities = Countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>);
        }
        return(
            <div className='ui sixteen wide column'>
                <Grid columns='equal'>
                    <Grid.Column key={1}>
                        <ChildSingleInput
                            inputType="text"
                            label="Number"
                            name="number"
                            defaultValue={this.state.newLocation.number}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="House number"
                            errorMessage="Please enter a street number"
                        />
                    </Grid.Column>
                    <Grid.Column width={8}  key={2}>
                        <ChildSingleInput
                            inputType="text"
                            label="Street"
                            name="street"
                            defaultValue={this.state.newLocation.street}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Street"
                            //errorMessage="Please enter a valid GitHub Url"
                        />
                    </Grid.Column>
                    <Grid.Column  key={3}>
                        <ChildSingleInput
                            inputType="text"
                            label="Suburb"
                            name="suburb"
                            defaultValue={this.state.newLocation.suburb}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Suburb"
                            //errorMessage="Please enter a valid GitHub Url"
                        />
                    </Grid.Column>
                </Grid>
                <Grid columns='equal'>
                    <Grid.Column width={8}  key={4}>
                        <label style={{fontWeight: "bold", fontSize:"small" , paddingBottom:"10px" }}>Country</label>
                        <select 
                            //label="Country"
                            //placeholder="Country"
                            value={selectedCountry}
                            onChange={this.handleChange}
                            name="country"
                            >
                            <option value="">Country</option>
                            {countriesOptions}
                        </select>
                    </Grid.Column>
                    <Grid.Column  key={5}>
                        <label style={{fontWeight: "bold", fontSize:"small"}}>City</label>
                        <select
                            //className="ui dropdown"
                            //placeholder="City"
                            value={selectedCity}
                            onChange={this.handleChange}
                            name="city"
                            >
                            <option value="">City</option>
                            {popCities}
                        </select>
                    </Grid.Column>
                    <Grid.Column  key={6}>
                        <ChildSingleInput
                            inputType="text"
                            label="Post Code"
                            name="postCode"
                            defaultValue={this.state.newLocation.suburb}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Post Code"
                            errorMessage="Please enter a valid GitHub Url"
                        />
                    </Grid.Column>
                </Grid>
            
         <Grid>
        <Grid.Column  key={7}>
        <button type="button" className="ui teal button" onClick={this.onSaveAddress} >Save</button>
        <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>  
        </Grid.Column>
        </Grid>     
        </div>
        )
    }
    renderDisplay()
    {
        const Address= this.props.addressData.number + " " + this.props.addressData.street + " " +this.props.addressData.suburb
        const city=this.props.addressData.city
        const country=this.props.addressData.country
        return(
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {Address}</p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}
export class Nationality extends React.Component {
    constructor(props) {
        super(props)  
    }
    render() {
		let nationalitiesoption=[]
		nationalitiesoption = Object.keys(nationalities).map((x) => <option key={x} value={x}>{x}</option>);
        return(
            <div className='row'>
                <div className="ui sixteen wide column">
				<label style={{fontWeight: "bold", fontSize:"small" , paddingBottom:"10px" }}>Country</label>
                        <select 
                            onChange={(event) => this.props.saveProfileData({nationality : event.target.value})}
                            name="nation"
                            >
                            <option value="">{this.props.nationalityData}</option>
                            {nationalitiesoption}
                        </select>
               </div>
            </div>
        )
        
    }
}