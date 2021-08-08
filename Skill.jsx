/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { Grid , Icon, Input,Table,Button} from 'semantic-ui-react';

export default class Skill extends React.Component {
    constructor(props) {
        super(props);
        const skillData=props.skillData ?
        props.skillData
        :{
            id:'',
            name:'',
            level:''
        }
        this.state = {
            newSkill:skillData,
            showEditSection: false,
            edit:false,
            editId:''
        }
        this.openAdd = this.openAdd.bind(this)
        this.closeAdd = this.closeAdd.bind(this)
        this.openEdit=this.openEdit.bind(this)
        this.onUpdateSkill=this.onUpdateSkill.bind(this)
        this.onUpdateLevel=this.onUpdateLevel.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.onUpdateClick=this.onUpdateClick.bind(this)
        this.OnDeleteClick=this.OnDeleteClick.bind(this)
        this.OnClickSave=this.OnClickSave.bind(this)
    }
    handleChange(event) {
        const data = Object.assign({}, this.state.newSkill)
        data[event.target.name] = event.target.value ? event.target.value : event.target.defaultValue
        this.setState({
            newSkill: data
        })
        console.log(this.state.newSkill)
    } 
    openAdd() {
        //const details = Object.assign({}, this.props.details)
        this.setState({
            showEditSection: true
            //newContact: details
        })
    }
    closeAdd() {
        this.setState({
            showEditSection: false,
            edit:false
        })
    }  
    openEdit(event)
    {
        this.setState(
            {
                edit:true,
                editId:event.target.id
            }
        )
    } 
    onUpdateSkill(event)
    {
        const newSkill=this.state.newSkill
        newSkill.name=event.target.value ? event.target.value : event.target.defaultValue
        this.setState(
            {
                newSkill
            }
        )
        console.log(this.state.newSkill)
    }
    onUpdateLevel(event)
    {
        const newSkill=this.state.newSkill
        newSkill.level=event.target.value ? event.target.value : event.target.defaultValue
        this.setState(
            {
                newSkill
            }
        )
        console.log(this.state.newSkill)
    }
    OnClickSave()
    {
        console.log("save"+ this.state.newSkill);
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://advancetaskprofile.azurewebsites.net/profile/profile/AddSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.newSkill),
            success: function (res) {
                console.log(res)
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
        console.log(this.state.newSkill)
        let newSkill=this.state.newSkill;
        newSkill.id=event.target.id;
        this.setState
        {
            newSkill
        }
        console.log(this.state.newSkill);
       const data = Object.assign({}, this.state.newSkill)
       console.log(data);
       var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://advancetaskprofile.azurewebsites.net/profile/profile/deleteSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(data),
            success: function (res) {
                console.log(res)
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
        let newSkill=this.state.newSkill;
        newSkill.id=event.target.id;
        this.setState
        {
            newSkill
        }
        console.log(this.state.newSkill);
        const data = Object.assign({}, this.state.newSkill)
        console.log(data);
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://advancetaskprofile.azurewebsites.net/profile/profile/updateSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(data),
            success: function (res) {
                console.log(res)
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
                    <Input placeholder='Skill' name='name' onChange={this.handleChange} />
                    </Grid.Column>
                    <Grid.Column>
                        <select name='level' defaultValue='Beginner' onFocus={this.handleChange} onChange={this.handleChange}>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </Grid.Column>
                    <Grid.Column>
                    <button type="button" className="ui teal button" onClick={this.OnClickSave} >Save</button>
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
                        <Table.HeaderCell>Skill</Table.HeaderCell>
                        <Table.HeaderCell>Level</Table.HeaderCell>
                        <Table.HeaderCell><button type="button" className="ui right floated teal button" onClick={this.openAdd}><Icon name="plus square outline"></Icon>Add New</button></Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {this.props.skillData.map((l) =>
                    this.state.edit && this.state.editId == l.id ?
                    <Table.Row key={l.id}>
                    <Table.Cell><Input placeholder='Add Language' focus={true} defaultValue={l.name} name='name' onFocus={this.onUpdateSkill} onChange={this.onUpdateSkill} /></Table.Cell>
                    <Table.Cell>
                        <select name='level' defaultValue={l.level} onFocus={this.onUpdateLevel} onChange={this.onUpdateLevel}>
                            <option value="Basic">Basic</option>
                            <option value="Conversational">Conversational</option>
                            <option value="Fluent">Fluent</option>
                            <option value="Native/Bilingual">Native/Bilingual</option>
                        </select>
                    </Table.Cell>
                    <Table.Cell textAlign='right'>
                        <Button basic color='blue' type='button' id={l.id} onClick={this.onUpdateClick}>Update</Button>
                        <Button basic color='red' type='button' onClick={this.closeAdd} >Cancel</Button>
                    </Table.Cell>
                    </Table.Row>
                    :<Table.Row key={l.id}>
                        <Table.Cell>{l.name}</Table.Cell>
                        <Table.Cell>{l.level}</Table.Cell>
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
}