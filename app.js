var express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  expressvalidator = require("express-validator"),
  session = require("express-session"),
  methodOverride = require("method-override"),
  bodyparser = require("body-parser"),
  passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  passportLocalMongoose = require("passport-local-mongoose"),
  flash = require("connect-flash"),
  Student = require("./models/student"),
  Warden = require("./models/warden"),
  //timeTable = require("./models/TimeTable"),
  Extraemployee = require("./models/extraemployee"),

  // Hod = require("./models/hod"),
  Leave = require("./models/leave");
  Incidents = require("./models/incidents");

var moment = require("moment");
const { ObjectId } = require("mongoose");
var nodemailer = require('nodemailer');

// var url =process.env.DATABASEURL|| "mongodb://localhost/LeaveApp";
var url =
  process.env.DATABASEURL ||
  "mongodb+srv://neha:nehajakhar@cluster0.xmner.mongodb.net/Main-security-system?retryWrites=true&w=majority";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("Error:", err.message);
  });

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(expressvalidator());

//passport config
app.use(
  require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// passport.use(new LocalStrategy(Student.authenticate()));
// passport.use(
//   new LocalStrategy(function(username, password, done) {
//     User.findOne({ username: username }, function(err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false);
//       }
//       if (!user.verifyPassword(password)) {
//         return done(null, false);
//       }
//       return done(null, user);
//     });
//   })
// );

// passport.serializeUser(Student.serializeUser());
// passport.deserializeUser(Student.deserializeUser());
// app.use(
//   expressvalidator({
//     errorFormatter: function(param, msg, value) {
//       var namespace = param.split("."),
//         root = namespace.shift(),
//         formParam = root;

//       while (namespace.length) {
//         formParam += "[" + namespace.shift() + "]";
//       }
//       return {
//         param: formParam,
//         msg: msg,
//         value: value
//       };
//     }
//   })
// );

app.use(flash());
app.use((req, res, next) => {
  //   res.locals.currentUser = req.user;
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.user = req.user || null;
  next();
});


///////////////////////////////////////////////////////
app.get('/warden/mail', (req,res)=>{


var mailList = [];
Student.find({}, (err, allUsers)=>{
  if(err){
      console.log(err);
  }
  allUsers.forEach(function(users){
      mailList.push(users.emailid);
      // return mailList;
  });
});


  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cs258g11@gmail.com',
      pass: 'weareg11team@cs258'
    }
  });
  
  var mailOptions = {
    from: 'cs258g11@gmail.com',
    to: mailList,
    subject: 'Salary Credited !!',
    text: 'Your salary for this month is credited to your bank account. Please verify and inform within two days in case of any discrepancy.'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  Warden.find({}, (err, hod) => {
    if (err) {
      console.log("err");
    } else {
      res.redirect('/warden/home');

        
    }
  });
});

  ////////////////////////////////////////////////////////

  

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error", "You need to be logged in");
    res.redirect("/student/login");
  }
}

app.get("/", (req, res) => {
  res.render("home");
});

//login logic for Student

//login logic for Hod

// passport.serializeUser(function(hod, done) {
//   done(null, hod.id);
// });

// passport.deserializeUser(function(id, done) {

// });

//registration form
app.get("/register", (req, res) => {
  res.render("loginForRegister");

  // res.render("register");
});
//validating before allowing Registration permission

app.post("/student/registerCheck", (req, res) => {
  var enteredPassword = req.body.password;
  if (enteredPassword == "123456") {
    console.log("correct");
    res.render("register");
  } else {
    console.log("incorrect");
    // alert();
    res.render("loginForRegister");
  }
});

