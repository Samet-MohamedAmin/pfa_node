const passport = require('passport');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const Partner = require('../models/partner');
const Personal = require('../models/personal');

const initialisePerson =require ('../utils/util_functions').initialisePerson

module.exports.register = (req, res) => {
  if(!req.body.email || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

switch (req.body.type){
case'student': {

   let student =new Student();
   initialisePerson(student,req.body.firstName,req.body.lastName,req.body.email,req.body.birthday,req.body.cin)
   student.numinscription=req.body.numinscription
   student.yearOfStudy=req.body.yearOfStudy
   student.branch=req.body.branch
   student.requestedPath=req.body.requestedPath
   student.setPassword(req.body.password)

    student.save((err,stud) => {
        let token;
        token = student.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });
      });
  }
  break;
case 'teacher' :{
    let teacher =new Teacher();
    initialisePerson(teacher,req.body.firstName,req.body.lastName,req.body.email,req.body.birthday,req.body.cin)
    teacher.department=req.body.department,
    teacher.speciality=req.body.speciality,
    
    teacher.setPassword(req.body.password);

    teacher.save((err,teach) => {
        let token;
        token = teacher.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });
      });
  }
  break;

case 'partner' :{
    let partner =new Partner();
    initialisePerson(partner,req.body.firstName,req.body.lastName,req.body.email,req.body.birthday,req.body.cin)

    partner.company=req.body.company,
    partner.speciality=req.body.speciality
  
    partner.setPassword(req.body.password);

    partner.save((err,partn) => {
        let token;
        token = partner.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });
      });
  }
  break;
case 'personal' :{
    let personal =new Personal();
    initialisePerson(personal,req.body.firstName,req.body.lastName,req.body.email,req.body.birthday,req.body.cin)
    personal.setPassword(req.body.password);

    personal.save((err,pers) => {
        let token;
        token = personal.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });
      });
  }
  break;
  }

};

module.exports.login = (req, res) => {

switch (req.body.type){
    case 'student' :{
        passport.authenticate('student', (err, user, info) => {
            let token;
            // If Passport throws/catches an error
            if (err) {
              res.status(404).json(err);
              return;
            }
            // If a user is found
            if(user){
              token = user.generateJwt();
              res.status(200);
              res.json({
                "token" : token
              });
            } else {
              // If user is not found
              res.status(401).json(info);
            }
          })(req, res);
    }
    break;
    case 'teacher' :{
        passport.authenticate('teacher', (err, user, info) => {
            let token;
        
            // If Passport throws/catches an error
            if (err) {
              res.status(404).json(err);
              return;
            }
        
            // If a user is found
            if(user){
              token = user.generateJwt();
              res.status(200);
              res.json({
                "token" : token
              });
            } else {
              // If user is not found
              res.status(401).json(info);
            }
          })(req, res);
    }
    break;
    case 'partner' :{
        passport.authenticate('partner', (err, user, info) => {
            let token;
        
            // If Passport throws/catches an error
            if (err) {
              res.status(404).json(err);
              return;
            }
        
            // If a user is found
            if(user){
              token = user.generateJwt();
              res.status(200);
              res.json({
                "token" : token
              });
            } else {
              // If user is not found
              res.status(401).json(info);
            }
          })(req, res);
    }
    break;
    case 'personal' :{
        passport.authenticate('personal', (err, user, info) => {
            let token;
        
            // If Passport throws/catches an error
            if (err) {
              res.status(404).json(err);
              return;
            }
        
            // If a user is found
            if(user){
              token = user.generateJwt();
              res.status(200);
              res.json({
                "token" : token
              });
            } else {
              // If user is not found
              res.status(401).json(info);
            }
          })(req, res);
    }
    break;

}


};
