import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoggedinPage } from '../loggedin/loggedin';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  //binding the varliable from the front End
	@ViewChild('userName') uname;
	@ViewChild('password') pass;

  constructor(private alertCtrl:AlertController ,private fire:AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  // to show alert message on success of registerUser()
  alert(message:string){
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  // authenticate user and add user in fireBase 
  registerUser() {
  	this.fire.auth.createUserWithEmailAndPassword(this.uname.value, this.pass.value)
  	.then (data =>{
      console.log('data',this.fire.auth.currentUser);
      this.alert('Registered');
      this.navCtrl.setRoot( LoggedinPage);
  	})
  	.catch(err => {
  		console.log("error",err);
      this.alert(err.message);
  	});
  }
}