//registration logic
app.post("/student/register", (req, res) => {
  var type = req.body.type;
  if (type == "student") {
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    var hostel = req.body.hostel;

    var phonenumber = req.body.phonenumber;
    var emailid = req.body.emailid;
    var image = req.body.image;
    //validation
    req.checkBody("name", "name is required").notEmpty();
    req.checkBody("username", "Username is required").notEmpty();
    req.checkBody("hostel", "department is required").notEmpty();
    req.checkBody("phonenumber", "phonenumber is required").notEmpty();
    req.checkBody("emailid", "emailid is required").notEmpty();

    req.checkBody("password", "Password is required").notEmpty();
    req.checkBody("password2", "Password dont match").equals(req.body.password);

    var errors = req.validationErrors();
    if (errors) {
      // req.session.errors = errors;
      // req.session.success = false;
      console.log("errors: " + errors);
      res.render("register", {
        errors: errors,
      });
    } else {
      var newStudent = new Student({
        name: name,
        username: username,
        password: password,

        phonenumber: phonenumber,
        emailid: emailid,
        hostel: hostel,

        type: type,
        image: image,
      });
      Student.createStudent(newStudent, (err, student) => {
        if (err) throw err;
        console.log(student);
      });
      req.flash("success", "you are registered successfully,now you can login");

      res.redirect("/student/login");
    }
  } else if (type == "warden") {
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var phonenumber = req.body.phonenumber;
    var emailid = req.body.emailid;

    var hostel = req.body.hostel;

    var image = req.body.image;

    req.checkBody("name", "name is required").notEmpty();
    req.checkBody("username", "Username is required").notEmpty();
    req.checkBody("password", "password is required").notEmpty();

    req.checkBody("phonenumber", "phonenumber is required").notEmpty();
    req.checkBody("emailid", "emailid is required").notEmpty();
    req.checkBody("hostel", "department is required").notEmpty();
    req.checkBody("password2", "Password dont match").equals(req.body.password);

    var errors = req.validationErrors();
    if (errors) {
      res.render("register", {
        errors: errors,
      });
    } else {
      var newWarden = new Warden({
        name: name,
        username: username,
        password: password,

        phonenumber: phonenumber,
        emailid: emailid,
        hostel: hostel,

        type: type,
        image: image,
      });
      Warden.createWarden(newWarden, (err, warden) => {
        if (err) throw err;
        console.log(warden);
      });
      req.flash("success", "you are registered successfully,now you can login");

      res.redirect("/warden/login");
    }
  }
});

//stratergies
passport.use(
  "student",
  new LocalStrategy((username, password, done) => {
    Student.getUserByUsername(username, (err, student) => {
      if (err) throw err;
      if (!student) {
        return done(null, false, { message: "Unknown User" });
      }
      Student.comparePassword(
        password,
        student.password,
        (err, passwordFound) => {
          if (err) throw err;
          if (passwordFound) {
            return done(null, student);
          } else {
            return done(null, false, { message: "Invalid Password" });
          }
        }
      );
    });
  })
);

passport.use(
  "warden",
  new LocalStrategy((username, password, done) => {
    Warden.getUserByUsername(username, (err, warden) => {
      if (err) throw err;
      if (!warden) {
        return done(null, false, { message: "Unknown User" });
      }
      Warden.comparePassword(
        password,
        warden.password,
        (err, passwordFound) => {
          if (err) throw err;
          if (passwordFound) {
            return done(null, warden);
          } else {
            return done(null, false, { message: "Invalid Password" });
          }
        }
      );
    });
  })
);

//srialize

passport.serializeUser(function (user, done) {
  // console.log(user.id);
  done(null, { id: user.id, type: user.type });
});

//deserialize

passport.deserializeUser(function (obj, done) {
  switch (obj.type) {
    case "student":
      Student.getUserById(obj.id, function (err, student) {
        done(err, student);
      });
      break;
    // case "hod":
    //   Hod.getUserById(obj.id, function(err, hod) {
    //     done(err, hod);
    //   });
    //   break;
    case "warden":
      Warden.getUserById(obj.id, function (err, warden) {
        done(err, warden);
      });
      break;
    default:
      done(new Error("no entity type:", obj.type), null);
      break;
  }
});

app.get("/student/login", (req, res) => {
  res.render("login");
});

