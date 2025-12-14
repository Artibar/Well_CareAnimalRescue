import Adoption from "../models/Adoption.js"

export const getAllAdoption = async (req, res)=>{
    try {
      const adoption = await Adoption.find().sort({ createdAt: -1 });
      console.log(`Retrieved ${adoption.length} adoption requests `);
      res.status(200).json({
        success: true,
        adoption
      });
    } catch (error) {
        console.error("Error fetching adoptions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
export const getAdoptionByItsId = async(req, res)=>{
    try {
        const getAdoption = await Adoption.findById(req.params.id)
        if(!getAdoption){
            return res.status(404).json({success: false, message:"Adoption request not found"})
        }
        console.log('Retrieved adoption request:', req.params.id);
        res.status(200).json({
            success: true,
            message:"Adoption request fetched successfully",
            data: getAdoption
        })
    } catch (error) {
        console.error("Error fetching adoption:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
export const createAdoption = async(req, res)=>{
    try {
        console.log("Received adoption request");
    console.log("Body :", req.body);
        const {name, phone, email, address, animalType} = req.body;
        if(!name || !phone || !email || !address || !animalType){
            return res.status(400).json({message:"All detail required"})
        }
        const newAdoption = await Adoption.create({
            name,
            phone,
            email,
            address, 
            animalType,
        })
        res.status(201).json({
            success:true,
            message:"Adoption request created successful",
            newAdoption
        })

    } catch (error) {
        console.error("Error creating adoption form:", error);
    res.status(500).json({ error: "Internal server error" });
    }
}
export const updateAdoption = async(req, res)=>{
    try {
       const adoption = await Adoption.findByIdAndUpdate(req.params.id, req.body, {new:true}) 
       if(!adoption){
        return res.status(404).json({success:false, message:"Adoption request not found"})
        
       }
       res.status(200).json({
           success: true,
           message:"Adoption request updated successfully",
           data: adoption
       })
    } catch (error) {
        console.error("Error updating adoption:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
export const deleteAdoption = async(req, res)=>{
    try {
        console.log("delete adoption request id:", req.params.id)
        const adoption = await Adoption.findByIdAndDelete(req.params.id)
        if(!adoption){
            return res.status(404).json({success: false, message: "Adoption request not found"})
        }
        res.status(200).json({
            success:true,
            message:"Adoption request deleted successfully",
            data: adoption
        })
        console.log("Deleted adoption request:", req.params.id)
        console.log(adoption)
    } catch (error) {
        console.error("Error deleting adoption:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}