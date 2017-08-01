import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoggedinPage } from '../loggedin/loggedin';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //binding the varliable from the front End
	@ViewChild('userName') uname;
	@ViewChild('password') pass;
  constructor(private alertCtrl:AlertController ,private fire:AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  // to show alert message on success of loginUser()
  alert(message:string){
  	this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }
  // authenticate user through firebase
  loginUser(){
  	this.fire.auth.signInWithEmailAndPassword(this.uname.value, this.pass.value)
  	.then (data =>{
  		console.log('data',this.fire.auth.currentUser);
  		this.alert('Success you\'re logged in');
  		this.navCtrl.setRoot( LoggedinPage);  		
  	})
  	.catch(err => {
  		console.log("error",err);
  		this.alert(err.message);
  	});
  }

}
