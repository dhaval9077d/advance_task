/* Social media JSX */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Button,Icon,Popup,Grid } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);
        const LinkedAccounts = props.linkedAccounts ?
            Object.assign({}, props.linkedAccounts)
            : {
                linkedIn: "",
                github: ""
            }
        this.state = {
            showEditSection: false,
            newLinkedAccount: LinkedAccounts
        }
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.changeSocialMediaLink=this.changeSocialMediaLink.bind(this)
    }
    componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }
    openEdit() {
        const details = Object.assign({}, this.props.linkedAccounts)
        this.setState({
            showEditSection: true,
            newLinkedAccount: details
        })
    }
    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }  
    handleChange(event) {
        const data = Object.assign({}, this.state.newLinkedAccount)
        data[event.target.name] = event.target.value
        this.setState({
            newLinkedAccount: data
        })
    }
    changeSocialMediaLink()
    {
        const data = Object.assign({}, this.state.newLinkedAccount)
        this.props.saveProfileData({linkedAccounts : { linkedIn: data.linkedIn, github: data.github}})
        this.closeEdit()
    }
    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
    renderEdit()
    {
        return(
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="LinkedIn"
                    name="linkedIn"
                    value={this.state.newLinkedAccount.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your LinkedIn Url"
                    errorMessage="Please enter a valid LinkedIn Url"
                />
                <ChildSingleInput
                    inputType="text"
                    label="GitHub"
                    name="github"
                    value={this.state.newLinkedAccount.github}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your GitHub Url"
                    errorMessage="Please enter a valid GitHub Url"
                />
            <button type="button" className="ui teal button" onClick={this.changeSocialMediaLink} >Save</button>
            <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>    
            </div>
        )
    }
    renderDisplay()
    {
        return(
            <div className='row'>
                <div className="ui sixteen wide column">
                <Button color='linkedin' >
                <Icon name='linkedin' /> LinkedIn
                </Button>    
                <Button color='black'>
                <Icon name='github' /> GitHub
                </Button>
                <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
            </div>
        </div>
        )
    }
}