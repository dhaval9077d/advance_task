/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { Grid , Icon, Input,Table,Button} from 'semantic-ui-react';

export default class Language extends React.Component {
    constructor(props) {
        super(props);
        const language=props.languageData ?
        props.languageData :
        { 
            id:'',
            name:'',
            level:''
        }
        this.state = {
            showEditSection: false,
            newLanguage:language,
            edit:false,
            editId:''
        }
        this.openAdd = this.openAdd.bind(this)
        this.closeAdd = this.closeAdd.bind(this)
        this.onSaveLanguage=this.onSaveLanguage.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.openEdit=this.openEdit.bind(this)
        this.onUpdateClick=this.onUpdateClick.bind(this)
        this.OnDeleteClick=this.OnDeleteClick.bind(this)
        this.onUpdateName=this.onUpdateName.bind(this)
        this.onUpdateLevel=this.onUpdateLevel.bind(this)
    }
    openAdd() 
    {
        this.setState({
            showEditSection: true
        })
    }
    closeAdd() {
        this.setState({
            showEditSection: false,
            edit:false
        })
        this.props.loadData();
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
    handleChange(event) {
        const data = Object.assign({}, this.state.newLanguage)
        data[event.target.name] = event.target.value ? event.target.value : event.target.defaultValue;
        this.setState({
            newLanguage:data
        })
    }  
    onUpdateName(event)
    {
        const newLanguage=this.state.newLanguage
        newLanguage.name=event.target.value ? event.target.value : event.target.defaultValue
        this.setState(
            {
                newLanguage
            }
        )
        console.log(this.state.newLanguage)
    }
    onUpdateLevel(event)
    {
        const newLanguage=this.state.newLanguage
        newLanguage.level=event.target.value ? event.target.value : event.target.defaultValue
        this.setState(
            {
                newLanguage
            }
        )
        console.log(this.state.newLanguage)
    }
    OnDeleteClick(event)
    {
        console.log(this.state.newLanguage)
        let newLanguage=this.state.newLanguage;
        newLanguage.id=event.target.id;
        this.setState
        {
            newLanguage
        }
        console.log(this.state.newLanguage);
       const data = Object.assign({}, this.state.newLanguage)
       console.log(data);
       var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://advancetaskprofile.azurewebsites.net/profile/profile/DeleteLanguage',
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
    }
    onUpdateClick(event)
    {
        let newLanguage=this.state.newLanguage;
        newLanguage.id=event.target.id;
        this.setState
        {
            newLanguage
        }
        console.log(this.state.newLanguage);
        const data = Object.assign({}, this.state.newLanguage)
        console.log(data);
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://advancetaskprofile.azurewebsites.net/profile/profile/UpdateLanguage',
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
    onSaveLanguage()
    {
        console.log(this.state.newLanguage)
       var cookies = Cookies.get('talentAuthToken');
       $.ajax({
           url: 'http://advancetaskprofile.azurewebsites.net/profile/profile/AddLanguage',
           headers: {
               'Authorization': 'Bearer ' + cookies,
               'Content-Type': 'application/json'
           },
           type: "POST",
           data: JSON.stringify(this.state.newLanguage),
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
    render()
    {
        return (
            this.state.showEditSection ? this.renderAdd() : this.renderDisplay()
        )
    }
    renderAdd() {
        console.log(this.state.newLanguage);
        return(
            <div className='row'>
                <div className="ui sixteen wide column">
                <Grid columns='equal'>
                    <Grid.Column>
                    <Input placeholder='Add Language' name='name' onChange={this.handleChange} />
                    </Grid.Column>
                    <Grid.Column>
                        <select name='level' defaultValue='Basic' onFocus={this.handleChange} onChange={this.handleChange}>
                            <option value="Basic">Basic</option>
                            <option value="Conversational">Conversational</option>
                            <option value="Fluent">Fluent</option>
                            <option value="Native/Bilingual">Native/Bilingual</option>
                        </select>
                    </Grid.Column>
                    <Grid.Column>
                    <button type="button" id='' className="ui teal button" onClick={this.onSaveLanguage} >Save</button>
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
        const languages=this.props.language
        return(
            <div className='row'>
            <div className="ui sixteen wide column">
                <Table celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Language</Table.HeaderCell>
                        <Table.HeaderCell>Level</Table.HeaderCell>
                        <Table.HeaderCell><button type="button" id="save" className="ui right floated teal button" onClick={this.openAdd}><Icon name="plus square outline"></Icon>Add New</button></Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {this.props.languageData.map((l) =>
                    this.state.edit && this.state.editId == l.id ?
                    <Table.Row key={l.id}>
                    <Table.Cell><Input placeholder='Add Language' defaultValue={l.name} name='name' onFocus={this.onUpdateName} onChange={this.onUpdateName} /></Table.Cell>
                    <Table.Cell>
                        <select name='level' defaultValue={l.level} onFocus={this.onUpdateLevel} onChange={this.onUpdateLevel}>
                            <option value="Basic">Basic</option>
                            <option value="Conversational">Conversational</option>
                            <option value="Fluent">Fluent</option>
                            <option value="Native/Bilingual">Native/Bilingual</option>
                        </select>
                    </Table.Cell>
                    <Table.Cell textAlign='right'>
                        <Button basic color='blue' type='button' id={l.id} onClick={this.onUpdateClick} >Update</Button>
                        <Button basic color='red' onClick={this.closeAdd}>Cancel</Button>
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