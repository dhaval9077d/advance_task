import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from '../TalentFeed/TalentCard.jsx';
import { Loader,Header, Grid } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';

export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            loadNumber: 5,
            loadPosition: 0,
            feedData: [],
            watchlist: [],
            loaderData: loader,
            loadingFeedData: false,
            companyDetails:
            {
                companyContact:{
                    name:'',
                    phone:'',
                    email:'',
                    firstName:'',
                    lastName:'',
                    location:[]
                },
                primaryContact:[]
            },
            talent:[]
        }
        this.init = this.init.bind(this);
        this.loadEmployerData=this.loadEmployerData.bind(this)
        this.loadTalentData=this.loadTalentData.bind(this)

    };
    init() {
        let loaderData = this.state.loaderData;
        loaderData.isLoading = false;
        this.setState({ loaderData, })
       /* console.log("Init")
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });*/

    }
    componentDidMount() {
        this.loadTalentData();
        this.loadEmployerData();
    }
    
    loadEmployerData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://advancetaskprofile.azurewebsites.net/profile/profile/getEmployerProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            data:{
                number: 5,
                position: 0
            },
            contentType: "application/json",
            dataType: "json",
            //async:true,
            success: function (res) {
                let employerData = null;
                if (res.employer) {
                    employerData = res.employer.companyContact
                    console.log(employerData)
                    this.setState(
                        {
                            companyDetails:employerData
                        }
                    )
                }
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
        this.init();
    } 
    loadTalentData()
    {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://advancetaskprofile.azurewebsites.net/profile/profile/getTalent',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            async:false,
            success: function (res) {
                this.setState(
                    {
                        talent:res.data
                    }
                )
            //  console.log(res.data)
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })
        this.init()
    }
    render() {
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                 <div className="ui grid talent-feed container">
                    <div className="four wide column">
                        <CompanyProfile companyDetails={this.state.companyDetails}/>
                    </div>
                    <div className="eight wide column">
                        <TalentCard talentDetail={this.state.talent}/>
                    </div>
                    <div className="four wide column">
                        <div className="ui card">
                            <FollowingSuggestion />
                        </div>
                    </div>
                </div>
            </BodyWrapper>
        )
    }
}