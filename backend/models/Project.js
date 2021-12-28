export default (mongoose) => {
    const ProjectSchema= new mongoose.Schema(
      {
        userId: String,
        projectId: Number,
        description: String,
        projectPic: String,
        date: Date,
        collaborationStatus: Boolean,
        numCollaborators: Number,
        stack: [String],
        projectLink: String,
      },
      { timestamps: true }
    );
    return mongoose.model("Project", ProjectSchema);
  };