app.post(
  "/student/login",
  passport.authenticate("student", {
    successRedirect: "/student/home",
    failureRedirect: "/student/login",
    failureFlash: true,
  }),
  (req, res) => {
    // console.log(student);
    res.redirect("/student/home");
  }
);

app.get("/student/home", ensureAuthenticated, (req, res) => {
  var student = req.user.username;
  console.log(student);
  Student.findOne({ username: req.user.username })
    .populate("leaves")
    .exec((err, student) => {
      if (err || !student) {
        req.flash("error", "student not found");
        res.redirect("back");
        console.log("err");
      } else {
        res.render("homestud", {
          student: student,
          moment: moment,
        });
      }
    });
});
app.get("/student/:id", ensureAuthenticated, (req, res) => {
  console.log(req.params.id);
  Student.findById(req.params.id)
    .populate("leaves")
    .exec((err, foundStudent) => {
      if (err || !foundStudent) {
        req.flash("error", "Student not found");
        res.redirect("back");
      } else {
        res.render("profilestud", { student: foundStudent });
      }
    });
});
app.get("/student/:id/edit", ensureAuthenticated, (req, res) => {
  Student.findById(req.params.id, (err, foundStudent) => {
    res.render("editS", { student: foundStudent });
  });
});
app.put("/student/:id", ensureAuthenticated, (req, res) => {
  console.log(req.body.student);
  Student.findByIdAndUpdate(
    req.params.id,
    req.body.student,
    (err, updatedStudent) => {
      if (err) {
        req.flash("error", err.message);
        res.redirect("back");
      } else {
        req.flash("success", "Succesfully updated");
        res.redirect("/student/" + req.params.id);
      }
    }
  );
});

app.get("/student/:id/apply", ensureAuthenticated, (req, res) => {
  Student.findById(req.params.id, (err, foundStud) => {
    if (err) {
      console.log(err);
      res.redirect("back");
    } else {
      res.render("leaveApply", { student: foundStud });
    }
  });
});

app.post("/student/:id/apply", (req, res) => {
  Student.findById(req.params.id)
    .populate("leaves")
    .exec((err, student) => {
      if (err) {
        res.redirect("/student/home");
      } else {
        date = new Date(req.body.leave.from);
        todate = new Date(req.body.leave.to);
        year = date.getFullYear();
        month = date.getMonth() + 1;
        dt = date.getDate();
        todt = todate.getDate();

        if (dt < 10) {
          dt = "0" + dt;
        }
        if (month < 10) {
          month = "0" + month;
        }
        console.log(todt - dt);
        req.body.leave.days = todt - dt;
        console.log(year + "-" + month + "-" + dt);
        // req.body.leave.to = req.body.leave.to.substring(0, 10);
        console.log(req.body.leave);
        // var from = new Date(req.body.leave.from);
        // from.toISOString().substring(0, 10);
        // console.log("from date:", strDate);
        Leave.create(req.body.leave, (err, newLeave) => {
          if (err) {
            req.flash("error", "Something went wrong");
            res.redirect("back");
            console.log(err);
          } else {
            newLeave.stud.id = req.user._id;
            newLeave.stud.username = req.user.username;
            newLeave.stud.id = req.user._id;
            newLeave.stud.name = req.user.name;
            newLeave.stud.phonenumber = req.user.phonenumber;
            newLeave.stud.emailid = req.user.emailid;
            console.log("leave is applied by--" + req.user.username);

            // console.log(newLeave.from);
            newLeave.save();

            student.leaves.push(newLeave);

            student.save();
            // req.flash("success", "Successfully applied for leave");
            res.render("homestud", { student: student, moment: moment });
          }
        });
      }
    });
});

app.get("/student/:id/track", (req, res) => {
  Student.findById(req.params.id)
    .populate("leaves")
    .exec((err, foundStud) => {
      if (err) {
        req.flash("error", "No student with requested id");
        res.redirect("back");
      } else {
        res.render("trackLeave", { student: foundStud, moment: moment });
      }
    });
});
app.get("/student/:id/monthlyleaves", (req, res) => {
  Student.findById(req.params.id)
    .populate("leaves")
    .exec((err, foundStud) => {
      if (err) {
        req.flash("error", "No student with requested id");
        res.redirect("back");
      } else {
        res.render("employeemonthlyleaves", {
          student: foundStud,
          moment: moment,
        });
      }
    });
});

