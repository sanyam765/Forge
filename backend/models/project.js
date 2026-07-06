import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
    trim:true,
  },
  description:{
    type:String,
    required:true,
    trim:true
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  techStack:{
    type:[String],
    default:[]
  },
  members:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
  ],
  maxMembers:{
    type:Number,
    default:4,
  },
  status:{
    type:String,
    enum:["Open","In Progress","Completed"],
    default:"Open"
  }
},{
  timestamps:true,
})

const projectModel = mongoose.models.Project || mongoose.model("Project",projectSchema)

export default projectModel;