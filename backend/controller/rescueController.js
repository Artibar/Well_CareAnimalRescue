
import Rescue from "../models/Rescue.js";

export const getAllRescueFormDetails = async(req, res)=>{
    try {
        const rescues = await Rescue.find().sort({createdAt:-1});
        console.log(`Retrieved ${rescues.length} rescue requests `)
        res.status(200).json({
            success: true,
            count: rescues.length,
            data:rescues
        })
    } catch (error) {
        console.error("Error fetching rescue form details:", error);
        res.status(500).json({error: "Internal server error" });
    }
}

export const getRescueFormDetailByItsId = async(req, res)=>{
    try {
        const rescue = await Rescue.findById(req.params.id);
        if(!rescue){
            return res.status(404).json({success: false, message:"Rescue request not found"})
        }
        console.log('Retrieved rescue request:', req.params.id);
        res.status(200).json({
            success:true,
            data:rescue
        });
    } catch (error) {
        console.error("Error fetching rescue request ByItsId:", error);
        res.status(500).json({
            success: false,
            message:error.message || "Failed to fetch rescue request"
        })
        
    }
}
export const createRescueForm = async(req, res)=>{
    try {
        console.log("Received rescue request");
        console.log("Body :", req.body);
        console.log('file:', req.file)
        const {name, phone, address, animalType , manualLocation, liveLocation, isEmergency, } = req.body;
       if(!name || !phone || !address || !animalType || !manualLocation || !liveLocation ){
        return res.status(400).json({error:"All fields are required"})
       }
       let parsedLiveLocation = null;
       if(liveLocation){
        try{
            parsedLiveLocation = typeof liveLocation === 'string'? JSON.parse(liveLocation): liveLocation
        } catch(e){
            console.error("Error parsing liveLocation:", e.message);
        }
       }
        const rescueData = {
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        animalType: animalType.trim(),
        manualLocation:manualLocation? manualLocation.trim() :"",
        liveLocation: parsedLiveLocation?{
            latitude: parsedLiveLocation.latitude,
            longitude: parsedLiveLocation.longitude
        }:{
            latitude: null,
            longitude: null
        },
        isEmergency: isEmergency === 'true' || isEmergency === true,
        image: req.file ? req.file.filename : "",
      }
      console.log("Saving to database:", rescueData);
      const rescue = new Rescue(rescueData);
      await rescue.save();
      console.log("Rescue request saved successfully");
      console.log("id:", rescue._id);
      res.status(201).json({message:" rescue request created successfully", data: rescue, success: true})
     } catch (error) {
        console.error("Error creating rescue form:", error);
        if(req.file){
            fs.unlink(req.file.path, (err)=>{
                if(err)
                console.error("Error deleting uploaded file often error:", err)
            })
        }
        res.status(500).json({ error: "Internal server error" });
    }
}
export const updateRescueForm = async(req, res)=>{
    try {
        const { status } = req.body;
        const validStatus = ['pending', 'in-progress', 'completed', 'cancelled']
        if(status && !validStatus.includes(status)){
            return res.status(400).json({
                success:false,
                message: `Invalid status. must be one of: ${validStatus.join(', ')}`
            });
        }
        const rescue = await Rescue.findByIdAndUpdate(
            req.params.id,
            {status, updatedAt: Date.now()},
            {new: true, runValidators: true}
        );
        if(!rescue){
            return res.status(404).json({
                success: false,
                message:"Rescue request not found"
            })
        }
        console.log('Updated rescue status', req.params.id, 'to', status);
        res.status(200).json({
            success: true,
            message: "Status updated successfully",
            data:rescue
        });
        
    } catch (error) {
        console.error("Error updating rescue form:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteRescue = async(req, res)=>{
   try {
    const rescue = await Rescue.findById(req.params.id)
    if(!rescue){
        return res.status(404).json({
            success: false,
            message:"Rescue request not found"
        });
    }
    if(rescue.animalImage){
        const imagePath = path.join(__dirname, 'uploads', rescue.animalImage)
        fs.unlink(imagePath, (err)=>{
            if(err) console.error("Error deleting image:", err)
                else console.log("Deleting image:", rescue.animalImage)
        })
    }
    await Rescue.findByIdAndDelete(req.params.id);
    console.log("Deleting rescue request:", req.params.id);
    res.status(200).json({
        success: true,
        message:"Rescue request deleted successfully"
    });
   } catch (error) {
     console.error("Error deleting rescue form:", error);
        res.status(500).json({ error: "Internal server error" });
   }
}

export  const getEmergencyRequest = async(req, res)=>{
    try {
        const emergencies = (await Rescue.find({isEmergency: true})).toSorted({createdAt:-1})
        console.log(`Retrieved ${emergencies.length} emergency cases`)
        res.status(200).json({
            success: true,
            count: emergencies.length,
            data: emergencies
        })
    } catch (error) {
     console.error("Error fetching emergency request form:", error);
        res.status(500).json({ error: "Internal server error" });   
    }
} 