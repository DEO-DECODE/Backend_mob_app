import mongoose from "mongoose";
/*
Projects : {
        duration:’ ’,
        description:’ ’,
         attachment:{
                 attchmentName:’ ‘,
                  attachmentUrl: ‘ `‘,
         }, 
         status: ’ available ’,
         assignedTo:’<uid of freelncr>’,
         delivery:{
              deliveryName:’ ’,
              deliveryUrl:’ ’
          },
         proposal:{
                proposedBy:’ ’,
                proposedDuration:’ ’
                proposedPrice:’ ’
                finalPrice : formulatedOne
                proposalStatus:’ progress ’
         }              
}
*/
const projectSchema = new mongoose.Schema({
  uploadedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Please Add the details of the owner of the project"],
  },
  title:{
    type: String,
    required:[true, "Please add the title of the project"]
  },
  subject:{
    type: String,
  }
  ,
  university:{
    type: String
  },
  duration:{
    
  }
});
export const Project = mongoose.model("Projects", projectSchema, "Projects");
