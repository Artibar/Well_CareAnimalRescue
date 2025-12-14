import Volunteer from "../models/Volunteer.js"

export const getAllVolunteers = async (req, res)=>{
    try {
        const volunteers = await Volunteer.find().sort({ createdAt: -1 });
        res.status(200).json({
          success: true,
          message:"Volunteers fetched successfully",
          volunteers
        })
    } catch (error) {
        console.error("Error fetching volunteers:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const createVolunteer = async (req, res) => {
  try {
    console.log("Received volunteer request");
    console.log("Body :", req.body);

    const { name, email, phone, address, skills } = req.body;

    if (!name || !email || !phone || !address || !skills) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await Volunteer.findOne({email})
    if(!existingUser){
      return res.status(400).json({message:"Voulnteer with this email already exists"})
    }
    const newVolunteer = await Volunteer.create({
      name,
      phone,
      email,
      address,
      skills,
    });

    res.status(201).json({
      success: true,
      message: "Volunteer request sent successfully",
      newVolunteer,
    });
  } catch (error) {
    console.error("Error creating volunteer form:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getVolunteerById = async(req, res)=>{
    try {
        const {id} = req.params
        const volunteer = await Volunteer.findById(id)
        res.status(200).json({
          success:true,
          message:"Volunteer fetched successfully",
          volunteer
        })
    } catch (error) {
        console.error("Error fetching volunteer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
export const updateVolunteer = async(req, res)=>{
    try {
        const {id} = req.params
        const updateVolunteer = await Volunteer.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json({
          success:true,
          message:"Volunteer updated successfully",
          volunteer: updateVolunteer
        })
    } catch (error) {
        console.error("Error updating volunteer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteVolunteer = async(req, res)=>{
    try {
        const {id} = req.params;
        const deleteVolunteer = await Volunteer.findByIdAndDelete(id);
        res.status(200).json({
          success: true,
          message:"Volunteer deleted successfully",
          volunteer: deleteVolunteer
        })
    } catch (error) {
        console.error("Error deleting volunteer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}