app.get("/warden/login", (req, res) => {
  res.render("wardenlogin");
});

app.post(
  "/warden/login",
  passport.authenticate("warden", {
    successRedirect: "/warden/home",
    failureRedirect: "/warden/login",
    failureFlash: true,
  }),
  (req, res) => {
    res.redirect("/warden/home");
  }
);
app.get("/warden/home", ensureAuthenticated, (req, res) => {
  Warden.find({}, (err, hod) => {
    if (err) {
      console.log("err");
    } else {
      res.render("homewarden", {
        warden: req.user,
      });
    }
  });
});
// app.get("/warden/home", ensureAuthenticated, (req, res) => {
//   Warden.find({}, (err, hod) => {
//     if (err) {
//       console.log("err");
//     } else {
//       res.render("homewarden", {
//         warden: req.user,
//       });
//     }
//   });
// });

app.get("/warden/:id", ensureAuthenticated, (req, res) => {
  console.log(req.params.id);
  Warden.findById(req.params.id).exec((err, foundWarden) => {
    if (err || !foundWarden) {
      req.flash("error", "Warden not found");
      res.redirect("back");
    } else {
      res.render("profilewarden", { warden: foundWarden });
    }
  });
});
app.get("/warden/:id/edit", ensureAuthenticated, (req, res) => {
  Warden.findById(req.params.id, (err, foundWarden) => {
    res.render("editW", { warden: foundWarden });
  });
});

app.put("/warden/:id", ensureAuthenticated, (req, res) => {
  console.log(req.body.warden);
  Warden.findByIdAndUpdate(
    req.params.id,
    req.body.warden,
    (err, updatedWarden) => {
      if (err) {
        req.flash("error", err.message);
        res.redirect("back");
      } else {
        // req.flash("success", "Succesfully updated");
        res.redirect("/warden/" + req.params.id);
      }
    }
  );
});

app.get("/warden/:id/leave", (req, res) => {
  Warden.findById(req.params.id).exec((err, wardenFound) => {
    if (err) {
      req.flash("error", "warden not found with requested id");
      res.redirect("back");
    } else {
      Leave.find().exec((err, leaves) => {
        if (err) {
          req.flash("error", "some error occured");
          res.redirect("back");
        } else {
          res.render("wardenLeaveSign", {
            warden: wardenFound,

            leaves: leaves,
            moment: moment,
          });
        }
      });
    }
  });
});
// app.get("/warden/:id/leave", (req, res) => {
//   Warden.findById(req.params.id).exec((err, wardenFound) => {
//     if (err) {
//       req.flash("error", "warden not found with requested id");
//       res.redirect("back");
//     } else {
//       // console.log(hodFound);
//       Student.find({ hostel: wardenFound.hostel })
//         .populate("leaves")
//         .exec((err, students) => {
//           if (err) {
//             req.flash("error", "student not found with your department");
//             res.redirect("back");
//           } else {
//             res.render("wardenLeaveSign", {
//               warden: wardenFound,
//               students: students,

//               moment: moment,
//             });
//           }
//         });
//     }
//   });
// });
app.get("/warden/:id/leave/:leave_id/:stud_id/info", (req, res) => {
  Warden.findById(req.params.id).exec((err, wardenFound) => {
    if (err) {
      req.flash("error", "warden not found with requested id");
      res.redirect("back");
    } else {
      Leave.findById(req.params.leave_id)
        .populate("leaves")
        .exec((err, leave) => {
          if (err) {
            req.flash("error", "leave not found with this id");
            res.redirect("back");
          } else {
            Student.findById(req.params.stud_id)
              .populate("leaves")
              .exec((err, foundStudent) => {
                if (err) {
                  req.flash("error", "employee not found with this id");
                  res.redirect("back");
                } else {
                  res.render("Wardenmoreinfostud", {
                    student: foundStudent,
                    leave: leave,
                    warden: wardenFound,
                    moment: moment,
                  });
                }
              });
          }
        });
    }
  });
});

