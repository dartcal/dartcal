/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import logo from '../pictures/calendar.png';
import noUserPic from '../pictures/noUser.png'
import blankPic from '../pictures/nofriend.png'
import { NavLink, withRouter } from 'react-router-dom';
import * as db from './datastore';
import '../cssfolder/profile.css';
import noFriends from '../pictures/nofriend.png';



class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: 'no user ID',
      userEmail: 'no email',
      userFirstName: ' first ',
      userLastName: ' last ',
      userFullName: 'username',
      userYear: 'no year',
      friendsIDs: [],
      friendsPics: [],
      friendsNames: [],
      friendsNamesOfficial: [],
      bio: '',
      image: noUserPic,
      classes: '',
      classList: [],
      clubList: [],
      editing: false,
    };  
    }

    setFriendsNamesAndPics = (Friends) => {

      this.state.friendsIDs = Friends;
  
      for (let i = 0; i < Object.keys(Friends).length; i += 1) {
        const currentKey = Object.keys(Friends)[i];
        const currItem = Friends[currentKey];
       db.getUser(currItem, this.setFriendInfo);
       //console.log(this.state.friendsNames);

      
      }
    }
    setFriendInfo = (user) => {
      this.state.friendsPics.push(user.userPic);
      this.state.friendsNames.push(`${user.userFirstName} ${user.userLastName}`);

      this.setState({

      })

    }

    setClassInfo = (classes) => {

      for (let i = 0; i < Object.keys(classes).length; i += 1) {
        const currentKey = Object.keys(classes)[i];
        const currItem = classes[currentKey];
  
        this.state.classList.push(` ${currItem} (${currentKey})`);
    
      }

    }

    setClubsInfo = (clubs) => {

      for (let i = 0; i < Object.keys(clubs).length; i += 1) {
        const currentKey = Object.keys(clubs)[i];
        const currItem = clubs[currentKey];
  
        this.state.clubList.push(currItem);
    
      }

    }
    componentDidMount() {
        db.getCurrUser(this.setCurrUser);
    }
  
  setCurrUser = (currUser) => {
    

     this.setState({
        userID: currUser.userID,
        userEmail: currUser.userEmail,
        userFirstName: currUser.userFirstName,
        userLastName: currUser.userLastName,
        userYear: currUser.userYear,
        image: currUser.userPic,
      });

      //IDK why this is here but it works now bc of syncronizatin issues
      db.getFriends(this.state.userID, this.setFriendsNamesAndPics);
      db.getClass(this.state.userID, this.setClassInfo);
      db.getClubs(this.state.userID, this.setClubsInfo);

     
  }
  
 
  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange= (event) => {
    this.setState({ password: event.target.value });
  }

  onPasswordTwoChange= (event) => {
    this.setState({ passwordTwo: event.target.value });
  }

  onFirstUsernameChange= (event) => {
    this.setState({ firstusername: event.target.value });
  }

  onLastUsernameChange= (event) => {
    this.setState({ lastusername: event.target.value });
  }

  handleCancelButtonClick = (event) => {
    this.props.history.push('/');
  }

 
  render() {

    const renderClubs = () => {
      console.log("visit");
    
      if (this.state.showClubs == 0){
        return(
          <div>
            <p>
              hi
            </p>
          </div>

        )
      }
      return <p> hi</p>
    
      // return (
      //   <div> 
      //     <ul>
      //     <li>{this.state.clubList[0]}</li>
      //     <li>{this.state.clubList[1]}</li>
          
      //     <li>
      //       <Input className="response" id="emailInputBar" placeholder="ex. Tri team" onChange={this.onEmailChange} value={this.state.email} />
      //     </li>
      //     </ul>
      //    </div>
      // );
    }

    return (
      <div className="all">
        <div className="dartCalLogoProfile">
          DartCal
          <div className="scheduleLogo"><img width="80px" src={logo}/></div>
        </div>
        <div className="profileinfo">
          <div>
            <h3 className="sectionHeader">Profile</h3>
            <div className="imgStyle">
              <img class="a" src={this.state.image} width="150" height="150"/>
            </div>
          </div>
          <div className="nameContainer">
            <h6>Name</h6>
            <h6>Email</h6>
            <h6>Password</h6>
            <h6>Year</h6>
          </div>
          <div className="inputContainer">
            <div className="indivInput">
              <h6>{`${this.state.userFirstName} ${this.state.userLastName}`}</h6>
            </div>
            <div className="indivInput">
              <h6>{this.state.userEmail}</h6>
            </div>
            <div className="indivInput">
              <h6>***********</h6>
            </div>
            <div className="indivInput">
              <h6>{this.state.userYear}</h6>
            </div>
          </div>
        </div>

        <div className="classinfo">
          <div>
            <h3 className="sectionHeader">Classes</h3>
          </div>
          <div className="listStyle">
            <ul>
              <li>{this.state.classList[0]}</li>
              <li>{this.state.classList[1]}</li>
              <li>{this.state.classList[2]}</li>
              <li>
                <Input className="response" id="emailInputBar" placeholder="ex. ENGL37" onChange={this.onEmailChange} value={this.state.email} />
                <div class="dropdown">
                  <button class="dropbtn">Class Block</button>
                  <div class="dropdown-content">
                    <a href="#">8</a>
                    <a href="#">9S</a>
                    <a href="#">9L</a>
                    <a href="#">10</a>
                    <a href="#">11</a>
                    <a href="#">12</a>
                    <a href="#">2</a>
                    <a href="#">3A</a>
                    <a href="#">6A</a>
                    <a href="#">10A</a>
                    <a href="#">2A</a>
                    <a href="#">3B</a>
                    <a href="#">6B</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="clubinfo">
          <div>
            <h3 className="sectionHeader">Clubs</h3>
          </div>
          <div className="listStyle">

          <renderClubs>HELLO </renderClubs> 
                   
          </div>
        </div>

        <div className="friendsinfo">
          <div>
            <h3 className="sectionHeader">Friends</h3>
          </div>
          <div class="grid-container">
            <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src={this.state.friendsPics[0]} width="55%" height="55%"/>
                <p>{this.state.friendsNames[0]}</p>
              </div>
            </div>
              <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src={this.state.friendsPics[1]} width="55%" height="55%"/>
                <p>{this.state.friendsNames[1]}</p>
              </div>
            </div>
            <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src={this.state.friendsPics[2]} width="55%" height="55%"/>
                <p>{this.state.friendsNames[2]}</p>
              </div>
            </div>  
            <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src={this.state.friendsPics[3]} width="55%" height="55%"/>
                <p>{this.state.friendsNames[3]}</p>
              </div>
            </div>
            <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src={this.state.friendsPics[4]} width="55%" height="55%"/>
                <p>{this.state.friendsNames[4]}</p>
              </div>
            </div>
            <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src={this.state.friendsPics[5]} width="55%" height="55%"/>
                <p>{this.state.friendsNames[5]}</p>
              </div></div>   
          </div>
        </div>
      </div>
    );
  }
}



// export default NewPost;
export default withRouter((Profile));