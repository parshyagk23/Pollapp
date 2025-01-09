
const PollSchema= require('../Model/Pollmodel')

const CratePoll =async (req,res)=>{

    try {
        const { title, description, option1, option2 } = req.body;
    if (!title || !description || !option1 ||!option2) {
      return res.status(400).json({
        errormessage: "Bad request",
      });
    }
    const poll = await new PollSchema({
        title,
        description,
        option1,
        option2
    })
    await poll.save()
    res.status(200).json({
        successMessage: "Poll created successfully",
      });

        
    } catch (error) {
        res.status(500).json({
            errorMessage: "Internal server error",
          });
    }
}
const GetAllPollList = async(req,res)=>{
    try {
        
        const poll = await PollSchema.find()
        if(poll.length===0){
          res.status(404).json({
            errorMessage: "Poll not created", 
          })
          return
        }
        res.status(200).json({
            data:poll
          });
        
    } catch (error) {
        res.status(500).json({
            errorMessage: "Internal server error",
          });
    }

}
const GetPollDetailsById = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            req.status(400).json({
                errorMessage: "Bad request",
              });
        }
    const PollDetails = await PollSchema.findById({_id:id})
    if(!PollDetails){
        res.status(404).json({
            errorMessage: "Poll not found",
          });
    }
    res.status(200).json({
        PollDetails
      });
        
    } catch (error) {
        res.status(500).json({
            errorMessage: "Internal server error",
          });
    }
}

const DeletePollById = async(req,res)=>{
  try {
      const {id} = req.params;
      if(!id){
          req.status(400).json({
              errorMessage: "Bad request",
            });
      }
  const PollDetails = await PollSchema.findByIdAndDelete({_id:id})
  if(!PollDetails){
      res.status(404).json({
          errorMessage: "Poll not found",
        });
  }
  res.status(200).json({
      successMessage: "Poll deleted successfully",
    });
      
  } catch (error) {
      res.status(500).json({
          errorMessage: "Internal server error",
        });
  }
}



module.exports={CratePoll,GetAllPollList,GetPollDetailsById,DeletePollById}