app.post("/warden/:id/leave/:leave_id/:stud_id/info", (req, res) => {
  Warden.findById(req.params.id).exec((err, wardenFound) => {
    if (err) {
      req.flash("error", "warden not found with requested id");
      res.redirect("back");
    } else {
      Leave.findById(req.params.leave_id)
        .populate("leaves")
        .exec((err, leave) => {
          if (err) {
            req.flash("error", "leave not found with this id");
            res.redirect("back");
          } else {
            Student.findById(req.params.stud_id)
              .populate("leaves")
              .exec((err, foundStudent) => {
                if (err) {
                  req.flash("error", "student not found with this id");
                  res.redirect("back");
                } else {
                  if (req.body.action === "Approve") {
                    foundStudent.leaves.forEach(function (leave) {
                      if (leave.wardenstatus === "pending") {
                        leave.wardenstatus = "approved";
                        leave.finalstatus = "approved";
                        leave.status = "approved";
                        leave.approved = true;
                        leave.save();
                      }
                    });
                  } else {
                    console.log("u denied");
                    foundStudent.leaves.forEach(function (leave) {
                      if (leave.wardenstatus === "pending") {
                        leave.wardenstatus = "denied";
                        leave.finalstatus = "denied";
                        leave.status = "denied";
                        leave.denied = true;
                        leave.save();
                      }
                    });
                  }
                  res.render("Wardenmoreinfostud", {
                    student: foundStudent,
                    warden: wardenFound,
                    leave: leave,
                    moment: moment,
                  });
                }
              });
          }
        });
    }
  });
});

// app.get("/warden/:id/timeTable", (req, res) => {
//   Warden.findById(req.params.id).exec((err, wardenFound) => {
//     if (err) {
//       req.flash("error", "warden not found with requested id");
//       res.redirect("back");
//     } else {
//       // console.log(TimeTable);
//       timeTable
//         .findOne({ ID: "1" })
//         .then((tt) => {
//           console.log("hello");
//           console.log(tt);
//           res.render("timeTable", {
//             warden: wardenFound,
//             tt: tt,
//           });
//         })
//         .catch((error) => console.log(error));

//       // TimeTable.find({}).exec((err,timeTable)=>{
//       //   if (err) {
//       //     req.flash("error", "some error occured");
//       //     res.redirect("back");
//       //   } else {
//       //     console.log(timeTable);
//       //     res.render("timeTable", {
//       //       warden: wardenFound,
//       //       timeTable : timeTable
//       //     });
//       //   }
//       // });
//     }
//   });
// });


app.get("/warden/:id/extraemployee", (req, res) => {
  Warden.findById(req.params.id).exec((err, wardenFound) => {
    if (err) {
      req.flash("error", "warden not found with requested id");
      res.redirect("back");
    } else {
      Extraemployee.find().exec((err,employees) => {
        if (err) {
          req.flash("error", "employee not found with your department");
          res.redirect("back");
        } else {
          employees.forEach(function (employee) {
            console.log(employee);
          });
      
          res.render("extraemployee", {
            warden: wardenFound,
            employees:employees,
          });
        }
      });
    }
  });
});
app.post("/warden/:id/extraemployee", (req, res) => {
  Warden.findById(req.params.id).exec((err, wardenFound) => {
    if (err) {
      req.flash("error", "warden not found with requested id");
      res.redirect("back");
    } else {
       console.log(req.body);
       var name=req.body.name;
       var emailid=req.body.emailid;
       var contactno=req.body.contactno;
      let newemployee=new Extraemployee({name:name,emailid:emailid,contatcno:contactno});
      // extraemployee.create(newemployee, function(err, res) {
      //   if (err) {
      //     console.log("error")
      //   }else{
      //   console.log("1 document inserted");
      //   }
      // });
      newemployee.save()
   .then(doc => {
     console.log(doc)
   })
   .catch(err => {
     console.error(err)
   })
      
      res.render("extraemployee", {
        warden: wardenFound,
        moment: moment,
      });
  

    }
  });
});


