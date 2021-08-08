import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Button, Icon ,Card,Image, Container,Item,Grid, Header} from 'semantic-ui-react'

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state=
        {
            video:false,
            EmployerDetail:[],
        }
       this.onClickVideo=this.onClickVideo.bind(this)
       this.onClickProfile=this.onClickProfile.bind(this)
    };
    onClickVideo()
    {
        this.setState(
            {
                video:true
            }
        )
    }
    onClickProfile()
    {
        this.setState(
            {
                video:false
            }
        )
    }
    render()
    {
        return(
            this.state.video ? this.renderVideo() : this.renderCard()
        )
    }
    renderCard() {
        const src='https://semantic-ui.com/images/avatar2/large/kristy.png'
       return(
           <div>
               {this.props.talentDetail.map((talent) => (
             <Card fluid key={talent.id}>
                <Card.Content>
                <Card.Header><Container textAlign='right'><Icon name='star'/></Container>{talent.name}</Card.Header>
                </Card.Content>
                <Card.Content>
                <Item>
                <Image src={src} size='small' floated='left' />
                    <Item.Content>
                        <Item.Description>
                            <Header sub>{talent.name}</Header>
                            <Header as='h5' sub>
                            Current Employer
                                <Header.Subheader>
                                {talent.currentEmployment}
                                </Header.Subheader>
                            </Header>
                            <Header as='h5' sub>
                            Visa Status
                                <Header.Subheader>
                                {talent.visa}
                                </Header.Subheader>
                            </Header>
                            <Header as='h5' sub>
                            Position
                                <Header.Subheader>
                                {talent.level}
                                </Header.Subheader>
                            </Header>
                        </Item.Description>
                    </Item.Content>
                </Item>
                </Card.Content>
                <Card.Content extra>
                    <Header>
                    <Grid>
                    <Grid.Row columns={4}>
                        <Grid.Column>
                        <Icon name='video' size='large' onClick={this.onClickVideo} />
                        </Grid.Column>
                        <Grid.Column>
                        <Icon name='file pdf outline' size='large' />
                        </Grid.Column>
                        <Grid.Column>
                        <Icon name='linkedin' size='large' />
                        </Grid.Column>
                        <Grid.Column>
                        <Icon name='github' size='large' />
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                    </Header>
                </Card.Content>
                <Card.Content extra>
                <Button basic color='blue' content='C#' />
                </Card.Content>
            </Card> 
             ))}
           </div>
       )
    }
    renderVideo()
    {
        return(
            <div>
                <Card fluid>
                <Card.Content>
                <Card.Header><Container textAlign='right'><Icon name='star'/></Container></Card.Header>
                </Card.Content>
                <Card.Content>
                <Card.Content>
                    <ReactPlayer  width='520px' url='https://www.youtube.com/watch?v=ysz5S6PUM-U'/>
                </Card.Content>
                </Card.Content>
                <Card.Content extra>
                    <Header>
                    <Grid>
                    <Grid.Row columns={4}>
                        <Grid.Column>
                        <Icon name='user' size='large' onClick={this.onClickProfile} />
                        </Grid.Column>
                        <Grid.Column>
                        <Icon name='file pdf outline' size='large' />
                        </Grid.Column>
                        <Grid.Column>
                        <Icon name='linkedin' size='large' />
                        </Grid.Column>
                        <Grid.Column>
                        <Icon name='github' size='large' />
                        </Grid.Column>
                    </Grid.Row>
                    </Grid>
                    </Header>
                </Card.Content>
                <Card.Content extra>
                <Button basic color='blue' content='C#' />
                </Card.Content>
            </Card> 
            </div>
        )
    }
}

