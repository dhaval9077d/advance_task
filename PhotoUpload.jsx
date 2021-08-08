/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Grid, Image ,Header, Icon, Input, Container} from 'semantic-ui-react';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);
        this.state=
        {
            imageFile:'',
            imageSrc:'',
            profileImage:'https://www.kindpng.com/picc/m/109-1095065_camera-cam-device-photo-shot-mode-mobile-phone.png',
            uploading: false,
            profile:false,
            file:null
        }
       this.imageHandler=this.imageHandler.bind(this)
       this.OnClickUpload=this.OnClickUpload.bind(this)
       this.onClickProfile=this.onClickProfile.bind(this)
       
    }
    imageHandler(e)
    {
      const reader = new FileReader();
      reader.onload = () =>
      {
        if(reader.readyState === 2)
        {
          this.setState(
            {
              profileImage:reader.result,
              uploading:true
            } 
          )
        }
      }
      reader.readAsDataURL(e.target.files[0])
      this.setState(
        {
          file:e.target.files[0]
        }
      )
    }
    OnClickUpload()
    {
      const formData = new FormData();
		  formData.append('talentPhoto', this.state.file);
      console.log(this.state.file)
      var cookies = Cookies.get('talentAuthToken');
      console.log("uploadPhoto",formData.entries().next().value);
      
      $.ajax({
        url: this.props.savePhotoUrl,
        headers: {
          Authorization: "Bearer " + cookies, 
        },
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
          if (res.success === true) {
            this.setState({ 
              uploading: true, 
            });
          }
          else{
            console.log("error")
          }
        }
        });
        this.props.loadData()
    }
    onClickProfile()
    {
      this.setState(
        {
          profile:true
        }
      )
      console.log(this.state.uploading) 
    }
    render() {
        return(
        this.props.profilePhoto.profilePhotoUrl ? this.renderDisplayProfile() : this.renderDisplay()
        )
    }
    renderDisplay()
    {
      const image = this.props.profilePhoto.profilePhotoUrl ? this.props.profilePhoto.profilePhotoUrl : 'https://www.kindpng.com/picc/m/109-1095065_camera-cam-device-photo-shot-mode-mobile-phone.png'
      return(
        this.state.uploading?
        this.renderUpload()
        :<div className='row'>
                <div className="ui sixteen wide column">
                    <Grid>
                        <Grid.Column width={6}>
                        <Header as='h2'>Profile Photo</Header>
                        </Grid.Column>
                        <Grid.Column width={8}>
                        <div 
                            onClick={() => {
                            this.renderUpload();
                            }}
                        >
                        <Image
                          size='small'
                          src={image}
                          circular>
                        </Image> 
                        </div>
                        <input
                            id='myInput'
                            type='file'
                            name='file'
                            ref={(ref) => (this.upload = ref)}
                            style={{ display: "none" }}  
                            onChange={this.imageHandler}                  
                            //onChange={this.showPreview()}
                        />
                        <input icon='photo' type='file' onChangeCapture={this.imageHandler}/>   
                        </Grid.Column>
                    </Grid>
            </div>
            </div>
      )
    }
    renderUpload()
    {
      const{profileImage}=this.state
      return(
        <div className='row'>
                <div className="ui sixteen wide column">
                    <Grid>
                        <Grid.Column width={6}>
                        <Header as='h2'>Profile Photo</Header>
                        </Grid.Column>
                        <Grid.Column width={5} textAlign='center'>
                            <Image src={profileImage}  size='small' circular >
                            </Image>
                            <Container textAlign='center'> 
                            <br/>
                            <button type="button" className="ui teal button" onClick={this.OnClickUpload} ><Icon name='upload'></Icon>Upload</button>
                            </Container>
                        </Grid.Column>
                    </Grid>
            </div>
            </div>
      )
    }
    renderDisplayProfile()
    {
      return(
        this.state.profile?
        this.renderDisplay()
        :<div className='row'>
            <div className="ui sixteen wide column">
           <Grid>
              <Grid.Column width={8}>
                  <Header as='h2'>Profile Photo</Header>
              </Grid.Column>
              <Grid.Column width={8}>
              <div 
                 onClick={() => {
                 this.onClickProfile();
                 }}
              >
                <Image
                    size='small'
                    src={this.props.profilePhoto.profilePhotoUrl}
                    circular
                  ></Image>
                  </div>
              </Grid.Column>
          </Grid>
          </div>
        </div>
      )
    }
    
}