app.get("/warden/:id/addextraemployee", (req, res) => {
  res.render("addextraemployee");
});


app.get("/warden/:id/manageSalary", (req, res) => {
  Warden.findById(req.params.id).exec((err, wardenFound) => {
    if (err) {
      req.flash("error", "warden not found with requested id");
      res.redirect("back");
    } else {
      // console.log(wardenFound);
      Student.find({ hostel: wardenFound.hostel }).exec((err, students) => {
        if (err) {
          req.flash("error", "student not found with your department");
          res.redirect("back");
        } else {
          res.render("manageSalary", {
            warden: wardenFound,
            students: students,

            moment: moment,
          });
        }
      });
    }
  });
});

app.post("/warden/:id/saveSalary", (req, res) => {
  var salaryArray = req.body.salary;
  // var studentUsernameArray = [];
  console.log(salaryArray);
  Warden.findById(req.params.id).exec((err, wardenFound) => {
    if (err) {
      req.flash("error", "warden not found with requested id");
      res.redirect("back");
    } else {
  Student.find({ hostel: wardenFound.found }).exec((err, students) => {
    // console.log(students);
    if (err) {
      req.flash("error", "student not found with your department");
      res.redirect("back");
    } else {
      var i = 0;

      students.forEach(function (student) {
        console.log("Hello");
        console.log(student.username);
        student.salary = salaryArray[i];
        student.save();
        // studentUsernameArray.push(student.username);
        i++;

      });
    }

      Student.find({ hostel: "Security" }).exec((err, students) => {
        if (err) {
          req.flash("error", "student not found with your department");
          res.redirect("back");
        } else {
          students.forEach(function (student) {
            console.log(student.salary);
          });
      
          res.render("manageSalary", {
            // warden: wardenFound,
            students: students,
      
            moment: moment,
          });
        }
      });


      // res.render("manageSalary", {
      //   warden: wardenFound,
      //   students: students,

      //   moment: moment,
      // });
    
  });
}
});

});
// });
        // student.update({"hostel":"Security"},{$set:{"salary":salaryArray[i]}},{multi:true});
        // student.save();
        // student.salary = salaryArray[i];
        // student.update(
        //   {},
        //   {
        //     $set: {
        //       salary : salaryArray[i]
        //     },
        //   }
        // );

    ///////////////////////////////////
    // console.log("usernames : ", studentUsernameArray);

    // var size = studentUsernameArray.length;
    // console.log("sizze :", size);

    // for (let j = 0; j < size; j++) {
    //   console.log(studentUsernameArray[j]);
    //   console.log(salaryArray[j]);
    //   Student.updateOne(
    //     { "username": studentUsernameArray[j] },
    //     { $set: { "salary": salaryArray[j] } },
    //     { multi: true }
    //   );
    // }


    /////////////////////////////

////////////////////////////////

app.get("/student/:id/calculateMonthlySalaryS", (req, res) => {
  
    
      Student.findById(req.params.id).exec((err, students) => {
        if (err) {
          req.flash("error", "guard not found ");
          res.redirect("back");
        } else {
          console.log(students);
          
          res.render("entermonthS", {
            
            students: students,

            moment: moment,
          });
        }
      });
});

app.post("/student/:id/calculateMonthlySalaryS", (req, res) => {
  
      var monthNo = req.body.month;
      Student.findById(req.params.id).exec((err, students) => {
        if (err) {
          req.flash("error", "guard not found ");
          res.redirect("back");
        } else {
          console.log(students);
          Leave.find({}, function (err, leavedata) {
            var leavedata = leavedata;
            // console.log(leavedata);
            res.render("calculateMonthlySalaryS", {
              students: students,
              monthNo: monthNo,
              leavedata: leavedata,
            });
          });
        }
      });
});

