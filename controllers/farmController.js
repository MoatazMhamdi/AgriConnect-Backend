import Farm from "../models/farm.js";


// Create a new farm
export const createFarm = async (req , res) => {
    try {
        const newFarm = new Farm({...req.body});
        await newFarm.save();
        res.status(201).send({success:{msg:"la Ferme a été crée avec succes",newFarm}});
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
} 

// Get an farm by its ID
export async function getOneFarm(req, res) {
 const {_id} = req.params;
 try {
    const foundFarm = await Farm.findById({_id:_id});
    if(!foundFarm)
    res.status(400).send({errors:[{msg:"Ferme n'existe pas"}]});
    else
    res.status(200).send({success:{msg:"Ferme trouvée",foundFarm}});
    
 } catch (error) {
    res.status(400).send({errors:[{msg:error.message}]});

 }
}

// Update a farme
export async function updateFarm(req, res) {
    const {id} = req.params;

  try {
   const newFarm = req.body
   await Farm.updateOne({_id:id} , {$set:newFarm});
   res.status(200).send({success:{msg:"ferme modifié avec succes",newFarm}});

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//delete a farm
export async function deleteFarm(req, res) {
    try {
      
     const deletedFarm = await Farm.findByIdAndDelete({_id:req.params.id})
     deletedFarm ?
     res.status(200).send({success:{msg:"Ferme supprimée avec succes",deletedFarm}})
     :
     res.status(404).json({errors:{message:'Suppression echoué'}})


    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

// Get a list of all farms
export async function getFarm(req, res) {
  try {
    const farms = await Farm.find();
    res.status(200).json(farms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}