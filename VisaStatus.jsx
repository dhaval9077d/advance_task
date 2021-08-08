import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';
import { Grid, GridColumn,Button } from 'semantic-ui-react';

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)
        const visaDetail = props.visaDetail ?
            Object.assign({}, props.visaDetail)
            : {
                visaStatus:'',
                visaExpiryDate:''
            }
        this.state={
            visible:false,
            newVisaDetail:visaDetail
        }
        this.onUpdateVisaStatus=this.onUpdateVisaStatus.bind(this)
        this.onChangeVisaDate=this.onChangeVisaDate.bind(this)
        this.onClickSave=this.onClickSave.bind(this)
    }
    onUpdateVisaStatus(event)
    {
        if(event.target.value == "Work" || event.target.value == "Student")
        {
        const newVisaDetail=this.state.newVisaDetail
        newVisaDetail.visaStatus=event.target.value
        this.setState(
            {
                visible:true,
            }
        )
        this.props.saveProfileData({visaStatus : event.target.value})
        }
        else
        {
            this.setState(
                {
                    visible:false
                }
            )
            this.props.saveProfileData({visaStatus : event.target.value})
        }
    }
    onChangeVisaDate(event,data)
    {
        let newVisaDetail=this.state.newVisaDetail
        newVisaDetail.visaExpiryDate=(event.target.value)
        this.setState(
            {
                newVisaDetail
            }
        )
    }
    onClickSave()
    {
        this.props.saveProfileData({visaExpiryDate : this.state.newVisaDetail.visaExpiryDate})
        this.props.loadData()
    }
    render() {
        return(
            <div className='row'>
            <div className="ui sixteen wide column">
            <Grid>
                <Grid.Column width={6}>
                <label style={{fontWeight: "bold", fontSize:"small" , paddingBottom:"20px" }}>Visa Type</label>
                <select label='Visa Type' name='level' value={this.props.visaDetail.visaStatus} onChange={this.onUpdateVisaStatus}>
                            <option value="Citizen">Citizen</option>
                            <option value="Permanent Resident">Permanent Resident</option>
                            <option value="Work">Work Visa</option>
                            <option value="Student">Student Visa</option>
                        </select>
                </Grid.Column>
                {this.state.visible ?
                <Grid.Column width={10}>
                    <Grid>
                        <Grid.Column width={10}>
                            <label style={{fontWeight: "bold", fontSize:"small" , paddingBottom:"20px" }}>Visa expiry date</label>
                            <input
                                    type='date'
                                    name="visaExpiryDate"
                                    placeholder="Date"
                                    content={this.state.newVisaDetail.visaExpiryDate}
                                    onChange={this.onChangeVisaDate}
                                />
                        </Grid.Column>
                        <GridColumn>
                            <br/>
                            <button type="button" className="ui teal button" onClick={this.onClickSave}>Save</button>
                        </GridColumn>
                    </Grid>
                </Grid.Column>
               :null 
            }
           </Grid>
            </div>
        </div>
        )
    }
}