app.get("/warden/:id/calculateMonthlySalary", (req, res) => {
  Warden.findById(req.params.id).exec((err, wardenFound) => {
    if (err) {
      req.flash("error", "warden not found with requested id");
      res.redirect("back");
    } else {
      // console.log(wardenFound);
      Student.find({ hostel: wardenFound.hostel }).exec((err, students) => {
        if (err) {
          req.flash("error", "student not found with your department");
          res.redirect("back");
        } else {
          // students.forEach(function(student){
          //   console.log("Hello");
          // });
          res.render("entermonth", {
            warden: wardenFound,
            students: students,

            moment: moment,
          });
        }
      });
    }
  });
});
app.post("/warden/:id/calculateMonthlySalary", (req, res) => {
  console.log(req.body.month);
  var monthNo = req.body.month;
  Student.find({}, function (err, data) {
    var students = data;
    // console.log(students);
    Leave.find({}, function (err, leavedata) {
      var leavedata = leavedata;
      // console.log(leavedata);
      res.render("calculatemonthlysalary", {
        students: students,
        monthNo: monthNo,
        leavedata: leavedata,
      });
    });
  });
});



// app.post("/editTimeTable", (req, res) => {
//   console.log(req.body.shift1_1);

//   timeTable
//     .findOneAndUpdate({ _id: "622dae1bd5de8435413ba367" }, { $set: req.body })
//     .then((newtt) => res.redirect("/warden/6228f7ce3b00b39f6c88cd36/timeTable"))
//     .catch((error) => console.log(error));
//   // fromdate = new Date(req.body.from_tt);
//   // todate = new Date(req.body.to_tt);
//   // year = fromdate.getFullYear();
//   // month = fromdate.getMonth() + 1;
//   // dt = fromdate.getDate();
//   // todt = todate.getDate();
//   // if (dt < 10) {
//   //   dt = "0" + dt;
//   // }
//   // if (month < 10) {
//   //   month = "0" + month;
//   // }
//   // TimeTable.create((err, newtt) => {
//   //   if (err) {
//   //     req.flash("error", "Something went wrong");
//   //     res.redirect("back");
//   //     console.log(err);
//   //   } else {

//   //     newtt.shift1_1 = req.body.shift1_1;
//   //     newtt.shift2_1 = req.body.shift2_1;
//   //     newtt.shift3_1 = req.body.shift3_1;
//   //     newtt.shift1_2 = req.body.shift1_2;
//   //     newtt.shift2_2 = req.body.shift2_2;
//   //     newtt.shift3_2 = req.body.shift3_2;
//   //     newtt.shift1_3 = req.body.shift1_3;
//   //     newtt.shift2_3 = req.body.shift2_3;
//   //     newtt.shift3_3 = req.body.shift3_3;
//   //     newtt.shift1_4 = req.body.shift1_4;
//   //     newtt.shift2_4 = req.body.shift2_4;
//   //     newtt.shift3_4 = req.body.shift3_4;
//   //     newtt.shift1_5 = req.body.shift1_5;
//   //     newtt.shift2_5 = req.body.shift2_5;
//   //     newtt.shift3_5 = req.body.shift3_5;
//   //     newtt.from = req.body.from_tt;
//   //     newtt.to = req.body.to_tt;

//   //     newtt.save();

//   //     res.render("timeTable", { timeTable : newtt });
//   //   }
//   // });
  
