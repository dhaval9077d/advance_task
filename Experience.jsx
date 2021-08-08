/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Grid , Icon, Input,Table} from 'semantic-ui-react';
import moment from 'moment';

export default class Experience extends React.Component {
    constructor(props) {
        super(props);
        const experienceData=props.experienceData ?
        props.experienceData
        :{
            id:'',
            company:'',
            position:'',
            responsibilities:'',
            start:'',
            end:''
        }
        this.state = {
            showEditSection: false,
            newExperienceData:experienceData,
            edit:false,
            editId:''
        }
        this.openAdd = this.openAdd.bind(this)
        this.closeAdd = this.closeAdd.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.onChangeStartDate=this.onChangeStartDate.bind(this)
        this.onChangeEndDate=this.onChangeEndDate.bind(this)
        this.onClickAdd=this.onClickAdd.bind(this)
        this.OnDeleteClick=this.OnDeleteClick.bind(this)
        this.onUpdateClick=this.onUpdateClick.bind(this)
        this.openEdit=this.openEdit.bind(this)
    }
    openAdd(event) {
        const newExperienceData=this.state.newExperienceData
        newExperienceData.start=''
        newExperienceData.end=''
        this.setState(
            {
                showEditSection: true,
                editId:event.target.id,
            }
        )
    }
    closeAdd() {
        this.setState({
            showEditSection: false,
            edit:false
        })
    } 
    openEdit(event)
    {
        this.props.experienceData.map((l) =>
        {
            if(event.target.id == l.id)
            {
                this.setState(
                    {
                        newExperienceData:l
                    }
                )
            }
        })
        this.setState(
            {
                edit:true,
                editId:event.target.id
            }
        )
    }
    handleChange(event) {
        const data = Object.assign({}, this.state.newExperienceData)
        data[event.target.name] = event.target.value ? event.target.value : event.target.defaultValue
        this.setState({
            newExperienceData: data
        })
    } 
    onChangeStartDate(event,data)
    {
        const newExperienceData=this.state.newExperienceData
        newExperienceData.start=event.target.value;
        this.setState(
            {
                newExperienceData
            }
        )
    }
    onChangeEndDate(event,data)
    {
        const newExperienceData=this.state.newExperienceData
        newExperienceData.end=event.target.value;
        this.setState(
            {
                newExperienceData
            }
        )
    }
    onClickAdd(event)
    {
        
        const data = Object.assign({}, this.state.newExperienceData)
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://advancetaskprofile.azurewebsites.net/profile/profile/AddExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(data),
            success: function (res) {
                if (res.success == true) {
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                    this.props.loadData()
                } else {
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }
            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
        this.closeAdd()
       this.props.loadData()
    } 
    OnDeleteClick(event)
    {
        let newExperienceData=this.state.newExperienceData;
        newExperienceData.id=event.target.id;
        this.setState
        {
            newExperienceData
        }
       const data = Object.assign({}, this.state.newExperienceData)
       var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://advancetaskprofile.azurewebsites.net/profile/profile/deleteExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(data),
            success: function (res) {
                if (res.success == true) {
                    TalentUtil.notification.show("Profile Deleted sucessfully", "success", null, null)
                    this.props.loadData()
                } else {
                    TalentUtil.notification.show("Profile did not Deleted successfully", "error", null, null)
                }
            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
        this.props.loadData()
        this.closeAdd()
    }
    onUpdateClick(event)
    {
        let newExperienceData=this.state.newExperienceData;
        newExperienceData.id=event.target.id;
        this.setState
        {
            newExperienceData
        }
        const data = Object.assign({}, this.state.newExperienceData)
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://advancetaskprofile.azurewebsites.net/profile/profile/updateExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(data),
            success: function (res) {
                if (res.success == true) {
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                    this.props.loadData()
                } else {
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }
            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
        this.closeAdd()
    }
    render()
    {
        return (
            this.state.showEditSection ? this.renderAdd() : this.renderDisplay()
        )
    }
    renderAdd() {
        return(
            <div className='row'>
                <div className="ui sixteen wide column">
                <Grid columns='equal'>
                <Grid.Column>
                        <label style={{fontWeight: "bold", fontSize:"small" , paddingBottom:"10px" }}>Company:</label><br/>
                        <Input
                        placeholder='Company' 
                        name='company'
                        onChange={this.handleChange}
                    />
                    </Grid.Column>
                    <Grid.Column>
                        <label style={{fontWeight: "bold", fontSize:"small" , paddingBottom:"10px" }}>Position:</label><br/>
                        <Input
                        placeholder='Position' 
                        name='position'
                        onChange={this.handleChange}
                    />
                    </Grid.Column>
                </Grid>
                <Grid columns='equal'>
                    <Grid.Column>
                    <label style={{fontWeight: "bold", fontSize:"small" , paddingBottom:"10px" }}>Start Date:</label><br/>
                                <input
                                    type='date'
                                    name="start"
                                    placeholder="Date"
                                    content={this.state.newExperienceData.start}
                                    //iconPosition="left"
                                    onChange={this.onChangeStartDate}
                                />
                    </Grid.Column>
                    <Grid.Column>
                    <label style={{fontWeight: "bold", fontSize:"small" , paddingBottom:"10px" }}>End Date:</label><br/>
                                <input
                                    type='date'
                                    name="end"
                                    placeholder="Date"
                                    content={this.state.newExperienceData.end}
                                    //iconPosition="left"
                                    onChange={this.onChangeEndDate}
                                />
                    </Grid.Column>
                </Grid>
                <Grid>
                <Grid.Column>
                <label style={{fontWeight: "bold", fontSize:"small" , paddingBottom:"10px" }}>Responsibilities</label>
                <Input fluid 
                    placeholder='Responsibilities' 
                    name='responsibilities'
                    onChange={this.handleChange}
                />
                </Grid.Column>
                </Grid>
                <Grid>
                    <Grid.Column>
                    <button type="button" className="ui teal button" onClick={this.onClickAdd} >Add</button>
                    <button type="button" className="ui button" onClick={this.closeAdd}>Cancel</button>  
                    </Grid.Column>
                </Grid>
                <Grid>
                {this.renderDisplay()}
                </Grid>
                </div>
            </div>
        )   
    }
    renderDisplay()
    {
        return(
            <div className='row'>
            <div className="ui sixteen wide column">
                <Table celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Company</Table.HeaderCell>
                        <Table.HeaderCell>Position</Table.HeaderCell>
                        <Table.HeaderCell>Responsibility</Table.HeaderCell>
                        <Table.HeaderCell>Start</Table.HeaderCell>
                        <Table.HeaderCell>End</Table.HeaderCell>
                        <Table.HeaderCell>
                            <button type="button" className="ui right floated teal button" id='' onClick={this.openAdd}>
                                <Icon name="plus square outline"></Icon>Add New</button>
                        </Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.props.experienceData.map((l) =>
                    this.state.edit && this.state.editId === l.id ?
                    <Table.Row key={l.id}>
                        <Table.Cell colSpan='6'>{this.renderEdit()}</Table.Cell>
                    </Table.Row>
                    :<Table.Row key={l.id}>
                        <Table.Cell>{l.company}</Table.Cell>
                        <Table.Cell>{l.position}</Table.Cell>
                        <Table.Cell width={5}>{l.responsibilities}</Table.Cell>
                        <Table.Cell>{moment(l.start).format('YYYY-MM-DD')}</Table.Cell>
                        <Table.Cell>{moment(l.end).format('YYYY-MM-DD')}</Table.Cell>
                        <Table.Cell textAlign='right'>
                            <Icon name='pencil alternate' id={l.id} onClick={this.openEdit}></Icon>
                            <Icon name='cancel' id={l.id} onClick={this.OnDeleteClick}></Icon>
                        </Table.Cell>
                    </Table.Row>
                     )}
                    </Table.Body>
                </Table>
            </div>
            </div>
        )
    }
    renderEdit()
    {
        return(
            <div className='row'>
                <div className="ui sixteen wide column"> 
                <Grid columns='equal'>
                    <Grid.Column>
                        <label style={{fontWeight: "bold", fontSize:"small" , paddingBottom:"10px" }}>Company:</label><br/>
                        <Input
                        placeholder='Company' 
                        name='company'
                        defaultValue={this.state.newExperienceData.company}
                        onChange={this.handleChange}
                    />
                    </Grid.Column>
                    <Grid.Column>
                        <label style={{fontWeight: "bold", fontSize:"small" , paddingBottom:"10px" }}>Position:</label><br/>
                        <Input
                        placeholder='Position' 
                        name='position'
                        defaultValue={this.state.newExperienceData.position}
                        onChange={this.handleChange}
                    />
                    </Grid.Column>
                </Grid>
                <Grid columns='equal'>
                    <Grid.Column>
                    <label style={{fontWeight: "bold", fontSize:"small" , paddingBottom:"10px" }}>Start Date:</label>
                                <input
                                    type='date'
                                    name="start"
                                    placeholder="Date"
                                    content={this.state.newExperienceData.start}
                                    //iconPosition="left"
                                    onChange={this.onChangeStartDate}
                                />
                   
                    </Grid.Column>
                    <Grid.Column width={8}>
                    <label style={{fontWeight: "bold", fontSize:"small" , paddingBottom:"10px" }}>End Date:</label>
                                <input
                                    type='date'
                                    name="end"
                                    placeholder="Date"
                                    content={this.state.newExperienceData.start}
                                    //iconPosition="left"
                                    onChange={this.onChangeEndDate}
                                />
                    </Grid.Column>
                </Grid>
                <Grid>
                <Grid.Column>
                <label style={{fontWeight: "bold", fontSize:"small" , paddingBottom:"10px" }}>Responsibilities</label>
                <Input fluid 
                    placeholder='Responsibilities' 
                    name='responsibilities'
                    defaultValue={this.state.newExperienceData.responsibilities} 
                    onChange={this.handleChange}
                />
                </Grid.Column>
                </Grid>
                <Grid>
                    <Grid.Column>
                    <button type="button" className="ui teal button" id={this.state.newExperienceData.id} onClick={this.onUpdateClick} >Update</button>
                    <button type="button" className="ui button" onClick={this.closeAdd}>Cancel</button>  
                    </Grid.Column>
                </Grid>
                </div>
                <div></div>
            </div>
        )   
    }
}