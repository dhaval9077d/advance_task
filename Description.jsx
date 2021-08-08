import React from 'react';
import Cookies from 'js-cookie';
import { Input } from 'semantic-ui-react';

export class Description extends React.Component {

    constructor(props) {
        super(props);
        const Description = props.details ?
            Object.assign({}, props.details)
            : {
                description: "",
                summary: ""
            }
        this.state = {
            newDescription:Description,
            characters: 0
        };
        this.handleChange=this.handleChange.bind(this);
        this.changeDescription=this.changeDescription.bind(this)
    }
    changeDescription()
    {
        const data = Object.assign({}, this.state.newDescription)
        this.props.saveProfileData(data)
    }
    handleChange(event) {
        const data = Object.assign({}, this.state.newDescription)
        data[event.target.name] = event.target.value
        this.setState({
            newDescription: data
        })
    }
    render() {
        const characterLimit = 600,summaryLength=150;
        let characters = this.props.description ? this.props.description.length : 0;
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                <div className="five wide column">
                <div className="field" >
                    <Input
                    maxLength={summaryLength}
                    name="summary" 
                    fluid icon='search' 
                    placeholder='Please provide a short summary about your self' 
                    defaultValue={this.props.details.summary}
                    onChange={this.handleChange} />
                    </div>
                    <p>Summary must be no more than 150 Characters.</p>   
                    <p></p> 
                </div>
                <div className="ten wide column">
                    <div className="field" >
                        <textarea maxLength={characterLimit} 
                        name="description"
                        placeholder={"Please tell us about any hobbies, additional expertise, or anything else you’d like to add." }
                        onChange={this.handleChange}
                        //value={this.props.details.description}
                        //defaultValue={this.props.details.description} 
                         > 
                        </textarea>
                    </div>
                    <p>Description must be between  150-600 Characters.</p>
                </div>
                <button type="button" className="ui right floated teal button" onClick={this.changeDescription}>Save</button>
            </div>
            </div>
        )
    }
}