//   // TimeTable.find({}).exec((err,tt)=> {
//   //   var timeTable = tt;
//   //   if (err) {
//   //     req.flash("error", "leave not found with this id");
//   //     res.redirect("back");
//   //   } else{
//   //     timeTable.shifts.updateMany(
//   //       {}, //match all
//   //       {
//   //         $set: {
//   //           shift1_1: req.body.shift1_1,
//   //           shift2_1: req.body.shift2_1,
//   //           shift3_1: req.body.shift3_1,
//   //           shift1_2: req.body.shift1_2,
//   //           shift2_2: req.body.shift2_1,
//   //           shift3_2: req.body.shift3_1,
//   //           shift1_3: req.body.shift1_3,
//   //           shift2_3: req.body.shift2_3,
//   //           shift3_3: req.body.shift3_3,
//   //           shift1_4: req.body.shift1_4,
//   //           shift2_4: req.body.shift2_4,
//   //           shift3_4: req.body.shift3_4,
//   //           shift1_5: req.body.shift1_5,
//   //           shift2_5: req.body.shift2_5,
//   //           shift3_5: req.body.shift3_5,
//   //         },
//   //       },
//   //       {
//   //         multi: true,
//   //       }
//   //     );
//   //   res.redirect("/warden/6228f7ce3b00b39f6c88cd36/timeTable");
//   // }
// });

//   timeTable.findAndUpdate({ "ID" : "1"},
//   {"shift1_1": req.body.shift1_1,
//   "shift2_1": req.body.shift2_1,
//   "shift3_1": req.body.shift3_1,
//   "shift1_2": req.body.shift1_2,
//   "shift2_2": req.body.shift2_1,
//   "shift3_2": req.body.shift3_1,
//   "shift1_3": req.body.shift1_3,
//   "shift2_3": req.body.shift2_3,
//   "shift3_3": req.body.shift3_3,
//   "shift1_4": req.body.shift1_4,
//   "shift2_4": req.body.shift2_4,
//   "shift3_4": req.body.shift3_4,
//   "shift1_5": req.body.shift1_5,
//   "shift2_5": req.body.shift2_5,
//   "shift3_5": req.body.shift3_5
// },
//     function(err, result){

//     if(err){
//         res.send(err)
//     }
//     else{
//         res.redirect("/warden/62223f9190e9493a2819e287/timeTable");
//     }

// });


app.get("/warden/:id/incident", (req, res) => {
  Warden.findById(req.params.id).exec((err, wardenFound) => {
    if (err) {
      req.flash("error", "warden not found with requested id");
      res.redirect("back");
    } else {
      Incidents.find().exec((err,incidents) => {
        if (err) {
          req.flash("error", "incident not found with your department");
          res.redirect("back");
        } else {
          incidents.forEach(function (incident) {
            console.log(incident);
          });
      
          res.render("incident", {
            warden: wardenFound,
            incidents:incidents,
            moment: moment
          });
        }
      });
    }
  });
});
app.post("/warden/:id/incident", (req, res) => {
  Warden.findById(req.params.id).exec((err, wardenFound) => {
    if (err) {
      req.flash("error", "warden not found with requested id");
      res.redirect("back");
    } else {
       console.log(req.body);
       var heading=req.body.heading;
       var location=req.body.location;
       var date=req.body.date;
       var description=req.body.description;
       var precaution=req.body.precaution;
      let newincident=new Incident({heading:heading,location:location,date:date,description:description,precaution:precaution});

      newincident.save()
   .then(doc => {
     console.log(doc)
   })
   .catch(err => {
     console.error(err)
   })
      
      res.render("incident", {
        warden: wardenFound,
        moment: moment,
      });
  

    }
  });
});

// app.get("/warden/:id/incident", (req, res) => {
//   Warden.findById(req.params.id).exec((err, wardenFound) => {
//     if (err) {
//       req.flash("error", "warden not found with requested id");
//       res.redirect("back");
//     } else {
//       incidents.findById(req.params.id)
//         .populate("incidents")
//         .exec((err, incidents) => {
//           if (err) {
//             req.flash("error", "incident not found with this id");
//             res.redirect("back");
//           } else {

//                   res.render("incident", {
//                     // student: foundStudent,
//                     incidents: incidents,
//                     warden: wardenFound,
//                     moment: moment,
//                   });

//           }
//         });
//     }
//   });
// });

//logout for student

app.get("/logout", (req, res) => {
  req.logout();
  // req.flash("success", "you are logged out");
  res.redirect("/");
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
