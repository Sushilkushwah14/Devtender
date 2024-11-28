// //get all user of same mailid
// app.get("/users", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     const users = await User.find({ emailId: userEmail });
//     if (users.length === 0) {
//       res.status(404).send("users not found");
//     } else {
//       res.send(users);
//     }
//   } catch (error) {
//     res.status(400).send("something weent wrong");
//   }
// });

// //get by emailid
// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     const user = await User.findOne({ emailId: userEmail });
//     res.send(user);
//   } catch (error) {
//     res.status(500).send("something weent wrong ,wrong email");
//   }
// });

// //to delete in database
// app.delete("/user", async (req, res) => {
//   const userid = req.body._id;
//   try {
//     await User.findByIdAndDelete({ userid });
//     res.send("User deleted successfully");
//   } catch (error) {
//     res.status(400).send("something weent wrong");
//   }
// });
// //to update data of the user
// app.patch("/user", async (req, res) => {
//   const userid = req.body._id;
//   const data = req.body;
//   try {
    // const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    // const isUpdateAllowed = Object.keys(data).every((k) =>
    //   ALLOWED_UPDATES.includes(k)
    // );
    // if (!isUpdateAllowed) {
    //   throw new Error("Update is not allowed");
    // }
//     if(data?.skills?.length>3){
//       throw new Error("skills are too many ")
//     }
//     //id wale main,all "data" ke andar kuch bhi update kar sakte hai
//     await User.findByIdAndUpdate({ _id: userid }, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });
//     res.send("user updated successfully");
//   } catch (error) {
//     res.status(400).send("UPDATE failed" + error.message);
//   }
// });
// //to update data of the user in email
// app.patch("/user", async (req, res) => {
//   const userid = req.body._id;
//   const updateEmail = req.body.emailId;
//   try {
//     //emailid wale kitnebhi main,all "emailId:updateEmail" ke andar kuch bhi update kar sakte hai
//     await User.findByIdAndUpdate(
//       { userid },
//       { emailId: updateEmail },
//       {
//         returnDocument: "after",
//         runValidators: true,
//       }
//     );
//     res.send("user updated successfully");
//   } catch (error) {
//     res.status(400).send("UPDATE failed" + error.message);
//   }
// });
