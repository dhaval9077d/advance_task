import React from 'react'
import { Form, Radio } from 'semantic-ui-react';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);
        
        this.state={
            value:''
        }
        this.handleChange=this.handleChange.bind(this)
    }
    handleChange(event,data) 
    { 
        this.setState(
            { 
                value : data.value 
            })
        this.props.saveProfileData({jobSeekingStatus:{status : data.value,AvailableDate:null}})
    }
    render() { 
      const selctedvalue =this.props.status.status ?this.props.status.status:this.state.value
        return(
            <div className='row'>
            <div className="ui sixteen wide column">         
        <Form.Field>
          Current Status: <b>{this.state.value}</b>
        </Form.Field>
        <Form.Field>
          <Radio
            label='Actively looking for a job'
            name='radioGroup'
            value='Actively looking for a job'
            checked={selctedvalue === 'Actively looking for a job'}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='Not looking for a job at the moment'
            name='radioGroup'
            value='Not looking for a job at the moment'
            checked={selctedvalue === 'Not looking for a job at the moment'}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='Currently employed but open for offers'
            name='radioGroup'
            value='Currently employed but open for offers'
            checked={selctedvalue === 'Currently employed but open for offers'}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='Will be available for later date'
            name='radioGroup'
            value='Will be available for later date'
            checked={selctedvalue === 'Will be available for later date'}
            onChange={this.handleChange}
          />
        </Form.Field>
            </div>
            </div>
        )
    }
}